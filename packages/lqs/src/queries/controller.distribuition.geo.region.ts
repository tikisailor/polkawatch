// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../lqs.controller';
import { AggregatedIndexData, IndexQueryService, QueryTemplate } from '../lqs.index.service';
import {ChartDistribution, RewardsByRegion} from './query.responses.dtos';
import { RewardDistributionQuery } from './query.parameters.dtos';
import { plainToInstance } from 'class-transformer';
import * as dataForge from 'data-forge';

@ApiTags('geography')
@Controller()
export class GeoRegion extends BaseController {
    constructor(protected queryService: IndexQueryService) {
        super(queryService);
    }

    @Post('distribution/geo/region')
    @ApiOperation({
        description: 'Get the distribution of DOT Rewards per Region',
    })
    @ApiOkResponse({ description: 'The distribution of DOT Rewards per Region', type: RewardsByRegion, isArray: true })
    @HttpCode(HttpStatus.OK)
    async post(
        @Body() params: RewardDistributionQuery): Promise<Array<RewardsByRegion>> {
        return (await super.runQuery(
            params,
            this.queryTemplate as QueryTemplate,
            // this.queryResponseTransformer,
            this.chartTransformer,
        )) as Array<RewardsByRegion>;
    }

    queryResponseTransformer(indexResponse): Array<RewardsByRegion> {
        const buckets = indexResponse.body.aggregations['polkawatch'].buckets as AggregatedIndexData;
        return plainToInstance(RewardsByRegion, buckets, {
            excludeExtraneousValues: true,
        });
    }

    chartTransformer(indexResponse): ChartDistribution {
        const buckets = indexResponse.body.aggregations['polkawatch'].buckets as AggregatedIndexData;
        const rewardsByRegion = plainToInstance(RewardsByRegion, buckets, {
            excludeExtraneousValues: true,
        });

        const df = new dataForge.DataFrame(rewardsByRegion);
        const xLablesSeries = df.getSeries('Region').toArray();
        const dataSeries = df.getSeries('DotRewards').toArray();
        return { data: dataSeries, labels: xLablesSeries } as ChartDistribution;
    }

    queryTemplate(params: RewardDistributionQuery) {
        return {
            aggs: {
                polkawatch: {
                    terms: {
                        field: 'validator_country_group_code',
                        order: {
                            reward: 'desc',
                        },
                        size: params.TopResults,
                    },
                    aggs: {
                        name: {
                            'top_hits': {
                                'fields': [
                                    {
                                        'field': 'validator_country_group_name',
                                    },
                                ],
                                '_source': false,
                                'size': 1,
                                'sort': [
                                    {
                                        'date': {
                                            'order': 'desc',
                                        },
                                    },
                                ],
                            },
                        },
                        reward: {
                            sum: {
                                script: {
                                    source: 'doc[\'reward\'].value/10000000000.0',
                                    lang: 'painless',
                                },
                            },
                        },
                        countries: {
                            'cardinality': {
                                'field': 'validator_country_code',
                            },
                        },
                        networks: {
                            'cardinality': {
                                'field': 'validator_asn_code',
                            },
                        },
                        validator_groups: {
                            'cardinality': {
                                'field': 'validator_parent',
                            },
                        },
                        validators: {
                            'cardinality': {
                                'field': 'validator',
                            },
                        },
                        nominators: {
                            'cardinality': {
                                'field': 'nominator',
                            },
                        },
                    },
                },
            },
            query: {
                bool: {
                    filter: [
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

