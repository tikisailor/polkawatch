import * as React from 'react';
import { Container } from '@mui/material';
import ValOverview from "../sections/ValOverview";


// components
import Page from '../components/Page';
import DashboardLayout from "../layouts/dashboard";

export default function DashboardValidator() {
    return (
        <DashboardLayout>
            <Page title="Rewards by Validator">
                <Container maxWidth="xl">
                    <ValOverview />
                </Container>
            </Page>
        </DashboardLayout>
    );
}