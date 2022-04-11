import * as React from 'react';
import DashboardLayout from "../../layouts/dashboard";
import Page from '../../components/Page';
import { Container } from '@mui/material';
import {OperatorDetailView} from "../../sections";


export default function OperatorDetailPage({operatorId,operatorLabel}) {

    return (
        <DashboardLayout>
            <Page title={`Operator Detail: ${operatorLabel}`}>
                <Container maxWidth="xl">
                    <OperatorDetailView operatorId={operatorId} operatorName={operatorLabel}/>
                </Container>
            </Page>
        </DashboardLayout>
    );
}