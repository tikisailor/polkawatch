import * as React from 'react';

import { merge } from 'lodash';
import ReactApexChart from '../components/ReactApexCharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../components/charts';
import * as ellipsize from 'ellipsize';

export default function TreeMap({title, series}) {

    const chartOptions = merge(BaseOptionChart(), {
        legend: {
            show: false
        },
        dataLabels: {
            enabled: true,
            formatter: function(val){
                return ellipsize(val,15);
            }
        },
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
