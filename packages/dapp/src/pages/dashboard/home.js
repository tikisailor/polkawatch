import * as React from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
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
                    </Grid>
                </Container>
            </Page>
        </DashboardLayout>
    );
}
