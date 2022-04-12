import * as React from 'react';

import { merge } from 'lodash';
import ReactApexChart from '../components/ReactApexCharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber, fPercent } from '../utils/formatNumber';
//
import { BaseOptionChart } from '../components/charts';

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(5),
    '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible'
    },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        alignContent: 'center',
        position: 'relative !important',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
    }
}));

export default function PieChart({title,labels,series}) {
    const theme = useTheme();

    const chartOptions = merge(BaseOptionChart(), {
        colors: [
            theme.palette.primary.main,
            theme.palette.info.main,
            theme.palette.warning.main,
            theme.palette.error.main
        ],
        labels: labels,
        stroke: { colors: [theme.palette.background.paper] },
        legend: { floating: true, horizontalAlign: 'center' },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (value: string, w: { globals: { seriesTotals: number[] } }) => fPercent(value/w.globals.seriesTotals.reduce((a, b) => a + b, 0)*100),
                title: {
                    formatter: (seriesName: string) => `${seriesName}`,
                },
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '90%',
                    labels: {
                        value: {
                            formatter: (val: number | string) => fNumber(val),
                        },
                        total: {
                            formatter: (w: { globals: { seriesTotals: number[] } }) => {
                                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                return fNumber(sum);
                            },
                        },
                    },
                },
            },
        },
    });
    return (
        <Card>
            <CardHeader title={title} />
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="donut" series={series} options={chartOptions} height={280} />
            </ChartWrapperStyle>
        </Card>
    );
}
