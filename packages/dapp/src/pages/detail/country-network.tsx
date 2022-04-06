import * as React from 'react';
import DashboardLayout from "../../layouts/dashboard";
import Page from '../../components/Page';
import { Container } from '@mui/material';
import CountryNetworkOverview from "../../sections/detail/CountryNetworkOverview";


export default function CountryNetworkDetail({networkId, countryId}) {

    return (
        <DashboardLayout>
            <Page title={networkId}>
                <Container maxWidth="xl">
                    <CountryNetworkOverview networkId={networkId} countryId={countryId}/>
                </Container>
            </Page>
        </DashboardLayout>
    );
}