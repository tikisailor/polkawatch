// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../lqs.controller';
import { AggregatedIndexData, IndexQueryService, QueryTemplate } from '../lqs.index.service';
import { RewardsByValidationGroup } from './query.responses.dtos';
import { RewardDistributionQuery } from './query.parameters.dtos';
import { plainToInstance } from 'class-transformer';

@ApiTags('validator')
@Controller()
export class ValidatorGroup extends BaseController {
    constructor(protected queryService: IndexQueryService) {
        super(queryService);
    }

    @Post('distribution/validator/group')
    @ApiOperation({
        description: 'Get the distribution of DOT Rewards per Validator Group',
    })
    @ApiOkResponse({ description: 'The distribution of DOT Rewards per Validator Group', type: RewardsByValidationGroup, isArray: true })
    @HttpCode(HttpStatus.OK)
    async post(
        @Body() params: RewardDistributionQuery): Promise<Array<RewardsByValidationGroup>> {
        return (await super.runQuery(
            params,
            this.queryTemplate as QueryTemplate,
            this.queryResponseTransformer,
        )) as Array<RewardsByValidationGroup>;
    }

    queryResponseTransformer(indexResponse): Array<RewardsByValidationGroup> {
        const buckets = indexResponse.body.aggregations['polkawatch'].buckets as AggregatedIndexData;
        return plainToInstance(RewardsByValidationGroup, buckets, {
            excludeExtraneousValues: true,
        });
    }

    queryTemplate(params: RewardDistributionQuery) {
        return {
            'aggs': {
                polkawatch: {
                    'terms': {
                        'field': 'validator_parent_name',
                        'order': {
                            reward: 'desc',
                        },
                        'size': params.TopResults,
                    },
                    'aggs': {
                        name: {
                            'top_hits': {
                                'fields': [
                                    {
                                        'field': 'validator_parent_name',
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
                            'sum': {
                                'script': {
                                    'source': 'doc[\'reward\'].value/10000000000.0 ',
                                    'lang': 'painless',
                                },
                            },
                        },
                        'regions': {
                            'cardinality': {
                                'field': 'validator_country_group_code',
                            },
                        },
                        'countries': {
                            'cardinality': {
                                'field': 'validator_country_code',
                            },
                        },
                        'networks': {
                            'cardinality': {
                                'field': 'validator_asn_code',
                            },
                        },
                        'validators': {
                            'cardinality': {
                                'field': 'validator',
                            },
                        },
                        'nominators': {
                            'cardinality': {
                                'field': 'nominator',
                            },
                        },
                        median_nomination: {
                            'percentiles': {
                                'script': {
                                    'source': 'if (doc[\'nomination_value\'].size()!=0) return doc[\'nomination_value\'].value/10000000000.0;',
                                    'lang': 'painless',
                                },
                                'percents': [
                                    50,
                                ],
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

