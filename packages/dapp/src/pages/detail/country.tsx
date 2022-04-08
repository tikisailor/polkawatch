import * as React from 'react';
import DashboardLayout from "../../layouts/dashboard";
import Page from '../../components/Page';
import { Container } from '@mui/material';
import CountryDetailView from "../../sections/detail/CountryDetailView";


export default function CountryDetail({countryId, countryName}) {

    return (
        <DashboardLayout>
            <Page title={countryId}>
                <Container maxWidth="xl">
                    <CountryDetailView countryId={countryId} countryName={countryName}/>
                </Container>
            </Page>
        </DashboardLayout>
    );
}