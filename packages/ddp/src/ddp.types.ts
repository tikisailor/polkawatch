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
    RegionalRewardEraEvolution,
} from '@lqs/types';

export class ChartDistribution {
    labels: string[];
    data: number[];
}

export class ChartEvolution {
    name: string;
    data: number[];
    labels: number[];
}

/**
 * This is a bundle reply type. Packs all required responses for Geographic Regional Evolution
 */
export class GeoRegionOverview {

    @ApiProperty({
        type: RewardsByRegion,
        isArray: true,
    })
        topRegionalDistribution: RewardsByRegion[];

    @ApiProperty({
        type: ChartDistribution,
        isArray: true,
    })
        topRegionalDistributionChart: ChartDistribution;

    @ApiProperty({
        type: RewardsByRegion,
        isArray: true,
    })
        regionalDistributionDetail: RewardsByRegion[];

    @ApiProperty({
        type: ChartDistribution,
        isArray: true,
    })
        regionalDistributionDetailChart: ChartDistribution;

    @ApiProperty({
        type: RegionalRewardEraEvolution,
        isArray: true,
    })
        regionalEvolutionDetail: RegionalRewardEraEvolution[];

    @ApiProperty({
        type: ChartEvolution,
        isArray: true,
    })
        regionalEvolutionDetailChart: ChartEvolution[];
}
