import * as React from 'react';

import { useEffect, useState } from "react";

import { Grid } from '@mui/material';

import {
    GeoRegionOverview
} from '@ddp/client';
import usePolkawatchApi from "../hooks/usePolkawatchApi";
import PieChart from "./PieChart";
import EvolutionChart from "./EvolutionChart";
import DetailTable from "./detail/DetailTableMain";

export default function GeoOverview() {

    const { lastUpdated, api } = usePolkawatchApi();

    const [pwData, setPwData] = useState({} as GeoRegionOverview);

    useEffect(() => {
        api.ddpIpfsGeoRegionOverview({
            lastEras: 60,
            validationType: 'public',
            topResults: 4
        }).then(response => setPwData(response.data));
        return () => {
        };
    }, [lastUpdated]);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    {pwData.topRegionalDistributionChart && (
                        <PieChart
                            title={'Rewards by Region'}
                            labels={pwData.topRegionalDistributionChart.labels}
                            series={pwData.topRegionalDistributionChart.data}
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                    {pwData.topRegionalDistributionChart && (
                        <EvolutionChart
                            title={'Evolution of Rewards by Region'}
                            labels={pwData.regionalEvolutionChart.labels}
                            series={pwData.regionalEvolutionChart.segments}
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    {pwData.regionalDistributionDetail && (
                        <DetailTable redirect='/geography/region/' data={pwData.regionalDistributionDetail} title='Regional Distribution Detail'/>
                    )}
                </Grid>
            </Grid>
        </>
    );
}