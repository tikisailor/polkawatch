import * as React from 'react';

import { merge } from 'lodash';
import ReactApexChart from '../components/ReactApexCharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../components/charts';

// ----------------------------------------------------------------------

export default function EvolutionChart({title,labels,series}) {

    const chartOptions = merge(BaseOptionChart(), {
        chart:{
            stacked: true
        },
        xaxis: {
            categories: labels,
            labels: { show: false }
        },
        yaxis: { labels: { show: false } }
    });

    return (
        <Card>
            <CardHeader title={title} />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ReactApexChart type="bar" series={series} options={chartOptions} height={364} />
            </Box>
        </Card>
    );
}
