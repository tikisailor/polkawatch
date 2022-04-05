import * as React from 'react';
import { Grid, Container } from '@mui/material';
import NomOverview from "../../sections/NomOverview";


// components
import Page from '../../components/Page';
import DashboardLayout from "../../layouts/dashboard";

export default function DashboardNominator() {
    return (
        <DashboardLayout>
            <Page title="Dashboard | Minimal-UI">
                <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        <NomOverview />
                    </Grid>
                </Container>
            </Page>
        </DashboardLayout>
    );
}