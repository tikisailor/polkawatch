import * as React from 'react';

import { useEffect, useState } from "react";

import { Grid } from '@mui/material';

import {
    OperatorOverview
} from '@ddp/client';

import usePolkawatchApi from "../hooks/usePolkawatchApi";

import TreeMap from "./TreeMap";
import {RewardDistributionDetailTable} from "../components/RewardDistributionDetailTable";



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
                            title='Operator Distribution Overview'
                            series={pwData.topOperatorDistributionChart}
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    {pwData.operatorDistributionDetail && (
                        <RewardDistributionDetailTable
                            rowUri={row=>`/validation/operator/${row.Id}/${encodeURI(row.ValidationGroup)}`}
                            tableData={pwData.operatorDistributionDetail}
                            title='Operator Distribution Detail'
                        />
                    )}
                </Grid>
            </Grid>
        </>
    );
}