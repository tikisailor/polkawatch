// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DdpIpfsController } from './ddp.ipfs.controller';
import { DdpLqsService } from './ddp.lqs.service';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid('development', 'production', 'test')
                    .default('development'),
                DDP_CORS_ORIGIN: Joi.string().default('*'),
                DDP_PORT: Joi.number().default(7200),
                DDP_GLOBAL_PREFIX: Joi.string().default('ddp'),
                DDP_LQS_HOST: Joi.string().default('localhost'),
                DDP_LQS_PROTO: Joi.string().default('http'),
                DDP_LQS_PORT: Joi.number().default(7000),
            }),
        }),
    ],
    controllers: [DdpIpfsController],
    providers: [DdpLqsService],
})
export class DdpModule {}
