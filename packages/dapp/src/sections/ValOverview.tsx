import * as React from 'react';

import { useEffect, useState } from "react";

import { Grid } from '@mui/material';

import {
    OperatorOverview
} from '@ddp/client';

import usePolkawatchApi from "../hooks/usePolkawatchApi";

import TreeMap from "./TreeMap";
import DetailTable from "./detail/DetailTableMain";



export default function ValOverview() {

    const { lastUpdated, api } = usePolkawatchApi();

    const [pwData, setPwData] = useState({} as OperatorOverview);

    useEffect(() => {
        api.ddpIpfsOperatorOverview({
            lastEras: 60,
            validationType: 'public',
        }).then(response => setPwData(response.data));
        return () => {
        };
    }, [lastUpdated]);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    {pwData.topOperatorDistributionChart && (
                        <TreeMap
                            title={pwData.topOperatorDistributionChart[0].name}
                            series={pwData.topOperatorDistributionChart}
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    {pwData.operatorDistributionDetail && (
                        <DetailTable data={pwData.operatorDistributionDetail} title='Validator Distribution Detail'/>
                    )}
                </Grid>
            </Grid>
        </>
    );
}