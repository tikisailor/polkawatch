import * as React from 'react';

import { useEffect, useState } from "react";

// import {Grid, useTheme} from '@mui/material';


// import PieChart from '../components/widgets/PieChart';

import usePolkawatchApi from "../hooks/usePolkawatchApi";




import { merge } from 'lodash';
import ReactApexChart from '../components/ReactApexCharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../utils/formatNumber';
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

export default function GeoOverview() {

    const theme = useTheme();

    const { lastUpdated,api } = usePolkawatchApi();

    const [geoDistributionData, setGeoDistributionData] = useState({});

    useEffect(() => {
        api.ddpIpfsGeoRegionOverview({
            topRegions: 3,
            lastEras: 60,
            validationType: 'public'
        }).then(response => setGeoDistributionData(response.data.topRegionalDistributionChart));
        console.log(geoDistributionData)
        return () => {};
    },[lastUpdated]);

    const chartOptions = merge(BaseOptionChart(), {
        colors: [
            theme.palette.primary.main,
            theme.palette.info.main,
            theme.palette.warning.main,
            theme.palette.error.main
        ],
        labels: geoDistributionData.labels,
        stroke: { colors: [theme.palette.background.paper] },
        legend: { floating: true, horizontalAlign: 'center' },
        dataLabels: { enabled: true, dropShadow: { enabled: false } },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName) => fNumber(seriesName),
                title: {
                    formatter: (seriesName) => `#${seriesName}`
                }
            }
        },
        plotOptions: {
            pie: { donut: { labels: { show: false } } }
        }
    });

    return (
        <Card>
            <CardHeader title="Distribution of DOT rewards by region" />
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="donut" series={geoDistributionData.data} options={chartOptions} height={280} />
            </ChartWrapperStyle>
        </Card>
    );
}

// <Box key={item.last} sx={{ mt: 3, mx: 3 }} dir="ltr">
//     {item.last === seriesData && (
//         <ReactApexChart type="area" series={item.data} options={chartOptions} height={364} />
//     )}
// </Box>