// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../lqs.controller';
import { AggregatedIndexData, IndexQueryService, QueryTemplate } from '../lqs.index.service';
import { EntitiesEraEvolution } from './query.responses.dtos';
import { EvolutionQuery } from './query.parameters.dtos';
import { plainToInstance } from 'class-transformer';

@ApiTags('about')
@Controller()
export class AboutEraEvolution extends BaseController {
    constructor(protected queryService: IndexQueryService) {
        super(queryService);
    }

    @Post('evolution/about/era')
    @ApiOperation({
        description: 'Evolution of all entities by era',
    })
    @ApiOkResponse({ description: 'The evolution of all entities', type: EntitiesEraEvolution, isArray: true })
    @HttpCode(HttpStatus.OK)
    async post(
        @Body() params: EvolutionQuery): Promise<Array<EntitiesEraEvolution>> {
        return (await super.runQuery(
            params,
            this.queryTemplate as QueryTemplate,
            this.queryResponseTransformer,
        )) as Array<EntitiesEraEvolution>;
    }

    queryResponseTransformer(indexResponse): Array<EntitiesEraEvolution> {
        const buckets = indexResponse.body.aggregations['polkawatch'].buckets as AggregatedIndexData;
        return plainToInstance(EntitiesEraEvolution, buckets, {
            excludeExtraneousValues: true,
        });
    }

    queryTemplate(params: EvolutionQuery) {
        return {
            'aggs': {
                polkawatch: {
                    'histogram': {
                        'field': 'era',
                        'interval': 1,
                        'min_doc_count': 1,
                    },
                    'aggs': {
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
            'query': {
                'bool': {
                    filter: [
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

