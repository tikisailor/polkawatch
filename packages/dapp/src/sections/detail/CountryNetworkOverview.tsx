import * as React from 'react';

import { useEffect, useState } from "react";

import { Grid } from '@mui/material';

import {
    NetworkDetail
} from '@ddp/client';
import usePolkawatchApi from "../../hooks/usePolkawatchApi";

import DetailTable from "./DetailTableMain";

export default function CountryNetworkOverview({networkId, countryId}) {

    const { lastUpdated, api } = usePolkawatchApi();

    const [pwData, setPwData] = useState({} as NetworkDetail);

    useEffect(() => {
        api.ddpIpfsCountryNetworkDetail({
            lastEras: 60,
            network: networkId,
            country: countryId,
        }).then(response => setPwData(response.data));
        return () => {
        };
    }, [lastUpdated]);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    {pwData.validatorDistributionDetail && (
                        <DetailTable redirect='' data={pwData.validatorDistributionDetail} title='Validator Distribution Detail'/>
                    )}
                </Grid>
            </Grid>
        </>
    );
}