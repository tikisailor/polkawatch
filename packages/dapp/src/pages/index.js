import * as React from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import DashboardLayout from "../layouts/dashboard";
import AboutDataset from "../sections/AboutData";

export default function DashboardHome() {
    return (
        <DashboardLayout>
            <Page title="Polkawatch">
                <Container maxWidth="xl">
                    <Box sx={{ pb: 5 }}>
                        <Typography variant="h3">Welcome to Polkawatch.</Typography>
                        <Typography variant="h5">Learn about Polkadot's Validation Network: Lets decentralize!</Typography>
                    </Box>
                    <Grid container spacing={3}>
                        <AboutDataset/>
                    </Grid>
                </Container>
            </Page>
        </DashboardLayout>
    );
}
