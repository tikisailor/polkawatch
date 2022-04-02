import * as React from 'react';
import { Grid, Container } from '@mui/material';
import ValOverview from "../../sections/ValOverview";


// components
import Page from '../../components/Page';
import DashboardLayout from "../../layouts/dashboard";

export default function DashboardValidator() {
    return (
        <DashboardLayout>
            <Page title="Dashboard | Minimal-UI">
                <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        <ValOverview />
                    </Grid>
                </Container>
            </Page>
        </DashboardLayout>
    );
}