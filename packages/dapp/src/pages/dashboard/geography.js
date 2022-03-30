import * as React from 'react';
import { Grid, Container } from '@mui/material';

// components
import Page from '../../components/Page';
import GeoOverview from '../../sections/GeoOverview';
import DashboardLayout from "../../layouts/dashboard";

export default function DashboardApp() {
    return (
        <DashboardLayout>
            <Page title="Dashboard | Minimal-UI">
                <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>
                            <GeoOverview />
                        </Grid>
                    </Grid>
                </Container>
            </Page>
        </DashboardLayout>
    );
}
