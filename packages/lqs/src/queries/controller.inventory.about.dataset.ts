// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { BaseController } from '../lqs.controller';
import { AggregatedIndexData, IndexQueryService, QueryTemplate } from '../lqs.index.service';
import { InventoryRecord } from './query.responses.dtos';
import {
    IdentityType2ElasticField,
    InventoryQuery,
} from './query.parameters.dtos';
import { plainToInstance } from 'class-transformer';

/**
 * Inventory Queries are meant to detect the set of available IDs.
 * This is meant main ly for IPFS dump generation by the DDP.
 *
 * The only big set is the nominator set, it can be reduced by Top N resutls by Reward size.
 */
@ApiTags('about')
@Controller()
export class DataSetInventory extends BaseController {
    constructor(protected queryService: IndexQueryService) {
        super(queryService);
    }

    @Post('inventory/about/dataset')
    @ApiBody({ type: InventoryQuery })
    @ApiOperation({
        description: 'Get inventory information about the dataset',
    })
    @ApiOkResponse({ description: 'Returns inventory of requested records', type: InventoryRecord, isArray: true })
    @HttpCode(HttpStatus.OK)
    async post(
        @Body() params: InventoryQuery): Promise<Array<InventoryRecord>> {
        return (await super.runQuery(
            params,
            this.queryTemplate as QueryTemplate,
            this.queryResponseTransformer,
        )) as Array<InventoryRecord>;
    }

    queryResponseTransformer(indexResponse): Array<InventoryRecord> {
        const buckets = indexResponse.body.aggregations['polkawatch'].buckets as AggregatedIndexData;
        return plainToInstance(InventoryRecord, buckets, {
            excludeExtraneousValues: true,
        });
    }

    queryTemplate(params: InventoryQuery) {
        return {
            aggs: {
                polkawatch: {
                    terms: {
                        field: IdentityType2ElasticField[params.RecordType],
                        order: {
                            reward: 'desc',
                        },
                        size: params.TopResults,
                    },
                    aggs: {
                        reward: {
                            sum: {
                                script: {
                                    source: 'doc[\'reward\'].value/10000000000.0',
                                    lang: 'painless',
                                },
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
                    ],
                },
            },
        };
    }
}
