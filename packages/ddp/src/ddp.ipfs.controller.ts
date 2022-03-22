// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Controller, Get, Param } from '@nestjs/common';
import {
    DdpLqsService,

} from './ddp.lqs.service';
import { AboutData } from '@lqs/types';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('polkawatch')
export class DdpIpfs {

    constructor(private readonly lqs: DdpLqsService) {
        // nothing
    }

    @Get('/about/dataset/:last_eras.json')
    @ApiOperation({
        description: 'Returns information about the dataset of the last N eras.',
    })
    @ApiOkResponse({ description: 'The evolution of DOT Rewards per Region', type: AboutData, isArray: false })
    @ApiParam({ name:'last_eras' })
    async aboutDataset(@Param() params): Promise<AboutData> {
        return (await this.lqs.getAPI().about.aboutDatasetPost({
            aboutDataQuery:{
                StartingEra: await this.lqs.getStartingEra(params.last_eras),
            },
        })).data;
    }
}
