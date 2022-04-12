import * as React from 'react';

import { useEffect, useState } from "react";

import { Grid } from '@mui/material';

import {
    NetworkDetail
} from '@ddp/client';
import usePolkawatchApi from "../../hooks/usePolkawatchApi";

import TreeMap from "../TreeMap";
import {RewardDistributionDetailTable} from "../../components/RewardDistributionDetailTable";

export default function NetworkDetailView({networkId, networkName}) {

    const { lastUpdated, api } = usePolkawatchApi();

    const [pwData, setPwData] = useState({} as NetworkDetail);

    useEffect(() => {
        api.ddpIpfsNetworkDetail({
            lastEras: 60,
            network: networkId,
            validationType: 'public'
        }).then(response => setPwData(response.data));
        return () => {
        };
    }, [lastUpdated]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                {pwData.topCountryDistributionChart && (
                    <TreeMap
                        title={`Reward by Country for ${decodeURI(networkName)}`}
                        series={pwData.topCountryDistributionChart}
                    />
                )}
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                {pwData.topOperatorDistributionChart && (
                    <TreeMap
                        title={`Reward by Operator for ${decodeURI(networkName)}`}
                        series={pwData.topOperatorDistributionChart}
                    />
                )}
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                {pwData.operatorDistributionDetail && (
                    <RewardDistributionDetailTable
                        rowUri={null}
                        tableData={pwData.operatorDistributionDetail}
                        title={`Reward by Operator for ${decodeURI(networkName)}`}
                        rowUri={row=>`/validation/operator/${row.Id}/${encodeURI(row.ValidationGroup)}`}
                    />
                )}
            </Grid>
        </Grid>
    );
}