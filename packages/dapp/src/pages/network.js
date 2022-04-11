import * as React from 'react';
import { Container } from '@mui/material';
import NetOverview from "../sections/NetOverview";

// components
import Page from '../components/Page';
import DashboardLayout from "../layouts/dashboard";

export default function DashboardNetwork() {
    return (
        <DashboardLayout>
            <Page title="Rewards by Network">
                <Container maxWidth="xl">
                    <NetOverview />
                </Container>
            </Page>
        </DashboardLayout>
    );
}