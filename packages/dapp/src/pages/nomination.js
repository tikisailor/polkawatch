import * as React from 'react';
import { Container } from '@mui/material';
import NomOverview from "../sections/NomOverview";

// components
import Page from '../components/Page';
import DashboardLayout from "../layouts/dashboard";

export default function DashboardNominator() {
    return (
        <DashboardLayout>
            <Page title="Dashboard | Minimal-UI">
                <Container maxWidth="xl">
                    <NomOverview />
                </Container>
            </Page>
        </DashboardLayout>
    );
}