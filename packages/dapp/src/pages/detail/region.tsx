import * as React from 'react';
import DashboardLayout from "../../layouts/dashboard";
import Page from '../../components/Page';
import { Container } from '@mui/material';
import {RegionDetailView} from "../../sections";


export default function RegionDetailSection({regionId, regionLabel}) {

    return (
        <DashboardLayout>
            <Page title={regionId}>
                <Container maxWidth="xl">
                    <RegionDetailView regionId={regionId} regionName={regionLabel}/>
                </Container>
            </Page>
        </DashboardLayout>
    );
}