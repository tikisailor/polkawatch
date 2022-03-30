import * as React from 'react';
import { Grid, Container } from '@mui/material';

// components
import Page from '../../components/Page';
import {
    AppLqsPieExample,
    AppEvolution
} from '../../components/_dashboard/app';
import DashboardLayout from "../../layouts/dashboard";

export default function DashboardApp() {
    return (
        <DashboardLayout>
            <Page title="Dashboard | Minimal-UI">
                <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>
                            <AppLqsPieExample />
                        </Grid>

                        <Grid item xs={12} md={6} lg={8}>
                            <AppEvolution />
                        </Grid>
                    </Grid>
                </Container>
            </Page>
        </DashboardLayout>
    );
}