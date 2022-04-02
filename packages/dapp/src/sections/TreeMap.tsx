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

const CHART_DATA = [
    {
        data: [
            {
                x: 'New Delhi',
                y: 218
            },
            {
                x: 'Kolkata',
                y: 149
            },
            {
                x: 'Mumbai',
                y: 184
            },
            {
                x: 'Ahmedabad',
                y: 55
            },
            {
                x: 'Bangaluru',
                y: 84
            },
            {
                x: 'Pune',
                y: 31
            },
            {
                x: 'Chennai',
                y: 70
            },
            {
                x: 'Jaipur',
                y: 30
            },
            {
                x: 'Surat',
                y: 44
            },
            {
                x: 'Hyderabad',
                y: 68
            },
            {
                x: 'Lucknow',
                y: 28
            },
            {
                x: 'Indore',
                y: 19
            },
            {
                x: 'Kanpur',
                y: 29
            }
        ]
    }
]

export default function TreeMap({title, series}) {

    const chartOptions = merge(BaseOptionChart(), {
        legend: {
            show: false
        },
        dataLabels: { enabled: true, dropShadow: { enabled: false } },
    });
    return (
        <Card>
            <CardHeader title={title} />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ReactApexChart type="treemap" series={series} options={chartOptions} height={400} />
            </Box>
        </Card>
    );
}
