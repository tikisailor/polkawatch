// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Injectable } from '@nestjs/common';

import {RewardsByCountry, RewardsByRegion} from "@lqs/types";

@Injectable()
export class DdpLqsService {
    getHello(): string {
        return 'Hello World!';
    }
}
