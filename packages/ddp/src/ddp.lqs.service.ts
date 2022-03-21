// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Injectable } from '@nestjs/common';

import {Configuration,
    GeographyApi,
    ValidatorApi,
    NetworkApi,
} from "@lqs/client";


import {RewardsByCountry, RewardsByRegion} from "@lqs/types";

@Injectable()
export class DdpLqsService {

    private apiConfig:Configuration;

    constructor() {

    }

}
