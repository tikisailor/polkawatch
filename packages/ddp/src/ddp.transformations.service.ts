// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Injectable } from '@nestjs/common';
import * as dataForge from 'data-forge';
import {
    RegionalRewardEraEvolution,
    RewardsByRegion,
    RewardsByCountry,
    RewardsByNetworkProvider,
    RewardsByValidationGroup,
} from '@lqs/client';
import { DistributionChart, EvolutionChart, TreemapChart } from './ddp.types';

const range = (start, end) => {
    if(start === end) return [start];
    return [start, ...range(start + 1, end)];
};

@Injectable()
export class DdpTransformationService {
    constructor() {
        // do nothing
    }

    /**
     * Transforms the response received from LQS distribution query into chart input format
     * @param rewardDistribution
     */

    toDistributionChart(
        rewardDistribution: Array<RewardsByRegion | RewardsByCountry | RewardsByNetworkProvider | RewardsByValidationGroup>,
        labelSeries,
    ): DistributionChart {
        const df = new dataForge.DataFrame(rewardDistribution);
        const xLablesSeries = df.getSeries(labelSeries).toArray();
        const dataSeries = df.getSeries('DotRewards').toArray();
        return { data: dataSeries, labels: xLablesSeries };
    }

    /**
     * Transforms a RewardDistribution into a TreeMap Chart
     * @param rewardDistribution
     * @param label
     */
    toTreemapChart(
        rewardDistribution: Array<RewardsByRegion | RewardsByCountry| RewardsByNetworkProvider | RewardsByValidationGroup>,
        label,
    ): TreemapChart {
        return [{
            name: label,
            data: rewardDistribution.map(reward =>{
                return {
                    x: reward[label],
                    y: reward.DotRewards,
                };
            }),
        }];
    }

    /**
     * Transforms the response received from LQS evolution query into chart input format
     * @param lqsResponse
     */

    toEvolutionChart(lqsResponse: Array<RegionalRewardEraEvolution>): EvolutionChart {
        const eras = [];
        const transformedData = lqsResponse.map(entry => {
            const df = new dataForge.DataFrame(entry.Segment);
            eras.push(...df.getSeries('Era').toArray());
            return {
                name: entry.Id,
                data: df.getSeries('DotRewards').toArray(),
                labels: df.getSeries('Era').toArray(),
            };
        });

        // this part fills gaps with 0
        const eraRange = range(Math.min(...eras), Math.max(...eras));

        const noValueToZeroes = transformedData.map((entry, index: number) => {

            const df = new dataForge.DataFrame({ columns: { data: entry.data, label: entry.labels } });

            const df2 = new dataForge.DataFrame({ columns: { data: (new Array(eraRange.length).fill(0)), label: eraRange } });

            const joined = df2.joinOuterLeft(
                df,
                left => left.label,
                right => right.label,
                (left, right) => {
                    return {
                        data: right === null ? 0 : right.data,
                        labels: left.label,
                    };
                },
            );

            if (index === 0) {
                return {
                    name: entry.name,
                    data: joined.getSeries('data').toArray(),
                    labels: joined.getSeries('labels').toArray(),
                };
            } else {
                return {
                    name: entry.name,
                    data: joined.getSeries('data').toArray(),
                };

            }
        });

        const labels = noValueToZeroes[0].labels;
        delete noValueToZeroes[0].labels;
        return { labels: labels, segments: noValueToZeroes };
    }

}
