// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEnum, IsOptional } from 'class-validator';

/**
 * All possible query parameters.
 */
export type QueryParameters = RewardDistributionQuery | AboutDataQuery | EvolutionQuery;


enum RewardTypes {
    Staking='staking reward',
    Commission='validator commission',
    All='all'
}

enum ValidatorTypes {
    Public='public',
    Custodial='custodial',
    All='all'
}


/**
 * Base Query, we will normally query the tip of the blockchain
 */

export class BaseQuery {
    @IsOptional()
    @IsNumber()
    @ApiProperty({
        description: 'Limit the dataset by starting Era',
        minimum: 1,
        default: 1,
        example: 510,
        required: false,
    })
        StartingEra = 1;

    @IsOptional()
    @IsEnum(RewardTypes)
    @ApiProperty({
        description: 'Limit the dataset by type of reward',
        enum: ['validator commission', 'staking reward', 'all'],
        default: 'staking reward',
        required: false,
    })
        RewardType = 'staking reward';

    @IsOptional()
    @IsEnum(ValidatorTypes)
    @ApiProperty({
        description: 'Limit the dataset by validator type',
        enum: ['public', 'custodial', 'all'],
        default: 'public',
        required: false,
    })
        ValidatorType = 'public';


}


/**
 * Query parameters for reward distribution queries
 */
export class RewardDistributionQuery extends BaseQuery {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
      description: 'Return only the Top N Results',
      minimum: 1,
      default: 10,
      required: false,
  })
      TopResults = 10;
}

export class AboutDataQuery extends BaseQuery {}


export class EvolutionQuery extends BaseQuery {}
