// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { BaseController } from '../lqs.controller';
import { IndexQueryService, QueryTemplate } from '../lqs.index.service';
import { AboutData } from './query.responses.dtos';
import { AboutDataQuery } from './query.parameters.dtos';
import { plainToInstance } from 'class-transformer';

@ApiTags('about')
@Controller()
export class AboutDataset extends BaseController {
    constructor(protected queryService: IndexQueryService) {
        super(queryService);
    }

    @Post('distribution/about/dataset')
    @ApiBody({ type: AboutDataQuery })
    @ApiOperation({
        description: 'Get information about the dataset',
    })
    @ApiOkResponse({ description: 'Returns information about the dataset', type: AboutData, isArray: false })
    @HttpCode(HttpStatus.OK)
    async post(
        @Body() params: AboutDataQuery): Promise<AboutData> {
        return (await super.runQuery(
            params,
            this.queryTemplate as QueryTemplate,
            this.queryResponseTransformer,
        )) as AboutData;
    }

    queryResponseTransformer(indexResponse): AboutData {
        const aggregations = indexResponse.body.aggregations;
        // We put the record count as an aggregation even it is not
        aggregations.reward_events = indexResponse.body.hits.total;
        return plainToInstance(AboutData, aggregations, {
            excludeExtraneousValues: true,
        });
    }

    queryTemplate(params: AboutDataQuery) {
        return {
            'aggs': {
                'total_eras': {
                    'cardinality': {
                        'field': 'era',
                    },
                },
                'total_rewards': {
                    'cardinality': {
                        'field': 'reward',
                    },
                },
                'reward': {
                    'sum': {
                        'script': {
                            'source': 'doc[\'reward\'].value/10000000000.0',
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
                'validator_groups': {
                    'cardinality': {
                        'field': 'validator_parent',
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
                'latest_era': {
                    'max': {
                        'field': 'era',
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