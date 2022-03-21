// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DdpModule } from './ddp.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(DdpModule);
    const config = new DocumentBuilder()
        .setTitle('Polkawatch Distributed Data Pack')
        .setDescription('DDP Client/IPFS API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('ddp', app, document);
    await app.listen(app.get(ConfigService).get('DDP_PORT'));
}
bootstrap();
