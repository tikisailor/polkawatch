import * as React from 'react';

import { useEffect, useState } from "react";

import { Grid } from '@mui/material';

import {
    OperatorDetail
} from '@ddp/client';
import usePolkawatchApi from "../../hooks/usePolkawatchApi";

import TreeMap from "../TreeMap";
import {RewardDistributionDetailTable} from "../../components/RewardDistributionDetailTable";
import PieChart from "../PieChart";

export default function OperatorDetailView({operatorId, operatorName}) {

    const { lastUpdated, api } = usePolkawatchApi();

    const [pwData, setPwData] = useState({} as OperatorDetail);

    useEffect(() => {
        api.ddpIpfsOperatorDetail({
            lastEras: 60,
            validationType: 'public',
            operator: operatorId,
        }).then(response => setPwData(response.data));
        return () => {
        };
    }, [lastUpdated]);

    return (
        <>
            <Grid container spacing={3} pb={3}>
            <Grid item xs={12} md={6} lg={4}>
                {pwData.topCountryDistributionChart && (
                    <PieChart
                        title={`Reward distribution by country for ${decodeURI(operatorName)}`}
                        labels={pwData.topCountryDistributionChart.labels}
                        series={pwData.topCountryDistributionChart.data}
                    />
                )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                {pwData.topNetworkDistributionChart && (
                    <PieChart
                        title={`Reward distribution by network for ${decodeURI(operatorName)}`}
                        labels={pwData.topNetworkDistributionChart.labels}
                        series={pwData.topNetworkDistributionChart.data}
                    />
                )}
            </Grid>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                {pwData.nodeDistributionDetail && (
                    <RewardDistributionDetailTable
                        rowUri={null}
                        tableData={pwData.nodeDistributionDetail}
                        title={`Reward distribution detail by operator in ${decodeURI(operatorName)}`}
                    />
                )}
            </Grid>
        </>
    );
}