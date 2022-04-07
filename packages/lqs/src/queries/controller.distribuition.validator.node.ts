// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../lqs.controller';
import { AggregatedIndexData, IndexQueryService, QueryTemplate } from '../lqs.index.service';
import { RewardsByValidationNode } from './query.responses.dtos';
import { RewardDistributionQuery } from './query.parameters.dtos';
import { plainToInstance } from 'class-transformer';

@ApiTags('validator')
@Controller()
export class ValidatorNode extends BaseController {
    constructor(protected queryService: IndexQueryService) {
        super(queryService);
    }

    @Post('distribution/validator/node')
    @ApiOperation({
        description: 'Get the distribution of DOT Rewards per Validator Node',
    })
    @ApiOkResponse({ description: 'The distribution of DOT Rewards per Validator Node', type: RewardsByValidationNode, isArray: true })
    @HttpCode(HttpStatus.OK)
    async post(
        @Body() params: RewardDistributionQuery): Promise<Array<RewardsByValidationNode>> {
        return (await super.runQuery(
            params,
            this.queryTemplate as QueryTemplate,
            this.queryResponseTransformer,
        )) as Array<RewardsByValidationNode>;
    }

    queryResponseTransformer(indexResponse): Array<RewardsByValidationNode> {
        const buckets = indexResponse.body.aggregations['polkawatch'].buckets as AggregatedIndexData;
        return plainToInstance(RewardsByValidationNode, buckets, {
            excludeExtraneousValues: true,
        });
    }

    queryTemplate(params: RewardDistributionQuery) {
        return {
            'aggs': {
                polkawatch: {
                    'terms': {
                        'field': 'validator',
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
                                        'field': 'validator_name',
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
                        last_region: {
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
                        last_country: {
                            'top_hits': {
                                'fields': [
                                    {
                                        'field': 'validator_country_name',
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
                        last_network: {
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
                            'match_phrase': {
                                'traced': true,
                            },
                        },
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
                        {
                            'wildcard': {
                                'validator_country_group_code': params.RegionFilter ? params.RegionFilter : '*',
                            },
                        },
                        {
                            'wildcard': {
                                'validator_country_code': params.CountryFilter ? params.CountryFilter : '*',
                            },
                        },
                        {
                            'wildcard': {
                                'validator_asn_code': params.NetworkFilter ? params.NetworkFilter : '*',
                            },
                        },
                        {
                            'wildcard': {
                                'validator_parent': params.ValidatorGroupFilter ? params.ValidatorGroupFilter : '*',
                            },
                        },
                        {
                            'wildcard': {
                                'validator': params.ValidatorFilter ? params.ValidatorFilter : '*',
                            },
                        },
                        {
                            'wildcard': {
                                'nominator': params.NominatorFilter ? params.NominatorFilter : '*',
                            },
                        },
                    ],
                },
            },
        };
    }
}

