// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ConfigService } from '@nestjs/config';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { OpenAPI } from 'openapi-types';

/**
 * Configures the Application. Allows to share configuration between Production
 * and Test runs.
 *
 * Returns the Swagge Document which is also required for testing.
 *
 * @param app
 */
export function configure(app, setupSwaggerModule = true): OpenAPI.Document {

    // Makes .env available
    const configService = app.get(ConfigService);

    // // Get global prefix from .env
    const globalPrefix: string = configService.get('DDP_GLOBAL_PREFIX');

    // Versioning system
    app.enableVersioning({
        type: VersioningType.URI,
    });

    // Allow configurable CORS
    app.enableCors({ origin: configService.get('DDP_CORS_ORIGIN') });

    // Set global prefix
    app.setGlobalPrefix(globalPrefix);

    // Enable validation pipeline globally
    app.useGlobalPipes(new ValidationPipe({ transform:true }));

    // Swagger setup
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Polkawatch Distributed Data Pack')
        .setDescription('DDP Development Endpoint/IPFS data pack generation source API')
        .setVersion(configService.get('npm_package_version'))
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    if(setupSwaggerModule) SwaggerModule.setup(globalPrefix, app, document);

    return document as OpenAPI.Document;
}
