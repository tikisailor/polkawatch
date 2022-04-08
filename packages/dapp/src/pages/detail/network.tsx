import * as React from 'react';
import DashboardLayout from "../../layouts/dashboard";
import Page from '../../components/Page';
import { Container } from '@mui/material';
import NetworkDetailView from "../../sections/detail/NetworkDetailView";


export default function CountryDetail({networkId, networkName}) {

    return (
        <DashboardLayout>
            <Page title={networkId}>
                <Container maxWidth="xl">
                    <NetworkDetailView networkId={networkId} networkName={networkName}/>
                </Container>
            </Page>
        </DashboardLayout>
    );
}