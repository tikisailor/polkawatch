// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../lqs.controller';
import { AggregatedIndexData, IndexQueryService, QueryTemplate } from '../lqs.index.service';
import { RewardEraEvolution, RegionalRewardEraEvolution } from './query.responses.dtos';
import { EvolutionQuery } from './query.parameters.dtos';
import { plainToInstance } from 'class-transformer';

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
            this.queryResponseTransformer,
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
                            'wildcard': {
                                'validator_type': params.ValidatorType == 'all' ? '*' : params.ValidatorType,
                            },
                        },
                        {
                            'script': {
                                'script': {
                                    'source': 'boolean compare(Supplier s, def v) {return s.get() == v || v == \'all\';}compare(() -> { if(doc[\'validator_identity\'].value) return \'with identity\';else return \'anonymous\'; }, params.value);',
                                    'lang': 'painless',
                                    'params': {
                                        'value': params.ValidatorIdentityType,
                                    },
                                },
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

