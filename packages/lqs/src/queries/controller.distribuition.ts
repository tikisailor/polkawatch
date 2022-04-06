// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {Body, Controller, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import { BaseController } from '../lqs.controller';
import { AggregatedIndexData, IndexQueryService, QueryTemplate } from '../lqs.index.service';
import { RewardsByRegion, RewardsByCountry, RewardsByNetworkProvider, RewardsByValidationGroup } from './query.responses.dtos';
import { RewardDistributionQuery } from './query.parameters.dtos';
import { plainToInstance } from 'class-transformer';
import * as ramda from 'ramda';

@ApiTags('geography')
@Controller()
export class Distribution extends BaseController {
    constructor(protected queryService: IndexQueryService) {
        super(queryService);
    }
    // /:regionId/:countryId/:networkId
    @Post('distribution/geo/:group_by')
    @ApiOperation({
        description: 'Get the distribution of DOT Rewards filtered by Region Country Network ValidatorGroup',
    })
    @ApiParam({ name: 'group_by', description: 'possible values: region, country, network, validator' })
    @ApiOkResponse({ description: 'The distribution of DOT Rewards per Region', type: RewardsByRegion, isArray: true })
    @HttpCode(HttpStatus.OK)
    async post(
        @Body() params: RewardDistributionQuery,
        @Param('group_by') group_by,
            // @Param('countryId') countryId,
            // @Param('networkId') networkId,
    ): Promise<Array<RewardsByRegion | RewardsByCountry | RewardsByNetworkProvider | RewardsByValidationGroup>> {
        return (await super.runQuery(
            params,
            ramda.curry(this.queryTemplate)(group_by) as QueryTemplate,
            ramda.curry(this.queryResponseTransformer)(group_by),
            // this.queryResponseTransformer,
        )) as Array<RewardsByRegion>;
    }

    queryResponseTransformer(group_by, indexResponse): Array<RewardsByRegion | RewardsByCountry | RewardsByNetworkProvider | RewardsByValidationGroup> {
        // console.log(indexResponse.body);
        // console.log(group_by);


        const buckets = indexResponse.body.aggregations['polkawatch'].buckets as AggregatedIndexData;
        console.log('BUCKETS', JSON.stringify(buckets));
        console.log('BUCKETS', buckets);

        if (group_by === 'region') {
            return plainToInstance(RewardsByRegion, buckets, {
                excludeExtraneousValues: true,
            });
        }

        if (group_by === 'country') {
            return plainToInstance(RewardsByCountry, buckets, {
                excludeExtraneousValues: true,
            });
        }

        if (group_by === 'network') {
            return plainToInstance(RewardsByNetworkProvider, buckets, {
                excludeExtraneousValues: true,
            });
        }

        if (group_by === 'validator') {
            console.log('validatooooor')
            return plainToInstance(RewardsByValidationGroup, buckets, {
                excludeExtraneousValues: true,
            });
        }

    }

    queryTemplate(group_by, params: RewardDistributionQuery) {
        let field1;
        let field2;
        console.log(group_by);
        if (group_by === 'region') {
            field1 = 'validator_country_group_code';
            field2 = 'validator_country_group_name';
        } else if (group_by === 'country') {
            field1 = 'validator_country_code';
            field2 = 'validator_country_name';
        } else if (group_by === 'network') {
            field1 = 'validator_asn_code';
            field2 = 'validator_asn_name';
        } else if (group_by === 'validator') {
            field1 = 'validator_parent_name';
            field2 = 'validator_parent_name';
        } else {
            field1 = 'validator_country_group_code';
            field2 = 'validator_country_group_name';
        }

        return {
            aggs: {
                polkawatch: {
                    terms: {
                        field: field1,
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
                                        'field': field2,
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
                        regions: {
                            'cardinality': {
                                'field': 'validator_country_group_code',
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

