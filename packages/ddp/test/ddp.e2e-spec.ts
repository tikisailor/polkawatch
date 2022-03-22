// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DdpModule } from '../src/ddp.module';
import { configure } from '../src/ddp.config';
import jestOpenAPI from 'jest-openapi';
import * as fs from 'fs';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [DdpModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        // Configure the app as in production and setup OpenAPI testing
        jestOpenAPI(configure(app, false));

        await app.init();
    });

    // For convenience we generate the openapi specification document
    // only after having verified that some e2e tests are successful.

    it('Will create openapi specification', async () => {
        const doc = configure(app, true);
        const outPath = 'ddp-api-spec.json';
        fs.writeFile(outPath, JSON.stringify(doc), (error) => {
            if (error) throw error;
        });
    });
});
