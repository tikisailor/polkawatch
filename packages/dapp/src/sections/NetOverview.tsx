import * as React from 'react';

import { useEffect, useState } from "react";

import { Grid } from '@mui/material';

import {
    NetworkOverview
} from '@ddp/client';
import usePolkawatchApi from "../hooks/usePolkawatchApi";

import TreeMap from "./TreeMap";
import {RewardDistributionDetailTable} from "../components/RewardDistributionDetailTable";

export default function NetOverview() {

    const { lastUpdated, api } = usePolkawatchApi();

    const [pwData, setPwData] = useState({} as NetworkOverview);

    useEffect(() => {
        api.ddpIpfsNetworkOverview({
            lastEras: 60,
            validationType: 'public',
        }).then(response => setPwData(response.data));
        return () => {
        };
    }, [lastUpdated]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                {pwData.topNetworkDistributionChart && (
                    <TreeMap
                        title='Rewards by Network'
                        series={pwData.topNetworkDistributionChart}
                    />
                )}
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                {pwData.networkDistributionDetail && (
                    <RewardDistributionDetailTable
                        rowUri={row=>`/network/provider/${row.Id}/${encodeURI(row.NetworkProvider)}`}
                        tableData={pwData.networkDistributionDetail}
                        title='Rewards by Network'
                    />
                )}
            </Grid>
        </Grid>
    );
}