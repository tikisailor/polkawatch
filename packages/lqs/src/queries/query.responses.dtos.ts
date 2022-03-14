// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Expose, Transform } from 'class-transformer';
import { ApiResponseProperty, PickType } from '@nestjs/swagger';

/**
 * All queries will have as a response either a record or an array of records
 */
export type QueryResponse = QueryResponseRecord | Array<QueryResponseRecord>;

/**
 * Here we list all possible Response Records we may get
 */
export type QueryResponseRecord = RewardsByRegion | RewardsByCountry | RewardsByNetworkProvider | RewardsByValidationGroup | AboutData;


/**
 * Rewards Aggregations
 */

export class RewardAggregations {

    @ApiResponseProperty()
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'reward' })
        DotRewards: number;

    @ApiResponseProperty()
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'regions' })
        Regions: number;

    @ApiResponseProperty()
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'countries' })
        Countries: number;

    @ApiResponseProperty()
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'networks' })
        Networks: number;

    @ApiResponseProperty()
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'validator_groups' })
        ValidatorGroups: number;

    @ApiResponseProperty()
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'validators' })
        Validators: number;

    @ApiResponseProperty()
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'nominators' })
        Nominators: number;

}

/**
 * About Data
 */

export class AboutData extends RewardAggregations {
    @ApiResponseProperty()
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'total_eras' })
        Eras: number;

    @ApiResponseProperty()
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'reward_events' })
        RewardEvents: number;

    @ApiResponseProperty()
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'latest_era' })
        LastestEra: number;
}

/**
 * Rewards by Region
 */

export class RewardsByRegion extends PickType(RewardAggregations, ['DotRewards', 'Countries', 'Networks', 'ValidatorGroups', 'Validators', 'Nominators'] as const) {

    @ApiResponseProperty()
    @Expose({ name: 'key' })
        Id: string;
    
  @ApiResponseProperty()
  @Transform(({ value }) => value.hits.hits['0'].fields.validator_country_group_name['0'], { toClassOnly: true })
  @Expose({ name: 'name' })
      Region: string;
}

/**
 * Rewards by Country
 */

export class RewardsByCountry extends PickType(RewardAggregations, ['DotRewards', 'Networks', 'ValidatorGroups', 'Validators', 'Nominators'] as const) {
    @ApiResponseProperty()
    @Expose({ name: 'key' })
        Id: string;

    @ApiResponseProperty()
    @Transform(({ value }) => value.hits.hits['0'].fields.validator_country_name['0'], { toClassOnly: true })
    @Expose({ name: 'name' })
        Country: string;

}

/**
 * Rewards by Computing Network Provider
 */

export class RewardsByNetworkProvider extends PickType(RewardAggregations, ['DotRewards', 'Regions', 'Countries', 'ValidatorGroups', 'Validators', 'Nominators'] as const) {

    @ApiResponseProperty()
    @Expose({ name: 'key' })
        Id: string;

    @ApiResponseProperty()
    @Transform(({ value }) => value.hits.hits['0'].fields.validator_asn_name['0'], { toClassOnly: true })
    @Expose({ name: 'name' })
        NetworkProvider: string;

}

/**
 * Rewards by Validator Group
 */

export class RewardsByValidationGroup extends PickType(RewardAggregations, ['DotRewards', 'Regions', 'Countries', 'Networks', 'Validators', 'Nominators'] as const) {

    @ApiResponseProperty()
    @Expose({ name: 'key' })
        Id: string;

    @ApiResponseProperty()
    @Transform(({ value }) => value.hits.hits['0'].fields.validator_parent_name['0'], { toClassOnly: true })
    @Expose({ name: 'name' })
        ValidationGroup: string;

    @ApiResponseProperty()
    @Transform(({ value }) => value.values['50.0'], { toClassOnly: true })
    @Expose({ name: 'median_nomination' })
        DotMedianNomination: number;

}