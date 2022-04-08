import * as React from 'react';

import { useEffect, useState } from "react";

import { Grid } from '@mui/material';

import {
    OperatorDetail
} from '@ddp/client';
import usePolkawatchApi from "../../hooks/usePolkawatchApi";

import TreeMap from "../TreeMap";
import {RewardDistributionDetailTable} from "../../components/RewardDistributionDetailTable";

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
            <Grid item xs={12} md={12} lg={12}>
                {pwData.topCountryDistributionChart && (
                    <TreeMap
                        title={`Reward distribution by country for ${decodeURI(operatorName)}`}
                        series={pwData.topCountryDistributionChart}
                    />
                )}
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                {pwData.topNetworkDistributionChart && (
                    <TreeMap
                        title={`Reward distribution by network for ${decodeURI(operatorName)}`}
                        series={pwData.topNetworkDistributionChart}
                    />
                )}
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