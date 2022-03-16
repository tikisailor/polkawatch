// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../lqs.controller';
import { AggregatedIndexData, IndexQueryService, QueryTemplate } from '../lqs.index.service';
import { RewardsByCountry } from './query.responses.dtos';
import { RewardDistributionQuery } from './query.parameters.dtos';
import { plainToInstance } from 'class-transformer';

@ApiTags('geography')
@Controller()
export class GeoCountry extends BaseController {
    constructor(protected queryService: IndexQueryService) {
        super(queryService);
    }

    @Post('distribution/geo/country')
    @ApiOperation({
        description: 'Get the distribution of DOT Rewards per Country',
    })
    @ApiOkResponse({ description: 'The distribution of DOT Rewards per Country', type: RewardsByCountry, isArray: true })
    @HttpCode(HttpStatus.OK)
    async post(
        @Body() params: RewardDistributionQuery): Promise<Array<RewardsByCountry>> {
        return (await super.runQuery(
            params,
            this.queryTemplate as QueryTemplate,
            this.queryResponseTransformer,
        )) as Array<RewardsByCountry>;
    }

    queryResponseTransformer(indexResponse): Array<RewardsByCountry> {
        const buckets = indexResponse.body.aggregations['polkawatch'].buckets as AggregatedIndexData;
        return plainToInstance(RewardsByCountry, buckets, {
            excludeExtraneousValues: true,
        });
    }

    queryTemplateNew() {
        return {
            'aggs': {
                '0': {
                    'terms': {
                        'field': 'validator_country_code',
                        'order': {
                            '2': 'desc',
                        },
                        'size': 10,
                    },
                    'aggs': {
                        '1': {
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
                        '2': {
                            'sum': {
                                'script': {
                                    'source': '\t\ndoc[\'reward\'].value/10000000000.0 ',
                                    'lang': 'painless',
                                },
                            },
                        },
                        '3': {
                            'cardinality': {
                                'field': 'validator_parent',
                            },
                        },
                        '4': {
                            'cardinality': {
                                'field': 'validator_asn_group_name',
                            },
                        },
                        '5': {
                            'sum': {
                                'script': {
                                    'source': '\t\ndoc[\'reward\'].value/10000000000.0 ',
                                    'lang': 'painless',
                                },
                            },
                        },
                        '6': {
                            'sum': {
                                'script': {
                                    'source': '\t\ndoc[\'reward\'].value/10000000000.0 ',
                                    'lang': 'painless',
                                },
                            },
                        },
                    },
                },
            },
            'size': 0,
            'fields': [
                {
                    'field': 'date',
                    'format': 'date_time',
                },
            ],
            'script_fields': {
                'reward_dot': {
                    'script': {
                        'source': '\t\ndoc[\'reward\'].value/10000000000.0 ',
                        'lang': 'painless',
                    },
                },
                'nomination_value_dot': {
                    'script': {
                        'source': 'if (doc[\'nomination_value\'].size()!=0) return doc[\'nomination_value\'].value/10000000000.0;\n',
                        'lang': 'painless',
                    },
                },
                'return_dot': {
                    'script': {
                        'source': 'if (doc[\'nomination_value\'].size()!=0 && doc[\'nominator\']!=doc[\'validator\']) return \n(\n    ( \n        Math.pow(\n            (\n                (double) doc[\'reward\'].value) / ( (double) doc[\'nomination_value\'].value\n            ) \n                +1\n            , \n            365\n        ) -1\n    ) * 100 \n); ',
                        'lang': 'painless',
                    },
                },
            },
            'stored_fields': [
                '*',
            ],
            'runtime_mappings': {},
            '_source': {
                'excludes': [],
            },
            'query': {
                'bool': {
                    'must': [],
                    'filter': [
                        {
                            'match_phrase': {
                                'reward_type': 'staking reward',
                            },
                        },
                        {
                            'range': {
                                'date': {
                                    'format': 'strict_date_optional_time',
                                    'gte': '2021-12-10T23:00:00.000Z',
                                    'lte': '2022-03-11T07:32:08.349Z',
                                },
                            },
                        },
                    ],
                    'should': [],
                    'must_not': [],
                },
            },
        };
    }

    queryTemplate(params: RewardDistributionQuery) {
        return {
            'aggs': {
                polkawatch: {
                    'terms': {
                        'field': 'validator_country_code',
                        'order': {
                            reward: 'desc',
                        },
                        size: params.TopResults,
                    },
                    'aggs': {
                        name: {
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
                        reward: {
                            'sum': {
                                'script': {
                                    'source': 'doc[\'reward\'].value/10000000000.0 ',
                                    'lang': 'painless',
                                },
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
