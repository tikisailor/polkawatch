// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEnum, IsOptional } from 'class-validator';

/**
 * All possible query parameters.
 */
export type QueryParameters = RewardDistributionQuery | AboutDataQuery | EvolutionQuery | InventoryQuery;


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

enum IdentityTypes {
    WithIdentity='with identity',
    Anonymous='anonymous',
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
        StartingEra:number = 1;

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

    @IsOptional()
    @IsEnum(IdentityTypes)
    @ApiProperty({
        description: 'Limit the dataset by validator identity type',
        enum: ['with identity', 'anonymous', 'all'],
        default: 'with identity',
        required: false,
    })
        ValidatorIdentityType = 'with identity';
}

/**
 * In our queries we are often interested in the top N results.
 */
export class TopBaseQuery extends BaseQuery {
    @IsOptional()
    @IsNumber()
    @ApiProperty({
        description: 'Return only the Top N Results',
        minimum: 1,
        default: 10,
        required: false,
    })
        TopResults:number = 10;
}

/**
 * In Some cases it may be desired to filter queries by some other entitites too.
 * This is a generic filtering that may not make sense in some particular cases.
 */
export class FilteredBaseQuery extends TopBaseQuery {

    @ApiProperty({
        description: 'Filter by Region ID',
        type: String,
        default: null,
        required: false,
    })
        RegionFilter;

    @ApiProperty({
        description: 'Filter by Country ID',
        type: String,
        default: null,
        required: false,
    })
        CountryFilter;

    @ApiProperty({
        description: 'Filter by Network ID',
        type: String,
        default: null,
        required: false,
    })
        NetworkFilter;

    @ApiProperty({
        description: 'Filter by Validator Group ID',
        type: String,
        default: null,
        required: false,
    })
        ValidatorGroupFilter;

    @ApiProperty({
        description: 'Filter by Validator ID',
        type: String,
        default: null,
        required: false,
    })
        ValidatorFilter;

    @ApiProperty({
        description: 'Filter by Nominator ID',
        type: String,
        default: null,
        required: false,
    })
        NominatorFilter;

}

/**
 * Type of inventory to retrieve
 */

enum IdentityTypes {
    Region='region',
    Country='country',
    Network='network',
    ValidatorGroup='validator_group',
    Validator='validator',
    Nominator='nominator'
}

/**
 * Helper decoder of Elastic Search Field names
 */
export const IdentityType2ElasticField = {
    'region': 'validator_country_group_code',
    'country': 'validator_country_code',
    'network': 'validator_asn_code',
    'validator_group': 'validator_parent',
    'validator': 'validator',
    'nominator': 'nominator',
};

/**
 * The Inventory Query allows us to discover entity IDs.
 * This is required for the DDP in order to generate IPFS filesystem
 */

export class InventoryQuery extends TopBaseQuery {
    @IsOptional()
    @IsEnum(IdentityTypes)
    @ApiProperty({
        description: 'Type of record to retrieve the inventory for',
        enum: ['region', 'country', 'network', 'validator_group', 'validator', 'nominator'],
        required: true,
    })
        RecordType:IdentityTypes;
}

/**
 * Query parameters for reward distribution queries
 */
export class RewardDistributionQuery extends FilteredBaseQuery {
}

export class AboutDataQuery extends FilteredBaseQuery {}


export class EvolutionQuery extends TopBaseQuery {
}
