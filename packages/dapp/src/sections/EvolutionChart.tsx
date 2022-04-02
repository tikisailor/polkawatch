import * as React from 'react';

import { merge } from 'lodash';
import ReactApexChart from '../components/ReactApexCharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../components/charts';

// ----------------------------------------------------------------------

// const CHART_DATA = [
//   {
//     name: 'Team A',
//     type: 'column',
//     data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
//   },
//   {
//     name: 'Team B',
//     type: 'area',
//     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
//   },
//   {
//     name: 'Team C',
//     type: 'line',
//     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
//   }
// ];

export default function EvolutionChart({title,labels,series}) {

    const chartOptions = merge(BaseOptionChart(), {
        stroke: {
            width: [3, 3, 3],
            curve: 'straight',
        },
        // plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
        // fill: { type: ['solid', 'gradient', 'solid'] },
        labels: labels,
        xaxis: { type: 'number' },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y) => {
                    if (typeof y !== 'undefined') {
                        return `${y.toFixed(0)} dot`;
                    }
                    return y;
                }
            }
        }
    });
    return (
        <Card>
            <CardHeader title={title} />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ReactApexChart type="line" series={series} options={chartOptions} height={364} />
            </Box>
        </Card>
    );
}
