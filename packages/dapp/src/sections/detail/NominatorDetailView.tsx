import * as React from 'react';

import { useEffect, useState } from "react";

import { Grid } from '@mui/material';

import {
    NominatorDetail
} from '@ddp/client';
import usePolkawatchApi from "../../hooks/usePolkawatchApi";

import TreeMap from "../TreeMap";
import {RewardDistributionDetailTable} from "../../components/RewardDistributionDetailTable";
import PieChart from "../PieChart";

export default function NominatorDetailView({nominatorId, nominatorName}) {

    const { lastUpdated, api } = usePolkawatchApi();

    const [pwData, setPwData] = useState({} as NominatorDetail);
    const [error,setError] = useState(undefined);

    useEffect(() => {
        api.ddpIpfsNominatorDetail({
            lastEras: 30,
            nominator: nominatorId,
        }).then(response => {
            setPwData(response.data);
            setError(undefined);
        }).catch(error => {
            setError(error);
        });
        return () => {
        };
    }, [lastUpdated, nominatorId]);

    if(error) return (
        <>
            <p>{`No Reward events located on ${nominatorName} in the last 30 eras`}</p>
            <p>{`Account address is ${nominatorId}`}</p>
        </>

)
    else return (
        <Grid container spacing={3} pb={3}>
            <Grid item xs={12} md={6} lg={4}>
                {pwData.topRegionalDistributionChart && (
                    <PieChart
                        title={`Reward by Region for ${decodeURI(nominatorName)}`}
                        labels={pwData.topRegionalDistributionChart.labels}
                        series={pwData.topRegionalDistributionChart.data}
                    />
                )}
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                {pwData.topCountryDistributionChart && (
                    <PieChart
                        title={`Reward by Country for ${decodeURI(nominatorName)}`}
                        labels={pwData.topCountryDistributionChart.labels}
                        series={pwData.topCountryDistributionChart.data}
                    />
                )}
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                {pwData.topNetworkDistributionChart && (
                    <PieChart
                        title={`Reward by Network for ${decodeURI(nominatorName)}`}
                        labels={pwData.topNetworkDistributionChart.labels}
                        series={pwData.topNetworkDistributionChart.data}
                    />
                )}
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                {pwData.nodeDistributionDetail && (
                    <RewardDistributionDetailTable
                        rowUri={null}
                        tableData={pwData.nodeDistributionDetail}
                        title={`Reward by Validator for ${decodeURI(nominatorName)}`}
                    />
                )}
            </Grid>
        </Grid>
    );
}