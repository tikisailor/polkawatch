import * as React from 'react';
import DashboardLayout from "../../layouts/dashboard";
import Page from '../../components/Page';
import { Container } from '@mui/material';
import CountryOverview from "../../sections/detail/CountryOverview";


export default function CountryDetail({countryId, networkId}) {

    return (
        <DashboardLayout>
            <Page title={countryId}>
                <Container maxWidth="xl">
                    <CountryOverview countryId={countryId} networkId={networkId}/>
                </Container>
            </Page>
        </DashboardLayout>
    );
}