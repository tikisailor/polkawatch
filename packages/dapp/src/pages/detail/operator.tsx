import * as React from 'react';
import DashboardLayout from "../../layouts/dashboard";
import Page from '../../components/Page';
import { Container } from '@mui/material';
import OperatorDetailView from "../../sections/detail/OperatorDetailView";


export default function OperatorDetailPage({operatorId, operatorName}) {

    return (
        <DashboardLayout>
            <Page title={operatorId}>
                <Container maxWidth="xl">
                    <OperatorDetailView operatorId={operatorId} operatorName={operatorName}/>
                </Container>
            </Page>
        </DashboardLayout>
    );
}