import * as React from 'react';

import { useEffect, useState } from "react";

import { Grid } from '@mui/material';


import AboutDataWidget from '../components/widgets/AboutDataWidget';

import clockCircleOutlined from '@iconify/icons-ant-design/clock-circle-outlined';
import globalOutlined from '@iconify/icons-ant-design/global-outlined';
import cloudServerOutlined from '@iconify/icons-ant-design/cloud-server-outlined';
import flagOutlined from '@iconify/icons-ant-design/flag-outlined';
import safetyCertificateOutlined from '@iconify/icons-ant-design/safety-certificate-outlined';
import userOutlined from '@iconify/icons-ant-design/user-outlined';
import dollarCircleOutlined from '@iconify/icons-ant-design/dollar-circle-outlined';

import {
    AboutData
} from '@ddp/client';
import usePolkawatchApi from "../hooks/usePolkawatchApi";

export default function AboutDataset() {

    const { lastUpdated,api } = usePolkawatchApi();

    const [aboutData, setAboutData] = useState({} as AboutData);

    useEffect(() => {
        api.ddpIpfsAboutDataset({
            lastEras:60,
            validationType: 'public'
        }).then(response => setAboutData(response.data));
        return () => {};
    },[lastUpdated]);

    return (
        <>
            <Grid item xs={12} sm={6} md={3}>
                <AboutDataWidget
                    title={"Recent Eras Analysed"}
                    total={aboutData.Eras}
                    icon={clockCircleOutlined}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AboutDataWidget
                    title={"Total DOT Rewards"}
                    total={aboutData.DotRewards}
                    icon={dollarCircleOutlined}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AboutDataWidget
                    title={"Last Processed Era"}
                    total={aboutData.LastestEra}
                    icon={clockCircleOutlined}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                <AboutDataWidget
                    title={"Global Regions of Operators"}
                    total={aboutData.Regions}
                    icon={globalOutlined}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AboutDataWidget
                    title={"Countries of Operators"}
                    total={aboutData.Countries}
                    icon={flagOutlined}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AboutDataWidget
                    title={"Computing Networks of Operators"}
                    total={aboutData.Networks}
                    icon={cloudServerOutlined}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                <AboutDataWidget
                    title={"Public Operators"}
                    total={aboutData.ValidatorGroups}
                    icon={safetyCertificateOutlined}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AboutDataWidget
                    title={"Public Validators"}
                    total={aboutData.Validators}
                    icon={safetyCertificateOutlined}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AboutDataWidget
                    title={"Nominators that Received Rewards"}
                    total={aboutData.Nominators}
                    icon={userOutlined}
                />
            </Grid>
        </>
    );
}