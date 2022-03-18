// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Expose, Transform } from 'class-transformer';
import { ApiProperty, PickType } from '@nestjs/swagger';

/**
 * All queries will have as a response either a record or an array of records
 */
export type QueryResponse =
    QueryResponseRecord |
    Array<QueryResponseRecord> |
    Array<QueryResponseSegment<QueryResponseRecord>> |
    ChartDistribution;

/**
 * A segmented query returns multiple arrays of records
 */

export interface ChartDistribution{
    labels: string[],
    data: number[],
}

export class QueryResponseSegment<T> {

    @ApiProperty({
        description: 'The segment ID',
    })
    @Expose({ name: 'key' })
        Id: string;

    // This field is not described for been to abstract, please override and provide a templated documentation.
    Segment: Array<T>;
}

/**
 * Here we list all possible Response Records we may get
 */
export type QueryResponseRecord = RewardsByRegion | RewardsByCountry | RewardsByNetworkProvider |
            RewardsByValidationGroup | AboutData | EntitiesEraEvolution | RewardEraEvolution;


/**
 * Rewards Aggregations
 */

export class RewardAggregations {

    @ApiProperty({
        description: 'The sum of rewarded Dots in reward events',
    })
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'reward' })
        DotRewards: number;

    @ApiProperty({
        description: 'The number of unique regions in reward events',
    })
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'regions' })
        Regions: number;

    @ApiProperty({
        description: 'The number of unique countries in reward events',
    })
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'countries' })
        Countries: number;

    @ApiProperty({
        description: 'The number of unique networks in reward events',
    })
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'networks' })
        Networks: number;

    @ApiProperty({
        description: 'The number of unique validator groups in reward events',
    })
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'validator_groups' })
        ValidatorGroups: number;

    @ApiProperty({
        description: 'The number of unique validators in reward events',
    })
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'validators' })
        Validators: number;

    @ApiProperty({
        description: 'The number of unique nominators in reward events',
    })
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'nominators' })
        Nominators: number;

}

/**
 * About Data
 */

export class AboutData extends RewardAggregations {
    @ApiProperty({
        description: 'The count of eras for which rewards are present',
    })
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'total_eras' })
        Eras: number;

    @ApiProperty({
        description: 'The count of reward events',
    })
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'reward_events' })
        RewardEvents: number;

    @ApiProperty({
        description: 'The latest era for which rewards are present',
    })
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'latest_era' })
        LastestEra: number;
}

/**
 * Rewards by Region
 */

export class RewardsByRegion extends PickType(RewardAggregations, ['DotRewards', 'Countries', 'Networks', 'ValidatorGroups', 'Validators', 'Nominators'] as const) {

    @ApiProperty({
        description: 'The region ID',
    })
    @Expose({ name: 'key' })
        Id: string;

    @ApiProperty({
        description: 'The region name',
    })
    @Transform(({ value }) => value.hits.hits['0'].fields.validator_country_group_name['0'], { toClassOnly: true })
  @Expose({ name: 'name' })
        Region: string;
}

/**
 * Rewards by Country
 */

export class RewardsByCountry extends PickType(RewardAggregations, ['DotRewards', 'Networks', 'ValidatorGroups', 'Validators', 'Nominators'] as const) {
    @ApiProperty({
        description: 'The country ID, its ISO Code',
    })
    @Expose({ name: 'key' })
        Id: string;

    @ApiProperty({
        description: 'The country name',
    })
    @Transform(({ value }) => value.hits.hits['0'].fields.validator_country_name['0'], { toClassOnly: true })
    @Expose({ name: 'name' })
        Country: string;

}

/**
 * Rewards by Computing Network Provider
 */

export class RewardsByNetworkProvider extends PickType(RewardAggregations, ['DotRewards', 'Regions', 'Countries', 'ValidatorGroups', 'Validators', 'Nominators'] as const) {

    @ApiProperty({
        description: 'The network provider ID, its ASN number',
    })
    @Expose({ name: 'key' })
        Id: string;

    @ApiProperty({
        description: 'The network provider name',
    })
    @Transform(({ value }) => value.hits.hits['0'].fields.validator_asn_name['0'], { toClassOnly: true })
    @Expose({ name: 'name' })
        NetworkProvider: string;

}

/**
 * Rewards by Validator Group
 */

export class RewardsByValidationGroup extends PickType(RewardAggregations, ['DotRewards', 'Regions', 'Countries', 'Networks', 'Validators', 'Nominators'] as const) {

    @ApiProperty({
        description: 'The validator id for the group',
    })
    @Expose({ name: 'key' })
        Id: string;

    @ApiProperty({
        description: 'The validator group name',
    })
    @Transform(({ value }) => value.hits.hits['0'].fields.validator_parent_name['0'], { toClassOnly: true })
    @Expose({ name: 'name' })
        ValidationGroup: string;

    @ApiProperty({
        description: 'The median nomination in Dots for this validator group',
    })
    @Transform(({ value }) => value.values['50.0'], { toClassOnly: true })
    @Expose({ name: 'median_nomination' })
        DotMedianNomination: number;

}

/**
 * Evolution, by Era Responses
 */

export class EraEvolution {
    @ApiProperty({
        description: 'The staking era number',
    })
    @Expose({ name: 'key' })
        Era: number;
}

export class EntitiesEraEvolution extends EraEvolution {
    @ApiProperty({
        description: 'The unique count countries of validators that produced rewards',
    })
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'countries' })
        Countries: number;

    @ApiProperty({
        description: 'The unique count of computing networks of the validators that produced rewards',
    })
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'networks' })
        Networks: number;

    @ApiProperty({
        description: 'The unique count of validator groups that produced rewards',
    })
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'validator_groups' })
        ValidatorGroups: number;

    @ApiProperty({
        description: 'The unique count of validators that produced rewards',
    })
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'validators' })
        Validators: number;

    @ApiProperty({
        description: 'The unique count of nominators that produced rewards',
    })
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'nominators' })
        Nominators: number;
}


export class RewardEraEvolution extends EraEvolution {
    @ApiProperty({
        description: 'The rewards in Dot',
    })
    @Transform(({ value }) => value.value, { toClassOnly: true })
    @Expose({ name: 'reward' })
        DotRewards: number;
}

export class RegionalRewardEraEvolution extends QueryResponseSegment<RewardEraEvolution> {

    @ApiProperty({
        description: 'The segment of Reward per Era ',
        type: RewardEraEvolution,
        isArray: true,
    })
        Segment: Array<RewardEraEvolution>;
}