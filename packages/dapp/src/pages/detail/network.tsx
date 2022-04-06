import * as React from 'react';
import DashboardLayout from "../../layouts/dashboard";
import Page from '../../components/Page';
import { Container } from '@mui/material';
import NetworkOverview from "../../sections/detail/NetworkOverview";


export default function CountryDetail({networkId}) {

    return (
        <DashboardLayout>
            <Page title={networkId}>
                <Container maxWidth="xl">
                    <NetworkOverview networkId={networkId}/>
                </Container>
            </Page>
        </DashboardLayout>
    );
}