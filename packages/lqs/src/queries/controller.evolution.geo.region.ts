// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../lqs.controller';
import { AggregatedIndexData, IndexQueryService, QueryTemplate } from '../lqs.index.service';
import {
    RewardEraEvolution,
    RegionalRewardEraEvolution,
} from './query.responses.dtos';
import { EvolutionQuery } from './query.parameters.dtos';
import { plainToInstance } from 'class-transformer';
import * as dataForge from 'data-forge';

const range = (start, end) => {
    if(start === end) return [start];
    return [start, ...range(start + 1, end)];
};

@ApiTags('geography')
@Controller()
export class GeoRegionEvolution extends BaseController {
    constructor(protected queryService: IndexQueryService) {
        super(queryService);
    }

    @Post('evolution/geo/region')
    @ApiOperation({
        description: 'Get the evolution of DOT Rewards per Region',
    })
    @ApiOkResponse({ description: 'The evolution of DOT Rewards per Region', type: RegionalRewardEraEvolution, isArray: true })
    @HttpCode(HttpStatus.OK)
    async post(
        @Body() params: EvolutionQuery): Promise<Array<RegionalRewardEraEvolution>> {
        return (await super.runQuery(
            params,
            this.queryTemplate as QueryTemplate,
            // this.queryResponseTransformer,
            this.chartTransformation,
        )) as Array<RegionalRewardEraEvolution>;
    }

    queryResponseTransformer(indexResponse): Array<RegionalRewardEraEvolution> {
        const segments = indexResponse.body.aggregations['polkawatch'].buckets;

        return segments.map(segment => {
            const buckets = segment.eras.buckets as AggregatedIndexData;
            return {
                Id: segment.key,
                Segment: plainToInstance(RewardEraEvolution, buckets, {
                    excludeExtraneousValues: true,
                }),
            };
        });
    }

    chartTransformation(indexResponse): any {

        const segments = indexResponse.body.aggregations['polkawatch'].buckets;

        const regionalRewardEraEvolution = segments.map(segment => {
            const buckets = segment.eras.buckets as AggregatedIndexData;
            return {
                Id: segment.key,
                Segment: plainToInstance(RewardEraEvolution, buckets, {
                    excludeExtraneousValues: true,
                }),
            };
        });

        const eras = [];
        const transformedData = regionalRewardEraEvolution.map(entry => {
            const df = new dataForge.DataFrame(entry.Segment);
            eras.push(...df.getSeries('Era').toArray());
            return {
                name: entry.Id,
                data: df.getSeries('DotRewards').toArray(),
                labels: df.getSeries('Era').toArray(),
            };
        });

        // this part fills gaps with 0
        const eraRange = range(Math.min(...eras), Math.max(...eras));

        return transformedData.map(entry => {

            const df = new dataForge.DataFrame({columns: {data: entry.data, label: entry.labels}});

            const df2 = new dataForge.DataFrame({columns: {data: (new Array(eraRange.length).fill(0)), label: eraRange}});

            const joined = df2.joinOuterLeft(
                df,
                left => left.label,
                right => right.label,
                (left, right) => {
                    return {
                        data: right === null ? 0 : right.data,
                        labels: left.label,
                    };
                },
            );

            return {
                name: entry.name,
                data: joined.getSeries('data').toArray(),
                labels: joined.getSeries('labels').toArray(),
            };

        });
    }

    queryTemplate(params: EvolutionQuery) {
        return {
            'aggs': {
                'polkawatch': {
                    'terms': {
                        'field': 'validator_country_group_code',
                        'order': {
                            'reward': 'desc',
                        },
                        'size': 3,
                    },
                    'aggs': {
                        'eras': {
                            'histogram': {
                                'field': 'era',
                                'interval': 1,
                                'min_doc_count': 1,
                            },
                            'aggs': {
                                'reward': {
                                    'sum': {
                                        'script': {
                                            'source': 'doc[\'reward\'].value/10000000000.0 ',
                                            'lang': 'painless',
                                        },
                                    },
                                },
                            },
                        },
                        'reward': {
                            'sum': {
                                'script': {
                                    'source': 'doc[\'reward\'].value/10000000000.0 ',
                                    'lang': 'painless',
                                },
                            },
                        },
                    },
                },
            },
            'query': {
                'bool': {
                    'filter': [
                        {
                            'wildcard': {
                                'reward_type': params.RewardType == 'all' ? '*' : params.RewardType,
                            },
                        },
                        {
                            'range': {
                                era: {
                                    gte: params.StartingEra,
                                },
                            },
                        },
                    ],
                },
            },
        };
    }
}

