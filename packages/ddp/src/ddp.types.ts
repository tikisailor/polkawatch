// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {ApiProperty} from '@nestjs/swagger';

export * from '@lqs/types';
export {
    AboutDataQuery,
    EvolutionQuery,
} from '@lqs/client';

import {
    RewardsByRegion,
} from '@lqs/types';

// export class DistributionChart {
//     labels: string[];
//     data: number[];
// }
//
// export class EvolutionChartSegment {
//     name: string;
//     data: number[];
//     labels: number[];
// }

export class DistributionChart {
    @ApiProperty({
        isArray: true,
    })
    labels: string[];
    @ApiProperty({
        isArray: true,
    })
    data: number[];
}

export class EvolutionChartSegment {
    @ApiProperty({
        isArray: false,
    })
    name: string;
    @ApiProperty({
        isArray: true,
    })
    data: number[];
    @ApiProperty({
        isArray: true,
    })
    labels: number[];
}


export type EvolutionChart = Array<EvolutionChartSegment>

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
    })
        regionalEvolutionChart: Array<EvolutionChartSegment>;

    @ApiProperty({
        type: RewardsByRegion,
        isArray: true,
    })
        regionalDistributionDetail: Array<RewardsByRegion>;

}
