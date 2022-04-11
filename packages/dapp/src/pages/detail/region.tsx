import * as React from 'react';
import DashboardLayout from "../../layouts/dashboard";
import Page from '../../components/Page';
import { Container } from '@mui/material';
import RegionDetailView from "../../sections/detail/RegionDetailView";


export default function RegionDetailPage({regionId, regionName}) {

    return (
        <DashboardLayout>
            <Page title={regionId}>
                <Container maxWidth="xl">
                    <RegionDetailView regionId={regionId} regionName={regionName}/>
                </Container>
            </Page>
        </DashboardLayout>
    );
}