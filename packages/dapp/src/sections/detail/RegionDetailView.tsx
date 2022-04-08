import * as React from 'react';

import { useEffect, useState } from "react";

import { Grid } from '@mui/material';

import {
    RegionDetail
} from '@ddp/client';
import usePolkawatchApi from "../../hooks/usePolkawatchApi";

import TreeMap from "../TreeMap";
import {RewardDistributionDetailTable} from "../../components/RewardDistributionDetailTable";

export default function RegionDetailView({regionId, regionName}) {

    const { lastUpdated, api } = usePolkawatchApi();

    const [pwData, setPwData] = useState({} as RegionDetail);

    useEffect(() => {
        api.ddpIpfsRegionDetail({
            lastEras: 60,
            region: regionId,
            validationType: 'public',
        }).then(response => setPwData(response.data));
        return () => {
        };
    }, [lastUpdated]);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    {pwData.topCountryDistributionChart && (
                        <TreeMap
                            title={`Reward distribution in ${decodeURI(regionName)}`}
                            series={pwData.topCountryDistributionChart}
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    {pwData.countryDistributionDetail && (
                        <RewardDistributionDetailTable
                            rowUri={row=>`/geography/country/${row.Id}/${encodeURI(row.Country)}`}
                            tableData={pwData.countryDistributionDetail}
                            title={`Reward distribution in ${decodeURI(regionName)}`}
                        />
                    )}
                </Grid>
            </Grid>
        </>
    );
}