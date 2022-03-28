// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { DdpLqsService } from './ddp.lqs.service';
import {
    AboutData,
    GeoRegionOverview,
} from './ddp.types';

/**
 * Distributed Data Pack Controller.
 *
 * These endpoints match the IPFS file structure. It is used during development and as the source for
 * IPFS data pack generation.
 * Note that all the parameters are selected from a limited number of options, this makes it possible to generate
 * a big, but still manageable Data Pack, at the end of the day, there are so many queries that make statistical sense.
 *
 */

@Controller()
@ApiTags('polkawatch')
export class DdpIpfs {

    constructor(private readonly lqs: DdpLqsService) {
        // nothing
    }

    /**
     * Information about the dataset. On the one hand, we can check the last N eras, and we can check if we focus on
     * public validation (open validators with an ID) or ALL validation, including custodial (100% commission) and
     * validators without an ID.
     *
     * @param last_eras
     * @param validation_type
     */
    @Get('/about/dataset/:validation_type/:last_eras.json')
    @ApiOperation({
        description: 'Returns information about the dataset of the last N eras.',
    })
    @ApiOkResponse({ description: 'The information about the selected dataset', type: AboutData, isArray: false })
    @ApiParam({
        description: 'Available set of eras to query',
        name:'last_eras',
        enum: [10, 30, 60],
    })
    @ApiParam({
        description: 'Limit to Staking Rewards of Public Validators with Identity or include ALL rewards and commissions from All validators',
        name:'validation_type',
        enum:['public', 'all'],
    })
    async aboutDataset(
        @Param('last_eras') last_eras:number,
        @Param('validation_type') validation_type,
    ): Promise<AboutData> {
        const api = this.lqs.getAPI();

        return (await api.about.aboutDatasetPost({
            aboutDataQuery: await this.getCommonRequestParameters({ last_eras, validation_type }),
        })).data;
    }

    /**
     * Reginal infomration bundle.
     *
     * Returns all the queries required to present regional status of the network in one single object. Top N distribution,
     * Top N evolution, and All Regions detail.
     *
     * @param last_eras
     * @param validation_type
     * @param top_regions
     *
     */
    @Get('/geography/overview/:validation_type/:last_eras/:top_regions.json')
    @ApiParam({
        description: 'Available set of eras to query',
        type: Number,
        name:'last_eras',
        enum: [10, 30, 60],
    })
    @ApiParam({
        description: 'Limit to Staking Rewards of Public Validators with Identity or include ALL rewards and commissions from All validators',
        name:'validation_type',
        enum:['public', 'all'],
    })
    @ApiParam({
        description: 'Number of top regions',
        name:'top_regions',
        enum: [3, 4, 5],
    })
    async geoRegionOverview(
        @Param('last_eras') last_eras:number,
        @Param('validation_type') validation_type,
        @Param('top_regions') top_regions:number,
    ): Promise<GeoRegionOverview> {
        const api = this.lqs.getAPI();

        const distributionQuery = await this.getCommonRequestParameters({ last_eras, validation_type, top_regions });
        const detailQuery = { ... distributionQuery, TopResults: 10 };
        const evolutionQuery = distributionQuery;

        return {
            topRegionalDistribution: (await api.geography.geoRegionPost({
                rewardDistributionQuery: distributionQuery,
            })).data,
            regionalDistributionDetail: (await api.geography.geoRegionPost({
                rewardDistributionQuery: detailQuery,
            })).data,
            regionalEvolutionDetail: (await api.geography.geoRegionEvolutionPost({
                evolutionQuery: evolutionQuery,
            })).data,
        };
    }

    /**
     * Helper method to fill up convert shared request parameters to LQS request parameters
     */
    async getCommonRequestParameters(params) {
        const queryParams = {};
        if (params.last_eras) queryParams['StartingEra'] = await this.lqs.getStartingEra(params.last_eras);
        if(params.validation_type) {
            queryParams['RewardType'] = params.validation_type == 'public' ? 'staking reward' : 'all';
            queryParams['ValidatorType'] = params.validation_type == 'public' ? 'public' : 'all';
            queryParams['ValidatorIdentityType'] = params.validation_type == 'public' ? 'with identity' : 'all';
        }
        if(params.top_regions) queryParams['TopResults'] = params.top_regions;
        return queryParams;
    }

}
