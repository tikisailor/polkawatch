// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Test, TestingModule } from '@nestjs/testing';
import { DdpController } from './ddp.controller';
import { DdpLqsService } from './ddp.lqs.service';

describe('AppController', () => {
    let appController: DdpController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [DdpController],
            providers: [DdpLqsService],
        }).compile();

        appController = app.get<DdpController>(DdpController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(appController.getHello()).toBe('Hello World!');
        });
    });
});
