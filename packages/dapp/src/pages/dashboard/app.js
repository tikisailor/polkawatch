import * as React from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
import {
    AppTasks,
    AppNewUsers,
    AppBugReports,
    AppItemOrders,
    AppNewsUpdate,
    AppWeeklySales,
    AppOrderTimeline,
    AppCurrentVisits,
    AppWebsiteVisits,
    AppTrafficBySite,
    AppCurrentSubject,
    AppConversionRates
} from '../../components/_dashboard/app';
import DashboardLayout from "../../layouts/dashboard";
import AboutDataset from "../../sections/AboutData";

export default function DashboardApp() {
    return (
        <DashboardLayout>
            <Page title="Dashboard | Minimal-UI">
                <Container maxWidth="xl">
                    <Box sx={{ pb: 5 }}>
                        <Typography variant="h4">Hi, Welcome back</Typography>
                    </Box>
                    <Grid container spacing={3}>
                        <AboutDataset/>

                        <Grid item xs={12} md={6} lg={8}>
                            <AppWebsiteVisits />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <AppCurrentVisits />
                        </Grid>

                        <Grid item xs={12} md={6} lg={8}>
                            <AppConversionRates />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <AppCurrentSubject />
                        </Grid>

                        <Grid item xs={12} md={6} lg={8}>
                            <AppNewsUpdate />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <AppOrderTimeline />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <AppTrafficBySite />
                        </Grid>

                        <Grid item xs={12} md={6} lg={8}>
                            <AppTasks />
                        </Grid>
                    </Grid>
                </Container>
            </Page>
        </DashboardLayout>
    );
}
