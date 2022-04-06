import * as React from 'react';

import { useEffect, useState } from "react";

import { Grid } from '@mui/material';

import {
    RegionDetail
} from '@ddp/client';
import usePolkawatchApi from "../../hooks/usePolkawatchApi";

import TreeMap from "../TreeMap";
import DetailTable from "./DetailTableMain";

export default function RegionOverview({regionId}) {

    const { lastUpdated, api } = usePolkawatchApi();

    const [pwData, setPwData] = useState({} as RegionDetail);

    useEffect(() => {
        api.ddpIpfsRegionDetail({
            lastEras: 60,
            region: regionId,
        }).then(response => setPwData(response.data));
        return () => {
        };
    }, [lastUpdated]);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    {pwData.topCountryDistributionChart && (
                        <TreeMap
                            title={pwData.topCountryDistributionChart[0].name}
                            series={pwData.topCountryDistributionChart}
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    {pwData.countryDistributionDetail && (
                        <DetailTable redirect='/geography/country/' data={pwData.countryDistributionDetail} title='Regional Distribution Detail'/>
                    )}
                </Grid>
            </Grid>
        </>
    );
}