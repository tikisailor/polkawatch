import * as React from 'react';
import { Container } from '@mui/material';
import {NominatorDetailView} from "../sections";

// components
import Page from '../components/Page';
import DashboardLayout from "../layouts/dashboard";

export default function DashboardNominator() {
    return (
        <DashboardLayout>
            <Page title="Nomination">
                <Container maxWidth="xl">
                    <NominatorDetailView
                        nominatorName={"SAMPLE-STASH"}
                        nominatorId={"14zV6AH1pQRq35ESHEQuz3rxcaXDRh2rrC3nUJEfoMGNLRB7"}/>
                </Container>
            </Page>
        </DashboardLayout>
    );
}