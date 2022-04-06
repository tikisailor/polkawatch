import * as React from 'react';

import { useEffect, useState } from "react";

import { Grid } from '@mui/material';

import {
    CountryDetail
} from '@ddp/client';
import usePolkawatchApi from "../../hooks/usePolkawatchApi";

import TreeMap from "../TreeMap";
import DetailTable from "./DetailTableMain";

export default function CountryOverview({countryId}) {

    const { lastUpdated, api } = usePolkawatchApi();

    const [pwData, setPwData] = useState({} as CountryDetail);

    useEffect(() => {
        api.ddpIpfsCountryDetail({
            lastEras: 60,
            country: countryId,
        }).then(response => setPwData(response.data));
        return () => {
        };
    }, [lastUpdated]);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    {pwData.topNetworkDistributionChart && (
                        <TreeMap
                            title={pwData.topNetworkDistributionChart[0].name}
                            series={pwData.topNetworkDistributionChart}
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    {pwData.countryDistributionDetail && (
                        <DetailTable redirect='/geography/country/' data={pwData.networkDistributionDetail} title='Country Distribution Detail'/>
                    )}
                </Grid>
            </Grid>
        </>
    );
}