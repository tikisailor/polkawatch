// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../lqs.controller';
import { AggregatedIndexData, IndexQueryService, QueryTemplate } from '../lqs.index.service';
import { RewardsByNetworkProvider } from './query.responses.dtos';
import { RewardDistributionQueryDto } from './query.parameters.dtos';
import { plainToInstance } from 'class-transformer';

@ApiTags('network')
@Controller()
export class NetworkProvider extends BaseController {
    constructor(protected queryService: IndexQueryService) {
        super(queryService);
    }

    @Post('net/network')
    @ApiOperation({
        description: 'Get the distribution of DOT Rewards per Computing Network Group',
    })
    @ApiOkResponse({ description: 'The distribution of DOT Rewards per Computing Network Group', type: RewardsByNetworkProvider, isArray: true })
    @HttpCode(HttpStatus.OK)
    async post(
        @Body() params: RewardDistributionQueryDto): Promise<Array<RewardsByNetworkProvider>> {
        return (await super.runQuery(
            params,
            this.queryTemplate as QueryTemplate,
            this.queryResponseTransformer,
        )) as Array<RewardsByNetworkProvider>;
    }

    queryResponseTransformer(indexResponse): Array<RewardsByNetworkProvider> {
        const buckets = indexResponse.body.aggregations['polkawatch'].buckets as AggregatedIndexData;
        return plainToInstance(RewardsByNetworkProvider, buckets, {
            excludeExtraneousValues: true,
        });
    }

    queryTemplate(params: RewardDistributionQueryDto) {
        return {
            aggs: {
                polkawatch: {
                    terms: {
                        field: 'validator_asn_code',
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
                                        'field': 'validator_asn_name',
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
                        'regions': {
                            'cardinality': {
                                'field': 'validator_country_group_code',
                            },
                        },
                        countries: {
                            'cardinality': {
                                'field': 'validator_country_code',
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
                            'match_phrase': {
                                'reward_type': 'staking reward',
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

