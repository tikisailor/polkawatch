import * as React from 'react';
import DashboardLayout from "../../layouts/dashboard";
import Page from '../../components/Page';
import { Container } from '@mui/material';
import RegionOverview from "../../sections/detail/RegionOverview";


export default function RegionDetail({regionId}) {

    return (
        <DashboardLayout>
            <Page title={regionId}>
                <Container maxWidth="xl">
                    <RegionOverview regionId={regionId}/>
                </Container>
            </Page>
        </DashboardLayout>
    );
}