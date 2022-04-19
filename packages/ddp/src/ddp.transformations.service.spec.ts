// Copyright 2021-2022 Valletech AB authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Test, TestingModule } from '@nestjs/testing';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { DdpTransformationService } from './ddp.transformations.service';

describe('Transformation Service', () => {
    let transformationService: DdpTransformationService;

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
            controllers: [],
            providers: [DdpTransformationService],
        }).compile();

        transformationService = app.get<DdpTransformationService>(DdpTransformationService) as DdpTransformationService;
    });

    describe('transformation service', () => {
        it('the transformation service should be defined"', () => {
            expect(transformationService).toBeDefined();
        });

        it('Will transform a distribution to a chart', () => {
            const chart = transformationService.toDistributionChart(test_data.test_distribution, 'Region');
            expect(chart).toBeDefined();
            expect(chart.data.length).toBe(6);
            expect(chart.labels[0]).toBe('Europe');
        });

        it('Will transform a distribution to a Treemap', () => {
            const chart = transformationService.toTreemapChart(test_data.test_distribution, 'Region');
            expect(chart).toBeDefined();
            expect(chart[0].name).toBe('Region');
            expect(chart[0].data.length).toBe(6);
            expect(chart[0].data[0].x).toBe('Europe');
        });

        it('Will transform an evolution query to a Chart', () => {
            const chart = transformationService.toEvolutionChart(test_data.test_evolution);
            expect(chart).toBeDefined();
            expect(chart.labels.length).toBe(161);
            expect(chart.segments.length).toBe(6);
            expect(chart.segments[0].name).toBe('EU');
        });

    });
});

/**
 * Test Data for Transformation unit tests.
 * Update this data from LQS Swagger UI.
 */
const test_data = {
    test_distribution: [
        {
            'DotRewards': 7198082.481011475,
            'Countries': 17,
            'Networks': 31,
            'ValidatorGroups': 142,
            'Validators': 208,
            'Nominators': 24464,
            'Id': 'EU',
            'Region': 'Europe',
        },
        {
            'DotRewards': 1518873.0895337742,
            'Countries': 3,
            'Networks': 18,
            'ValidatorGroups': 51,
            'Validators': 63,
            'Nominators': 14562,
            'Id': 'NA',
            'Region': 'North America',
        },
        {
            'DotRewards': 609129.7236368054,
            'Countries': 5,
            'Networks': 8,
            'ValidatorGroups': 16,
            'Validators': 19,
            'Nominators': 5771,
            'Id': 'AS',
            'Region': 'Asia',
        },
        {
            'DotRewards': 8366.1108257563,
            'Countries': 1,
            'Networks': 1,
            'ValidatorGroups': 1,
            'Validators': 1,
            'Nominators': 29,
            'Id': 'SA',
            'Region': 'South America',
        },
        {
            'DotRewards': 6874.9216726424,
            'Countries': 1,
            'Networks': 1,
            'ValidatorGroups': 1,
            'Validators': 1,
            'Nominators': 352,
            'Id': 'AF',
            'Region': 'Africa',
        },
        {
            'DotRewards': 5476.2425745961,
            'Countries': 1,
            'Networks': 1,
            'ValidatorGroups': 1,
            'Validators': 1,
            'Nominators': 169,
            'Id': 'OC',
            'Region': 'Oceania',
        },
    ],
    test_evolution: [
        {
            'Id': 'EU',
            'Segment': [
                {
                    'Era': 550,
                    'DotRewards': 565.7091762447,
                },
                {
                    'Era': 551,
                    'DotRewards': 561.9996662719,
                },
                {
                    'Era': 552,
                    'DotRewards': 712.2420038096,
                },
                {
                    'Era': 553,
                    'DotRewards': 401.103128228,
                },
                {
                    'Era': 554,
                    'DotRewards': 536.1084893156,
                },
                {
                    'Era': 555,
                    'DotRewards': 288.4595230769,
                },
                {
                    'Era': 556,
                    'DotRewards': 494.6597020325,
                },
                {
                    'Era': 557,
                    'DotRewards': 625.312547751,
                },
                {
                    'Era': 558,
                    'DotRewards': 632.7006699389,
                },
                {
                    'Era': 559,
                    'DotRewards': 631.0438134274,
                },
                {
                    'Era': 560,
                    'DotRewards': 534.4905384247,
                },
                {
                    'Era': 561,
                    'DotRewards': 130.0265301645,
                },
                {
                    'Era': 562,
                    'DotRewards': 489.48312294560003,
                },
                {
                    'Era': 563,
                    'DotRewards': 498.74539058040006,
                },
                {
                    'Era': 564,
                    'DotRewards': 636.9508446101,
                },
                {
                    'Era': 565,
                    'DotRewards': 943.4572958058,
                },
                {
                    'Era': 569,
                    'DotRewards': 1413.4406759833,
                },
                {
                    'Era': 570,
                    'DotRewards': 3882.4724642693,
                },
                {
                    'Era': 571,
                    'DotRewards': 2962.7778167859,
                },
                {
                    'Era': 572,
                    'DotRewards': 6886.7060272362005,
                },
                {
                    'Era': 573,
                    'DotRewards': 60358.8509077903,
                },
                {
                    'Era': 574,
                    'DotRewards': 60092.7569474085,
                },
                {
                    'Era': 575,
                    'DotRewards': 60007.7247572919,
                },
                {
                    'Era': 576,
                    'DotRewards': 61485.6854475707,
                },
                {
                    'Era': 577,
                    'DotRewards': 59762.47060592,
                },
                {
                    'Era': 578,
                    'DotRewards': 64253.937910329,
                },
                {
                    'Era': 579,
                    'DotRewards': 65747.0926168183,
                },
                {
                    'Era': 580,
                    'DotRewards': 71251.010067355,
                },
                {
                    'Era': 581,
                    'DotRewards': 64633.6393149009,
                },
                {
                    'Era': 582,
                    'DotRewards': 64525.4058683782,
                },
                {
                    'Era': 583,
                    'DotRewards': 61891.0871323966,
                },
                {
                    'Era': 584,
                    'DotRewards': 66802.25615445319,
                },
                {
                    'Era': 585,
                    'DotRewards': 65919.13560711,
                },
                {
                    'Era': 586,
                    'DotRewards': 67430.5977525149,
                },
                {
                    'Era': 587,
                    'DotRewards': 66797.8127939855,
                },
                {
                    'Era': 588,
                    'DotRewards': 69722.3855874131,
                },
                {
                    'Era': 589,
                    'DotRewards': 68867.8522052854,
                },
                {
                    'Era': 590,
                    'DotRewards': 65867.4676396391,
                },
                {
                    'Era': 591,
                    'DotRewards': 66591.4771736844,
                },
                {
                    'Era': 592,
                    'DotRewards': 67092.5749780083,
                },
                {
                    'Era': 593,
                    'DotRewards': 63139.1581979907,
                },
                {
                    'Era': 594,
                    'DotRewards': 58779.9843699831,
                },
                {
                    'Era': 595,
                    'DotRewards': 60681.7696607645,
                },
                {
                    'Era': 596,
                    'DotRewards': 60554.5159192444,
                },
                {
                    'Era': 597,
                    'DotRewards': 63172.1869699416,
                },
                {
                    'Era': 598,
                    'DotRewards': 58835.8537595971,
                },
                {
                    'Era': 599,
                    'DotRewards': 65535.8194226583,
                },
                {
                    'Era': 600,
                    'DotRewards': 63187.859199419,
                },
                {
                    'Era': 601,
                    'DotRewards': 61553.8129895691,
                },
                {
                    'Era': 602,
                    'DotRewards': 66692.6479360725,
                },
                {
                    'Era': 603,
                    'DotRewards': 61736.2204411787,
                },
                {
                    'Era': 604,
                    'DotRewards': 62903.0873517979,
                },
                {
                    'Era': 605,
                    'DotRewards': 62198.072019864,
                },
                {
                    'Era': 606,
                    'DotRewards': 63103.2214114399,
                },
                {
                    'Era': 607,
                    'DotRewards': 60580.0745956437,
                },
                {
                    'Era': 608,
                    'DotRewards': 64915.3451359777,
                },
                {
                    'Era': 609,
                    'DotRewards': 65395.3687167664,
                },
                {
                    'Era': 610,
                    'DotRewards': 68497.2156337865,
                },
                {
                    'Era': 611,
                    'DotRewards': 66143.2114185165,
                },
                {
                    'Era': 612,
                    'DotRewards': 65158.1055232415,
                },
                {
                    'Era': 613,
                    'DotRewards': 67964.152704872,
                },
                {
                    'Era': 614,
                    'DotRewards': 69651.8790236114,
                },
                {
                    'Era': 615,
                    'DotRewards': 62438.464679338496,
                },
                {
                    'Era': 616,
                    'DotRewards': 62435.0140341772,
                },
                {
                    'Era': 617,
                    'DotRewards': 67367.0110585434,
                },
                {
                    'Era': 618,
                    'DotRewards': 60760.3603159861,
                },
                {
                    'Era': 619,
                    'DotRewards': 64117.2895349349,
                },
                {
                    'Era': 620,
                    'DotRewards': 66859.4992377234,
                },
                {
                    'Era': 621,
                    'DotRewards': 65350.3952354695,
                },
                {
                    'Era': 622,
                    'DotRewards': 67238.73488469,
                },
                {
                    'Era': 623,
                    'DotRewards': 65073.8282859496,
                },
                {
                    'Era': 624,
                    'DotRewards': 67183.7890974225,
                },
                {
                    'Era': 625,
                    'DotRewards': 67476.4933478727,
                },
                {
                    'Era': 626,
                    'DotRewards': 66136.6464920175,
                },
                {
                    'Era': 627,
                    'DotRewards': 66958.4948621178,
                },
                {
                    'Era': 628,
                    'DotRewards': 66591.6679397063,
                },
                {
                    'Era': 629,
                    'DotRewards': 68740.8064777672,
                },
                {
                    'Era': 630,
                    'DotRewards': 64732.987565486,
                },
                {
                    'Era': 631,
                    'DotRewards': 70411.6728985767,
                },
                {
                    'Era': 632,
                    'DotRewards': 68904.9867990973,
                },
                {
                    'Era': 633,
                    'DotRewards': 66673.2033127169,
                },
                {
                    'Era': 634,
                    'DotRewards': 70886.014329817,
                },
                {
                    'Era': 635,
                    'DotRewards': 70014.2592712155,
                },
                {
                    'Era': 636,
                    'DotRewards': 64750.992980648596,
                },
                {
                    'Era': 637,
                    'DotRewards': 70088.5668605093,
                },
                {
                    'Era': 638,
                    'DotRewards': 64638.4852663456,
                },
                {
                    'Era': 639,
                    'DotRewards': 62790.1764322636,
                },
                {
                    'Era': 640,
                    'DotRewards': 60330.3925954196,
                },
                {
                    'Era': 641,
                    'DotRewards': 67623.0797702342,
                },
                {
                    'Era': 642,
                    'DotRewards': 62721.8410692061,
                },
                {
                    'Era': 643,
                    'DotRewards': 66393.9232488604,
                },
                {
                    'Era': 644,
                    'DotRewards': 63448.2379054553,
                },
                {
                    'Era': 645,
                    'DotRewards': 62430.9490707709,
                },
                {
                    'Era': 646,
                    'DotRewards': 59610.3041045203,
                },
                {
                    'Era': 647,
                    'DotRewards': 60743.1564779393,
                },
                {
                    'Era': 648,
                    'DotRewards': 62148.7552410181,
                },
                {
                    'Era': 649,
                    'DotRewards': 60800.4849673715,
                },
                {
                    'Era': 650,
                    'DotRewards': 63234.1303288073,
                },
                {
                    'Era': 651,
                    'DotRewards': 60670.2219945829,
                },
                {
                    'Era': 652,
                    'DotRewards': 60557.9144025444,
                },
                {
                    'Era': 653,
                    'DotRewards': 62069.0365724782,
                },
                {
                    'Era': 654,
                    'DotRewards': 60478.1003911488,
                },
                {
                    'Era': 655,
                    'DotRewards': 58964.1855779354,
                },
                {
                    'Era': 656,
                    'DotRewards': 65160.915016981104,
                },
                {
                    'Era': 657,
                    'DotRewards': 66382.3684966918,
                },
                {
                    'Era': 658,
                    'DotRewards': 64021.0640542057,
                },
                {
                    'Era': 659,
                    'DotRewards': 59260.3482073086,
                },
                {
                    'Era': 660,
                    'DotRewards': 53545.7997319671,
                },
                {
                    'Era': 661,
                    'DotRewards': 56079.9462863194,
                },
                {
                    'Era': 662,
                    'DotRewards': 63666.1258549063,
                },
                {
                    'Era': 663,
                    'DotRewards': 62683.8411166326,
                },
                {
                    'Era': 664,
                    'DotRewards': 60608.7612681452,
                },
                {
                    'Era': 665,
                    'DotRewards': 65590.5663874397,
                },
                {
                    'Era': 666,
                    'DotRewards': 60069.4788418123,
                },
                {
                    'Era': 667,
                    'DotRewards': 64889.5625453129,
                },
                {
                    'Era': 668,
                    'DotRewards': 62042.8961531924,
                },
                {
                    'Era': 669,
                    'DotRewards': 61645.5665440281,
                },
                {
                    'Era': 670,
                    'DotRewards': 62014.3406670573,
                },
                {
                    'Era': 671,
                    'DotRewards': 56158.2227569161,
                },
                {
                    'Era': 672,
                    'DotRewards': 62851.5819474843,
                },
                {
                    'Era': 673,
                    'DotRewards': 58579.9442063509,
                },
                {
                    'Era': 674,
                    'DotRewards': 59837.4308968996,
                },
                {
                    'Era': 675,
                    'DotRewards': 55359.5264929553,
                },
                {
                    'Era': 676,
                    'DotRewards': 56597.6665081873,
                },
                {
                    'Era': 677,
                    'DotRewards': 61645.1010900985,
                },
                {
                    'Era': 678,
                    'DotRewards': 59592.3726059362,
                },
                {
                    'Era': 679,
                    'DotRewards': 64331.8907495264,
                },
                {
                    'Era': 680,
                    'DotRewards': 64393.739395142,
                },
                {
                    'Era': 681,
                    'DotRewards': 60377.2267035624,
                },
                {
                    'Era': 682,
                    'DotRewards': 62751.7201595943,
                },
                {
                    'Era': 683,
                    'DotRewards': 61768.7248638943,
                },
                {
                    'Era': 684,
                    'DotRewards': 57569.3959382465,
                },
                {
                    'Era': 685,
                    'DotRewards': 54453.127308903,
                },
            ],
        },
        {
            'Id': 'NA',
            'Segment': [
                {
                    'Era': 525,
                    'DotRewards': 250.93831183449998,
                },
                {
                    'Era': 526,
                    'DotRewards': 225.3444549847,
                },
                {
                    'Era': 527,
                    'DotRewards': 212.7212309288,
                },
                {
                    'Era': 533,
                    'DotRewards': 260.9908741475,
                },
                {
                    'Era': 534,
                    'DotRewards': 176.06599980299998,
                },
                {
                    'Era': 535,
                    'DotRewards': 255.2867677154,
                },
                {
                    'Era': 538,
                    'DotRewards': 179.3772580944,
                },
                {
                    'Era': 539,
                    'DotRewards': 235.9687899705,
                },
                {
                    'Era': 541,
                    'DotRewards': 199.55260698220002,
                },
                {
                    'Era': 543,
                    'DotRewards': 212.07073081029998,
                },
                {
                    'Era': 548,
                    'DotRewards': 268.4980440391,
                },
                {
                    'Era': 551,
                    'DotRewards': 236.3361471654,
                },
                {
                    'Era': 552,
                    'DotRewards': 230.7961595738,
                },
                {
                    'Era': 553,
                    'DotRewards': 174.83318984009998,
                },
                {
                    'Era': 557,
                    'DotRewards': 182.4679952269,
                },
                {
                    'Era': 558,
                    'DotRewards': 318.5852855839,
                },
                {
                    'Era': 559,
                    'DotRewards': 537.1277381891,
                },
                {
                    'Era': 560,
                    'DotRewards': 489.39273043220004,
                },
                {
                    'Era': 562,
                    'DotRewards': 480.3835962211,
                },
                {
                    'Era': 563,
                    'DotRewards': 586.1039349022,
                },
                {
                    'Era': 568,
                    'DotRewards': 766.6112980409999,
                },
                {
                    'Era': 570,
                    'DotRewards': 616.7947512294,
                },
                {
                    'Era': 571,
                    'DotRewards': 2128.8600510538,
                },
                {
                    'Era': 572,
                    'DotRewards': 1365.2510021950002,
                },
                {
                    'Era': 573,
                    'DotRewards': 15377.7943149351,
                },
                {
                    'Era': 574,
                    'DotRewards': 13885.431369206899,
                },
                {
                    'Era': 575,
                    'DotRewards': 15431.3742445398,
                },
                {
                    'Era': 576,
                    'DotRewards': 15279.5717164684,
                },
                {
                    'Era': 577,
                    'DotRewards': 14969.4149396928,
                },
                {
                    'Era': 578,
                    'DotRewards': 12682.8962729591,
                },
                {
                    'Era': 579,
                    'DotRewards': 14508.2953472166,
                },
                {
                    'Era': 580,
                    'DotRewards': 10816.1319063629,
                },
                {
                    'Era': 581,
                    'DotRewards': 13298.9755070185,
                },
                {
                    'Era': 582,
                    'DotRewards': 14136.494966427601,
                },
                {
                    'Era': 583,
                    'DotRewards': 13011.8156459817,
                },
                {
                    'Era': 584,
                    'DotRewards': 13635.9081206642,
                },
                {
                    'Era': 585,
                    'DotRewards': 13948.8061379794,
                },
                {
                    'Era': 586,
                    'DotRewards': 11963.0832855203,
                },
                {
                    'Era': 587,
                    'DotRewards': 10511.6119613167,
                },
                {
                    'Era': 588,
                    'DotRewards': 11335.3638713308,
                },
                {
                    'Era': 589,
                    'DotRewards': 12082.747910690401,
                },
                {
                    'Era': 590,
                    'DotRewards': 10538.1851981319,
                },
                {
                    'Era': 591,
                    'DotRewards': 11434.1980226309,
                },
                {
                    'Era': 592,
                    'DotRewards': 11735.4420906172,
                },
                {
                    'Era': 593,
                    'DotRewards': 14242.637364505,
                },
                {
                    'Era': 594,
                    'DotRewards': 18266.8539977172,
                },
                {
                    'Era': 595,
                    'DotRewards': 16516.4483658348,
                },
                {
                    'Era': 596,
                    'DotRewards': 16210.0788892702,
                },
                {
                    'Era': 597,
                    'DotRewards': 15186.691947548401,
                },
                {
                    'Era': 598,
                    'DotRewards': 14959.004203549499,
                },
                {
                    'Era': 599,
                    'DotRewards': 16305.3237388285,
                },
                {
                    'Era': 600,
                    'DotRewards': 16514.1020075052,
                },
                {
                    'Era': 601,
                    'DotRewards': 16742.145962294,
                },
                {
                    'Era': 602,
                    'DotRewards': 17173.6243188893,
                },
                {
                    'Era': 603,
                    'DotRewards': 17060.8301724189,
                },
                {
                    'Era': 604,
                    'DotRewards': 16479.0237248773,
                },
                {
                    'Era': 605,
                    'DotRewards': 14682.7584668044,
                },
                {
                    'Era': 606,
                    'DotRewards': 16650.4981423477,
                },
                {
                    'Era': 607,
                    'DotRewards': 13856.7863320639,
                },
                {
                    'Era': 608,
                    'DotRewards': 12637.9210015235,
                },
                {
                    'Era': 609,
                    'DotRewards': 10303.4435136261,
                },
                {
                    'Era': 610,
                    'DotRewards': 9717.919319263001,
                },
                {
                    'Era': 611,
                    'DotRewards': 10602.2252573891,
                },
                {
                    'Era': 612,
                    'DotRewards': 12833.2794567103,
                },
                {
                    'Era': 613,
                    'DotRewards': 11498.4886967684,
                },
                {
                    'Era': 614,
                    'DotRewards': 12140.4430641158,
                },
                {
                    'Era': 615,
                    'DotRewards': 13329.8305376895,
                },
                {
                    'Era': 616,
                    'DotRewards': 15550.8983872842,
                },
                {
                    'Era': 617,
                    'DotRewards': 14114.3658275791,
                },
                {
                    'Era': 618,
                    'DotRewards': 14855.2697074161,
                },
                {
                    'Era': 619,
                    'DotRewards': 11658.2004974985,
                },
                {
                    'Era': 620,
                    'DotRewards': 11685.5485782607,
                },
                {
                    'Era': 621,
                    'DotRewards': 10206.1460096628,
                },
                {
                    'Era': 622,
                    'DotRewards': 12332.3473697044,
                },
                {
                    'Era': 623,
                    'DotRewards': 10349.947627695401,
                },
                {
                    'Era': 624,
                    'DotRewards': 8115.3900957754,
                },
                {
                    'Era': 625,
                    'DotRewards': 11247.2525555808,
                },
                {
                    'Era': 626,
                    'DotRewards': 11557.4942545019,
                },
                {
                    'Era': 627,
                    'DotRewards': 11441.8404732504,
                },
                {
                    'Era': 628,
                    'DotRewards': 16014.9060304113,
                },
                {
                    'Era': 629,
                    'DotRewards': 12070.8118155147,
                },
                {
                    'Era': 630,
                    'DotRewards': 11938.7211966477,
                },
                {
                    'Era': 631,
                    'DotRewards': 9963.6343791335,
                },
                {
                    'Era': 632,
                    'DotRewards': 12260.4886894082,
                },
                {
                    'Era': 633,
                    'DotRewards': 12233.5886522162,
                },
                {
                    'Era': 634,
                    'DotRewards': 13128.5493115734,
                },
                {
                    'Era': 635,
                    'DotRewards': 14082.0516613815,
                },
                {
                    'Era': 636,
                    'DotRewards': 14649.8419563177,
                },
                {
                    'Era': 637,
                    'DotRewards': 12608.0211770752,
                },
                {
                    'Era': 638,
                    'DotRewards': 16675.9820123837,
                },
                {
                    'Era': 639,
                    'DotRewards': 17678.7470762587,
                },
                {
                    'Era': 640,
                    'DotRewards': 19731.6174536764,
                },
                {
                    'Era': 641,
                    'DotRewards': 13926.2088174215,
                },
                {
                    'Era': 642,
                    'DotRewards': 12715.5552103329,
                },
                {
                    'Era': 643,
                    'DotRewards': 13793.1389097975,
                },
                {
                    'Era': 644,
                    'DotRewards': 13800.649433565799,
                },
                {
                    'Era': 645,
                    'DotRewards': 13921.762004183,
                },
                {
                    'Era': 646,
                    'DotRewards': 14560.3886003954,
                },
                {
                    'Era': 647,
                    'DotRewards': 18589.8951629018,
                },
                {
                    'Era': 648,
                    'DotRewards': 11846.1698710953,
                },
                {
                    'Era': 649,
                    'DotRewards': 15233.4247508517,
                },
                {
                    'Era': 650,
                    'DotRewards': 10868.2857319371,
                },
                {
                    'Era': 651,
                    'DotRewards': 11997.1316196154,
                },
                {
                    'Era': 652,
                    'DotRewards': 12581.0246708183,
                },
                {
                    'Era': 653,
                    'DotRewards': 12237.1341871204,
                },
                {
                    'Era': 654,
                    'DotRewards': 13793.1128179432,
                },
                {
                    'Era': 655,
                    'DotRewards': 12527.1293194819,
                },
                {
                    'Era': 656,
                    'DotRewards': 10272.3272530446,
                },
                {
                    'Era': 657,
                    'DotRewards': 12043.4735293616,
                },
                {
                    'Era': 658,
                    'DotRewards': 12556.2641067858,
                },
                {
                    'Era': 659,
                    'DotRewards': 15055.4694806238,
                },
                {
                    'Era': 660,
                    'DotRewards': 15706.324230296499,
                },
                {
                    'Era': 661,
                    'DotRewards': 16535.9388882744,
                },
                {
                    'Era': 662,
                    'DotRewards': 14463.2759223191,
                },
                {
                    'Era': 663,
                    'DotRewards': 11915.0972479832,
                },
                {
                    'Era': 664,
                    'DotRewards': 13932.0923622386,
                },
                {
                    'Era': 665,
                    'DotRewards': 10808.631806220701,
                },
                {
                    'Era': 666,
                    'DotRewards': 13821.5070781862,
                },
                {
                    'Era': 667,
                    'DotRewards': 11083.9554202359,
                },
                {
                    'Era': 668,
                    'DotRewards': 9547.5547398329,
                },
                {
                    'Era': 669,
                    'DotRewards': 14139.198508045,
                },
                {
                    'Era': 670,
                    'DotRewards': 14572.6014667242,
                },
                {
                    'Era': 671,
                    'DotRewards': 14875.9508969469,
                },
                {
                    'Era': 672,
                    'DotRewards': 12183.8872169502,
                },
                {
                    'Era': 673,
                    'DotRewards': 14220.3118678784,
                },
                {
                    'Era': 674,
                    'DotRewards': 13002.2249963622,
                },
                {
                    'Era': 675,
                    'DotRewards': 13296.4876029096,
                },
                {
                    'Era': 676,
                    'DotRewards': 12523.2470684281,
                },
                {
                    'Era': 677,
                    'DotRewards': 12918.4756342614,
                },
                {
                    'Era': 678,
                    'DotRewards': 10083.312938455,
                },
                {
                    'Era': 679,
                    'DotRewards': 12591.276779583999,
                },
                {
                    'Era': 680,
                    'DotRewards': 11261.9159954979,
                },
                {
                    'Era': 681,
                    'DotRewards': 14871.5510041191,
                },
                {
                    'Era': 682,
                    'DotRewards': 11783.0910490061,
                },
                {
                    'Era': 683,
                    'DotRewards': 11971.8320192853,
                },
                {
                    'Era': 684,
                    'DotRewards': 13358.3915982493,
                },
                {
                    'Era': 685,
                    'DotRewards': 9850.4866618035,
                },
            ],
        },
        {
            'Id': 'AS',
            'Segment': [
                {
                    'Era': 570,
                    'DotRewards': 2937.2002229897003,
                },
                {
                    'Era': 571,
                    'DotRewards': 2179.8781211392,
                },
                {
                    'Era': 572,
                    'DotRewards': 3196.3513975672,
                },
                {
                    'Era': 573,
                    'DotRewards': 5637.7465524778,
                },
                {
                    'Era': 574,
                    'DotRewards': 5001.4373761263,
                },
                {
                    'Era': 575,
                    'DotRewards': 6138.0345933628,
                },
                {
                    'Era': 576,
                    'DotRewards': 5461.5815263415,
                },
                {
                    'Era': 577,
                    'DotRewards': 5975.4372560863,
                },
                {
                    'Era': 578,
                    'DotRewards': 4952.1799667446,
                },
                {
                    'Era': 579,
                    'DotRewards': 5277.2235583432,
                },
                {
                    'Era': 580,
                    'DotRewards': 4756.2807816373,
                },
                {
                    'Era': 581,
                    'DotRewards': 4541.6746423023,
                },
                {
                    'Era': 582,
                    'DotRewards': 5612.2614219263,
                },
                {
                    'Era': 583,
                    'DotRewards': 4953.2507762661,
                },
                {
                    'Era': 584,
                    'DotRewards': 4527.3507233756,
                },
                {
                    'Era': 585,
                    'DotRewards': 5078.246684011,
                },
                {
                    'Era': 586,
                    'DotRewards': 4550.9773695853,
                },
                {
                    'Era': 587,
                    'DotRewards': 4872.8311064104,
                },
                {
                    'Era': 588,
                    'DotRewards': 4522.5747617744,
                },
                {
                    'Era': 589,
                    'DotRewards': 4479.2886991188,
                },
                {
                    'Era': 590,
                    'DotRewards': 5083.3556941484,
                },
                {
                    'Era': 591,
                    'DotRewards': 5013.1788952151,
                },
                {
                    'Era': 592,
                    'DotRewards': 5017.3552289953,
                },
                {
                    'Era': 593,
                    'DotRewards': 4490.0742432804,
                },
                {
                    'Era': 594,
                    'DotRewards': 4261.309207804,
                },
                {
                    'Era': 595,
                    'DotRewards': 5827.6038715661,
                },
                {
                    'Era': 596,
                    'DotRewards': 4918.9668231705,
                },
                {
                    'Era': 597,
                    'DotRewards': 7143.4874665625,
                },
                {
                    'Era': 598,
                    'DotRewards': 6176.219252720501,
                },
                {
                    'Era': 599,
                    'DotRewards': 3325.6925909462,
                },
                {
                    'Era': 600,
                    'DotRewards': 5707.3600397184,
                },
                {
                    'Era': 601,
                    'DotRewards': 5172.8847783806,
                },
                {
                    'Era': 602,
                    'DotRewards': 4831.9063947517,
                },
                {
                    'Era': 603,
                    'DotRewards': 3408.8661935723,
                },
                {
                    'Era': 604,
                    'DotRewards': 4448.5702322306,
                },
                {
                    'Era': 605,
                    'DotRewards': 5231.1456177873,
                },
                {
                    'Era': 606,
                    'DotRewards': 4516.5936797052,
                },
                {
                    'Era': 607,
                    'DotRewards': 6102.6458803538,
                },
                {
                    'Era': 608,
                    'DotRewards': 5007.2487179701,
                },
                {
                    'Era': 609,
                    'DotRewards': 5709.6834416617,
                },
                {
                    'Era': 610,
                    'DotRewards': 4944.7476752853,
                },
                {
                    'Era': 611,
                    'DotRewards': 5233.7170704342,
                },
                {
                    'Era': 612,
                    'DotRewards': 4941.30444874,
                },
                {
                    'Era': 613,
                    'DotRewards': 4141.7643134674,
                },
                {
                    'Era': 614,
                    'DotRewards': 5337.4151964992,
                },
                {
                    'Era': 615,
                    'DotRewards': 4605.597802999,
                },
                {
                    'Era': 616,
                    'DotRewards': 4249.1328939661,
                },
                {
                    'Era': 617,
                    'DotRewards': 4992.1616192673,
                },
                {
                    'Era': 618,
                    'DotRewards': 4948.7995279996,
                },
                {
                    'Era': 619,
                    'DotRewards': 5010.486443163,
                },
                {
                    'Era': 620,
                    'DotRewards': 4914.0328655724,
                },
                {
                    'Era': 621,
                    'DotRewards': 4992.8673823522,
                },
                {
                    'Era': 622,
                    'DotRewards': 5607.1563767751,
                },
                {
                    'Era': 623,
                    'DotRewards': 4360.9699466408,
                },
                {
                    'Era': 624,
                    'DotRewards': 4170.4626829096,
                },
                {
                    'Era': 625,
                    'DotRewards': 5469.921091854,
                },
                {
                    'Era': 626,
                    'DotRewards': 4788.4922340681005,
                },
                {
                    'Era': 627,
                    'DotRewards': 5286.8092412467,
                },
                {
                    'Era': 628,
                    'DotRewards': 5532.9897152417,
                },
                {
                    'Era': 629,
                    'DotRewards': 4687.3187160359,
                },
                {
                    'Era': 630,
                    'DotRewards': 6776.8518340019,
                },
                {
                    'Era': 631,
                    'DotRewards': 5248.1538639835,
                },
                {
                    'Era': 632,
                    'DotRewards': 5777.551531087101,
                },
                {
                    'Era': 633,
                    'DotRewards': 3730.0879074896,
                },
                {
                    'Era': 634,
                    'DotRewards': 4529.8944436102,
                },
                {
                    'Era': 635,
                    'DotRewards': 5386.477475427901,
                },
                {
                    'Era': 636,
                    'DotRewards': 5148.4372167733,
                },
                {
                    'Era': 637,
                    'DotRewards': 6005.7787222567,
                },
                {
                    'Era': 638,
                    'DotRewards': 5040.6576127977005,
                },
                {
                    'Era': 639,
                    'DotRewards': 4343.8178399173,
                },
                {
                    'Era': 640,
                    'DotRewards': 6237.9142672498,
                },
                {
                    'Era': 641,
                    'DotRewards': 4117.0263825636,
                },
                {
                    'Era': 642,
                    'DotRewards': 5645.6531511952,
                },
                {
                    'Era': 643,
                    'DotRewards': 5678.1785348673,
                },
                {
                    'Era': 644,
                    'DotRewards': 4864.3911318679,
                },
                {
                    'Era': 645,
                    'DotRewards': 5950.6954314566,
                },
                {
                    'Era': 646,
                    'DotRewards': 4934.5517120757,
                },
                {
                    'Era': 647,
                    'DotRewards': 4339.6918609432,
                },
                {
                    'Era': 648,
                    'DotRewards': 7155.0826250984,
                },
                {
                    'Era': 649,
                    'DotRewards': 6234.3720909349,
                },
                {
                    'Era': 650,
                    'DotRewards': 6464.6085179844,
                },
                {
                    'Era': 651,
                    'DotRewards': 6467.8210676298,
                },
                {
                    'Era': 652,
                    'DotRewards': 5428.8624106014995,
                },
                {
                    'Era': 653,
                    'DotRewards': 5288.8273824879,
                },
                {
                    'Era': 654,
                    'DotRewards': 4412.7134603066,
                },
                {
                    'Era': 655,
                    'DotRewards': 5260.0895285517,
                },
                {
                    'Era': 656,
                    'DotRewards': 5595.5797010105,
                },
                {
                    'Era': 657,
                    'DotRewards': 4084.352884693,
                },
                {
                    'Era': 658,
                    'DotRewards': 6276.7633995819,
                },
                {
                    'Era': 659,
                    'DotRewards': 5484.1063092682,
                },
                {
                    'Era': 660,
                    'DotRewards': 5458.9748346141,
                },
                {
                    'Era': 661,
                    'DotRewards': 5790.0931845958,
                },
                {
                    'Era': 662,
                    'DotRewards': 4512.1673984382,
                },
                {
                    'Era': 663,
                    'DotRewards': 4393.3764655393,
                },
                {
                    'Era': 664,
                    'DotRewards': 6516.71228795,
                },
                {
                    'Era': 665,
                    'DotRewards': 8092.9939041296,
                },
                {
                    'Era': 666,
                    'DotRewards': 6730.0633263573,
                },
                {
                    'Era': 667,
                    'DotRewards': 6354.9244239031,
                },
                {
                    'Era': 668,
                    'DotRewards': 7049.5804689237,
                },
                {
                    'Era': 669,
                    'DotRewards': 5937.4905346226,
                },
                {
                    'Era': 670,
                    'DotRewards': 5242.9887176303,
                },
                {
                    'Era': 671,
                    'DotRewards': 4879.3777838774,
                },
                {
                    'Era': 672,
                    'DotRewards': 5484.8733984226,
                },
                {
                    'Era': 673,
                    'DotRewards': 7090.9560172166,
                },
                {
                    'Era': 674,
                    'DotRewards': 5137.1643434991,
                },
                {
                    'Era': 675,
                    'DotRewards': 5178.7762958529,
                },
                {
                    'Era': 676,
                    'DotRewards': 6582.535991263,
                },
                {
                    'Era': 677,
                    'DotRewards': 6956.980254142401,
                },
                {
                    'Era': 678,
                    'DotRewards': 7180.1426907247005,
                },
                {
                    'Era': 679,
                    'DotRewards': 5109.2994669229,
                },
                {
                    'Era': 680,
                    'DotRewards': 6860.0517651141,
                },
                {
                    'Era': 681,
                    'DotRewards': 5215.9066739875,
                },
                {
                    'Era': 682,
                    'DotRewards': 7462.837161848401,
                },
                {
                    'Era': 683,
                    'DotRewards': 7235.8864781647,
                },
                {
                    'Era': 684,
                    'DotRewards': 4352.1407933216,
                },
                {
                    'Era': 685,
                    'DotRewards': 2152.3356453858,
                },
            ],
        },
        {
            'Id': 'SA',
            'Segment': [
                {
                    'Era': 637,
                    'DotRewards': 629.8864227493,
                },
                {
                    'Era': 638,
                    'DotRewards': 805.7469937521,
                },
                {
                    'Era': 648,
                    'DotRewards': 885.2987432818999,
                },
                {
                    'Era': 649,
                    'DotRewards': 977.4786031094,
                },
                {
                    'Era': 650,
                    'DotRewards': 996.4698458819,
                },
                {
                    'Era': 651,
                    'DotRewards': 421.2010023182,
                },
                {
                    'Era': 652,
                    'DotRewards': 798.1504524948,
                },
                {
                    'Era': 653,
                    'DotRewards': 1010.1494536065,
                },
                {
                    'Era': 654,
                    'DotRewards': 621.7524788562,
                },
                {
                    'Era': 655,
                    'DotRewards': 1219.976829706,
                },
            ],
        },
        {
            'Id': 'AF',
            'Segment': [
                {
                    'Era': 612,
                    'DotRewards': 670.0365715825,
                },
                {
                    'Era': 613,
                    'DotRewards': 504.73132984299997,
                },
                {
                    'Era': 614,
                    'DotRewards': 883.2493007592001,
                },
                {
                    'Era': 615,
                    'DotRewards': 742.3285691973,
                },
                {
                    'Era': 620,
                    'DotRewards': 824.7810028009001,
                },
                {
                    'Era': 621,
                    'DotRewards': 663.7940078382001,
                },
                {
                    'Era': 645,
                    'DotRewards': 435.1229055438,
                },
                {
                    'Era': 646,
                    'DotRewards': 1063.835912429,
                },
                {
                    'Era': 647,
                    'DotRewards': 514.7028400539,
                },
                {
                    'Era': 648,
                    'DotRewards': 572.3392325946,
                },
            ],
        },
        {
            'Id': 'OC',
            'Segment': [
                {
                    'Era': 658,
                    'DotRewards': 977.6735658337999,
                },
                {
                    'Era': 659,
                    'DotRewards': 1212.3300179992,
                },
                {
                    'Era': 660,
                    'DotRewards': 653.2329386329001,
                },
                {
                    'Era': 662,
                    'DotRewards': 626.6045763222,
                },
                {
                    'Era': 682,
                    'DotRewards': 590.616133559,
                },
                {
                    'Era': 683,
                    'DotRewards': 799.7631605579,
                },
                {
                    'Era': 684,
                    'DotRewards': 616.0221816911001,
                },
            ],
        },
    ],
};