import * as React from 'react';
import { Grid, Container } from '@mui/material';

// components
import Page from '../components/Page';
import DashboardLayout from "../layouts/dashboard";
import GeoOverview from "../sections/GeoOverview";

export default function DashboardGeo() {
    return (
        <DashboardLayout>
            <Page title="Rewards by Region">
                <Container maxWidth="xl">
                    <GeoOverview />
                </Container>
            </Page>
        </DashboardLayout>
    );
}
