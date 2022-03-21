// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Controller, Get } from '@nestjs/common';
import { DdpLqsService } from './ddp.lqs.service';

@Controller()
export class DdpController {
    constructor(private readonly appService: DdpLqsService) {
        // empty
    }

  @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
