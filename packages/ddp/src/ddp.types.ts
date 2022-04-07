// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiProperty } from '@nestjs/swagger';

export * from '@lqs/types';
export {
    AboutDataQuery,
    EvolutionQuery,
} from '@lqs/client';

import {
    RewardsByRegion,
    RewardsByCountry,
    RewardsByNetworkProvider,
    RewardsByValidationGroup,
    RewardsByValidationNode,
} from '@lqs/types';

export class DistributionChart {
    @ApiProperty({
        description: 'Distribution Chart Labels',
        isArray: true,
        type: String,
    })
        labels: string[];

    @ApiProperty({
        description: 'Distribution Chart Values',
        isArray: true,
        type: Number,
    })
        data: number[];
}

export class EvolutionChartSegment {
    @ApiProperty({
        description: 'Segment Name',
    })
        name: string;

    @ApiProperty({
        description: 'Segment Data Points',
        type: Number,
        isArray: true,
    })
        data: number[];

}

export class EvolutionChart {
    @ApiProperty({
        description: 'Segment Data Points',
        type: EvolutionChartSegment,
        isArray: true,
    })
        segments: Array<EvolutionChartSegment>;

    @ApiProperty({
        description: 'Segment Labels',
        type: Number,
        isArray: true,
    })
        labels: number[];
}

export class TreemapPoint {
    @ApiProperty({
        description: 'Point Label',
    })
        x: string;

    @ApiProperty({
        description: 'Point Value',
    })
        y: number;
}

export class TreemapSegment {
    @ApiProperty({
        description: 'Segment Name',
    })
        name: string;

    @ApiProperty({
        description: 'Segment Data',
        type: TreemapPoint,
        isArray: true,
    })
        data: Array<TreemapPoint>;
}

export type TreemapChart = Array<TreemapSegment>;

/**
 * This is a bundle reply type. Packs all required responses for Geographic Regional Evolution
 */
export class GeoRegionOverview {

    @ApiProperty({
        type: DistributionChart,
    })
        topRegionalDistributionChart: DistributionChart;

    @ApiProperty({
        type: EvolutionChart,
        isArray: false,
    })
        regionalEvolutionChart: EvolutionChart;

    @ApiProperty({
        type: RewardsByRegion,
        isArray: true,
    })
        regionalDistributionDetail: Array<RewardsByRegion>;
}

/**
 * Network Overview bundle
 */
export class NetworkOverview {

    @ApiProperty({
        type: TreemapSegment,
        isArray: true,
    })
        topNetworkDistributionChart: Array<TreemapSegment>;

    @ApiProperty({
        type: RewardsByNetworkProvider,
        isArray: true,
    })
        networkDistributionDetail: Array<RewardsByNetworkProvider>;

}

/**
 * Validator Group / Operator overview
 */

export class OperatorOverview {

    @ApiProperty({
        type: TreemapSegment,
    })
        topOperatorDistributionChart: Array<TreemapSegment>;

    @ApiProperty({
        type: RewardsByValidationGroup,
        isArray: true,
    })
        operatorDistributionDetail: Array<RewardsByValidationGroup>;

}

/**
 * Region Detail
 */

export class RegionDetail {
    @ApiProperty({
        type: TreemapSegment,
    })
        topCountryDistributionChart: Array<TreemapSegment>;

    @ApiProperty({
        type: RewardsByCountry,
        isArray: true,
    })
        countryDistributionDetail: Array<RewardsByCountry>;
}

export class CountryDetail {
    @ApiProperty({
        type: TreemapSegment,
    })
        topNetworkDistributionChart: Array<TreemapSegment>;

    @ApiProperty({
        type: TreemapSegment,
    })
        topOperatorDistributionChart: Array<TreemapSegment>;

    @ApiProperty({
        type: RewardsByValidationGroup,
        isArray: true,
    })
        operatorDistributionDetail: Array<RewardsByValidationGroup>;
}

export class NetworkDetail {

    @ApiProperty({
        type: TreemapSegment,
    })
        topCountryDistributionChart: Array<TreemapSegment>;

    @ApiProperty({
        type: TreemapSegment,
    })
        topOperatorDistributionChart: Array<TreemapSegment>;

    @ApiProperty({
        type: RewardsByValidationGroup,
        isArray: true,
    })
        operatorDistributionDetail: Array<RewardsByValidationGroup>;

}

export class OperatorDetail {

    @ApiProperty({
        type: DistributionChart,
    })
        topCountryDistributionChart: DistributionChart;

    @ApiProperty({
        type: DistributionChart,
    })
        topNetworkDistributionChart: DistributionChart;

    @ApiProperty({
        type: RewardsByValidationNode,
        isArray: true,
    })
        nodeDistributionDetail: Array<RewardsByValidationNode>;

}