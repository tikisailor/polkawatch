import * as React from 'react';
import DashboardLayout from "../../layouts/dashboard";
import Page from '../../components/Page';
import { Container } from '@mui/material';
import {NetworkDetailView} from "../../sections";


export default function PageNetworkDetail({networkId,networkLabel}) {

    return (
        <DashboardLayout>
            <Page title={`Network Detail: ${networkLabel}`}>
                <Container maxWidth="xl">
                    <NetworkDetailView networkId={networkId} networkName={networkLabel}/>
                </Container>
            </Page>
        </DashboardLayout>
    );
}