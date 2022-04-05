// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { DdpLqsService, InventoryRecord } from './ddp.lqs.service';
import { DdpTransformationService } from './ddp.transformations.service';
import {
    AboutData,
    GeoRegionOverview, NetworkOverview, OperatorOverview, RegionDetail,
} from './ddp.types';
import { InventoryQuery } from '@lqs/client';

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

    constructor(
        private readonly lqs: DdpLqsService,
        private readonly transformer: DdpTransformationService,
    ) {
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
     * Information about the dataset. Inventory of IDs of participating objects.
     * This is required for IPFS generation
     *
     * @param record_type
     */
    @Get('/about/inventory/:record_type.json')
    @ApiOperation({
        description: 'Identifiers of participating entities. Available only for 60 eras and public validation.',
    })
    @ApiOkResponse({ description: 'The information about the selected dataset', type: InventoryRecord, isArray: true })
    @ApiParam({
        description: 'The record type to get Identifiers from',
        name:'record_type',
        enum:['region', 'country', 'network', 'validator_group', 'validator', 'nominator'],
    })
    async aboutInventory(
        @Param('record_type') record_type,
    ): Promise<Array<InventoryRecord>> {
        const api = this.lqs.getAPI();

        const commonParams = await this.getCommonRequestParameters({
            last_eras: 60,
            validation_type: 'public',
            top_results: 25000,
        });

        const query:InventoryQuery = {
            RecordType: record_type,
            ...commonParams,
        };

        return (await api.about.dataSetInventoryPost({
            inventoryQuery: query,
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
     * @param top_results
     *
     */
    @Get('/geography/overview/:validation_type/:last_eras/:top_results.json')
    @ApiOkResponse({ description: 'Data bundle of regional data', type: GeoRegionOverview, isArray: false })
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
        name:'top_results',
        enum: [3, 4, 5],
    })
    async geoRegionOverview(
        @Param('last_eras') last_eras:number,
        @Param('validation_type') validation_type,
        @Param('top_results') top_results:number,
    ): Promise<GeoRegionOverview> {
        const api = this.lqs.getAPI();

        const distributionQuery = await this.getCommonRequestParameters({ last_eras, validation_type, top_results: top_results });
        const detailQuery = { ... distributionQuery, TopResults: 10 };
        const evolutionQuery = distributionQuery;

        return {
            topRegionalDistributionChart: this.transformer.toDistributionChart((await api.geography.geoRegionPost({
                rewardDistributionQuery: distributionQuery,
            })).data, 'Region'),
            regionalEvolutionChart: this.transformer.toEvolutionChart((await api.geography.geoRegionEvolutionPost({
                evolutionQuery: evolutionQuery,
            })).data),
            regionalDistributionDetail: (await api.geography.geoRegionPost({
                rewardDistributionQuery: detailQuery,
            })).data,
        } as GeoRegionOverview;
    }

    /**
     * Network information bundle.
     *
     * Returns all the queries required to present status by operating network in one single object. Top N distribution and detail.
     *
     * @param last_eras
     * @param validation_type
     * @param top_results
     *
     */
    @Get('/network/overview/:validation_type/:last_eras.json')
    @ApiOkResponse({ description: 'Data bundle of operator network data', type: NetworkOverview, isArray: false })
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
    async networkOverview(
        @Param('last_eras') last_eras:number,
        @Param('validation_type') validation_type,
    ): Promise<NetworkOverview> {
        const api = this.lqs.getAPI();

        const detailQuery = await this.getCommonRequestParameters({ last_eras, validation_type, top_results: 75 });

        return {
            topNetworkDistributionChart: this.transformer.toTreemapChart((await api.network.networkProviderPost({
                rewardDistributionQuery: detailQuery,
            })).data, 'NetworkProvider'),
            networkDistributionDetail: (await api.network.networkProviderPost({
                rewardDistributionQuery: detailQuery,
            })).data,
        } as NetworkOverview;
    }

    /**
     * ValidationGroup/Operator information bundle.
     *
     * Returns all the queries required to present status by vdalidator group or operator in one single object. Top N distribution and detail.
     *
     * @param last_eras
     * @param validation_type
     * @param top_results
     *
     */
    @Get('/operator/overview/:validation_type/:last_eras.json')
    @ApiOkResponse({ description: 'Data bundle of validation group/operator data', type: OperatorOverview, isArray: false })
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
    async operatorOverview(
        @Param('last_eras') last_eras:number,
        @Param('validation_type') validation_type,
    ): Promise<OperatorOverview> {
        const api = this.lqs.getAPI();

        const detailQuery = await this.getCommonRequestParameters({ last_eras, validation_type, top_results: 200 });

        return {
            topOperatorDistributionChart: this.transformer.toTreemapChart((await api.validator.validatorGroupPost({
                rewardDistributionQuery: detailQuery,
            })).data, 'ValidationGroup'),
            operatorDistributionDetail: (await api.validator.validatorGroupPost({
                rewardDistributionQuery: detailQuery,
            })).data,
        } as OperatorOverview;
    }

    /**
     * Region Detail View
     */
    @Get('/geography/region/:region/:last_eras.json')
    @ApiOkResponse({ description: 'Data bundle of validation group/operator data', type: OperatorOverview, isArray: false })
    @ApiParam({
        description: 'Region ID to request',
        name:'region',
    })
    @ApiParam({
        description: 'Available set of eras to query',
        type: Number,
        name:'last_eras',
        enum: [10, 30, 60],
    })
    async regionDetail(
        @Param('region') region,
        @Param('last_eras') last_eras:number,
    ): Promise<RegionDetail> {
        const api = this.lqs.getAPI();

        const commonParams = await this.getCommonRequestParameters({ last_eras, validation_type:'public', top_results: 200 });
        const detailQuery = { RegionFilter: region, ... commonParams };

        return {
            topCountryDistributionChart: this.transformer.toTreemapChart((await api.geography.geoCountryPost({
                rewardDistributionQuery: detailQuery,
            })).data, 'Country'),
            countryDistributionDetail: (await api.geography.geoCountryPost({
                rewardDistributionQuery: detailQuery,
            })).data,
        } as RegionDetail;
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
        if(params.top_results) queryParams['TopResults'] = params.top_results;
        return queryParams;
    }


}
