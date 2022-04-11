import * as React from 'react';
import DashboardLayout from "../../layouts/dashboard";
import Page from '../../components/Page';
import { Container } from '@mui/material';
import {CountryDetailView} from "../../sections";


export default function CountryDetail({countryId, countryLabel}) {

    return (
        <DashboardLayout>
            <Page title={`Country Detail: ${countryLabel}`}>
                <Container maxWidth="xl">
                    <CountryDetailView countryId={countryId} countryName={countryLabel}/>
                </Container>
            </Page>
        </DashboardLayout>
    );
}