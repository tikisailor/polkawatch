import * as React from 'react';

import { useEffect, useState } from "react";

import { Grid } from '@mui/material';

import {
    CountryDetail,
} from '@ddp/client';
import usePolkawatchApi from "../../hooks/usePolkawatchApi";

import TreeMap from "../TreeMap";
import {RewardDistributionDetailTable} from "../../components/RewardDistributionDetailTable";

export default function CountryDetailView({countryId, countryName}) {

    const { lastUpdated, api } = usePolkawatchApi();

    const [pwData, setPwData] = useState({} as CountryDetail);

    useEffect(() => {
        api.ddpIpfsCountryDetail({
            lastEras: 60,
            country: countryId,
            validationType: 'public',
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
                            title={`Reward distribution by network in ${decodeURI(countryName)}`}
                            series={pwData.topNetworkDistributionChart}
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    {pwData.topOperatorDistributionChart && (
                        <TreeMap
                            title={`Reward distribution by operator in ${decodeURI(countryName)}`}
                            series={pwData.topOperatorDistributionChart}
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    {pwData.operatorDistributionDetail && (
                        <RewardDistributionDetailTable
                            rowUri={row=>`/validation/operator/${row.Id}/${encodeURI(row.ValidationGroup)}`}
                            tableData={pwData.operatorDistributionDetail}
                            title={`Reward distribution by operator in ${decodeURI(countryName)}`}
                        />
                    )}
                </Grid>
            </Grid>
        </>
    );
}