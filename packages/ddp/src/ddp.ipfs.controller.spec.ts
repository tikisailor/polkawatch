// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Test, TestingModule } from '@nestjs/testing';
import { DdpIpfs } from './ddp.ipfs.controller';
import { DdpLqsService } from './ddp.lqs.service';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
    let appController: DdpIpfs;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    validationSchema: Joi.object({
                        DDP_LQS_HOST: Joi.string().default('localhost'),
                        DDP_LQS_PROTO: Joi.string().default('http'),
                        DDP_LQS_PORT: Joi.number().default(7000),
                    }),
                }),
            ],
            controllers: [DdpIpfs],
            providers: [DdpLqsService],
        }).compile();

        appController = app.get<DdpIpfs>(DdpIpfs);
    });

    describe('root', () => {
        it('the controller should be defined"', () => {
            expect(appController).toBeDefined();
        });
    });
});
