// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiProperty } from '@nestjs/swagger';

export * from '@lqs/types';
export {
    AboutDataQuery,
    EvolutionQuery,
} from '@lqs/client';

import {
    RewardsByNetworkProvider,
    RewardsByRegion, RewardsByValidationGroup,
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

    @ApiProperty({
        description: 'Segment Labels',
        type: Number,
        isArray: true,
    })
        labels: number[];
}

export type EvolutionChart = Array<EvolutionChartSegment>

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
        type: EvolutionChartSegment,
        isArray: true,
    })
        regionalEvolutionChart: Array<EvolutionChartSegment>;

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
