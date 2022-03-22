// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NestFactory } from '@nestjs/core';
import { DdpModule } from './ddp.module';
import { ConfigService } from '@nestjs/config';
import { configure } from './ddp.config';

async function bootstrap() {
    const app = await NestFactory.create(DdpModule);

    configure(app);

    await app.listen(app.get(ConfigService).get('DDP_PORT'));
}
bootstrap();
