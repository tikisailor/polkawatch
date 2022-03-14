// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/lqs.module';
import jestOpenAPI from 'jest-openapi';
import { IndexQueryService } from '../src/lqs.index.service';
import { configure } from '../src/lqs.config';

import { loadFixture, saveFixture } from './regression.tools';
import * as fs from 'fs';

describe('LQS end-to-end testing', () => {
    let httpServer;
    let app;

    beforeEach(async () => {

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        // Configure the app as in production and setup OpenAPI testing
        jestOpenAPI(configure(app, false));

        // retrieve the indexService and the doSearch method
        const indexService = moduleFixture.get<IndexQueryService>(IndexQueryService);
        const doSearchImpl = indexService.doSearch;

        // Enable fixture recording
        if (process.env.LQS_E2E_TEST_MODE === 'record') {
            jest.spyOn(indexService, 'doSearch').mockImplementation(async (e, p)=>{
                const rawResponse = await doSearchImpl(e, p);
                saveFixture(rawResponse, p);
                return rawResponse;
            });
        }

        // Enable Regression testing
        if (process.env.LQS_E2E_TEST_MODE === 'regression') {
            jest.spyOn(indexService, 'doSearch').mockImplementation((e, p)=>{
                return loadFixture(p);
            });
        }

        await app.init();
        httpServer = app.getHttpServer();
    });

    describe('E2E API Test', () => {

        it('About Dataset', async () => {
            await request(httpServer)
                .post('/lqs/about/dataset')
                .send({ StartingEra: 499 })
                .then(async (response) => {
                    expect(response.statusCode).toBe(200);
                    expect(response).toSatisfyApiSpec();
                });
        });

        it('Geo Region', async () => {
            await request(httpServer)
                .post('/lqs/geo/region')
                .send({ StartingEra: 499, TopResults: 10 })
                .then(async (response) => {
                    expect(response.statusCode).toBe(200);
                    expect(response).toSatisfyApiSpec();
                });
        });
        it('Get Country', async () => {
            await request(httpServer)
                .post('/lqs/geo/country')
                .send({ StartingEra: 501, TopResults: 5 })
                .then(async (response) => {
                    expect(response.statusCode).toBe(200);
                    expect(response).toSatisfyApiSpec();
                });
        });
        it('Networks', async () => {
            await request(httpServer)
                .post('/lqs/net/network')
                .send({ StartingEra: 500, TopResults: 3 })
                .then(async (response) => {
                    expect(response.statusCode).toBe(200);
                    expect(response).toSatisfyApiSpec();
                });
        });
        it('Validator Group', async () => {
            await request(httpServer)
                .post('/lqs/validator/group')
                .send({ StartingEra: 500, TopResults: 3 })
                .then(async (response) => {
                    expect(response.statusCode).toBe(200);
                    expect(response).toSatisfyApiSpec();
                });
        });

        it('Will test era validation', async () => {
            await request(httpServer)
                .post('/lqs/geo/region')
                .send({ StartingEra: 'error', TopResults: 3 })
                .then(async (response) => {
                    expect(response.statusCode).toBe(400);
                });
        });

        it('Will test top results validation', async () => {
            await request(httpServer)
                .post('/lqs/geo/region')
                .send({ StartingEra: 400, TopResults: 'error' })
                .then(async (response) => {
                    expect(response.statusCode).toBe(400);
                });
        });

        // For convenience we generate the openapi specification document
        // only after having verified that some e2e tests are successful.

        it('Will create openapi specification', async () => {
            const doc = configure(app, true);
            const outPath = 'lqs-api-spec.json';
            fs.writeFile(outPath, JSON.stringify(doc), (error) => {
                if (error) throw error;
            });
        });
    });
});