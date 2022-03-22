// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Test, TestingModule } from '@nestjs/testing';
import { DdpIpfsController } from './ddp.ipfs.controller';
import { DdpLqsService } from './ddp.lqs.service';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
    let appController: DdpIpfsController;

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
            controllers: [DdpIpfsController],
            providers: [DdpLqsService],
        }).compile();

        appController = app.get<DdpIpfsController>(DdpIpfsController);
    });

    describe('root', () => {
        it('the controller should be defined"', () => {
            expect(appController).toBeDefined();
        });
    });
});
