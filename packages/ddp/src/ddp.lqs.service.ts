// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export * from '@lqs/types';

export {
    AboutDataQuery,
    EvolutionQuery,
    RewardDistributionQuery,
} from '@lqs/client';

import { Configuration,
    AboutApi,
    GeographyApi,
    ValidatorApi,
    NetworkApi,
} from '@lqs/client';

@Injectable()
export class DdpLqsService {

    private readonly apiConfig:Configuration;

    constructor(private readonly configService:ConfigService) {
        const proto = configService.get('DDP_LQS_PROTO');
        const host = configService.get('DDP_LQS_HOST');
        const port = configService.get('DDP_LQS_PORT');

        this.apiConfig = new Configuration({
            basePath: `${proto}://${host}:${port}`,
        });
    }

    getAPI() {
        return {
            geography: new GeographyApi(this.apiConfig),
            network: new NetworkApi(this.apiConfig),
            validator: new ValidatorApi(this.apiConfig),
            about: new AboutApi(this.apiConfig),
        };
    }

    /**
     * Returns the starting era when we just want to query the last N eras.
     * @param eras
     */
    async getStartingEra(eras): Promise<number> {
        const lastEra = (await this.getAPI().about.aboutDatasetPost({
            aboutDataQuery:{
                StartingEra:1,
            },
        })).data.LastestEra;
        return lastEra - eras + 1;
    }

}
