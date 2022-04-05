import * as React from 'react';
import { Grid, Container } from '@mui/material';
import NetOverview from "../../sections/NetOverview";


// components
import Page from '../../components/Page';
import DashboardLayout from "../../layouts/dashboard";

export default function DashboardNetwork() {
    return (
        <DashboardLayout>
            <Page title="Dashboard | Minimal-UI">
                <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        <NetOverview />
                    </Grid>
                </Container>
            </Page>
        </DashboardLayout>
    );
}