import * as React from 'react';
import {Container, Typography} from '@mui/material';
import {NominatorDetailView} from "../sections";

// components
import Page from '../components/Page';
import DashboardLayout from "../layouts/dashboard";
import {usePolkadotExtensionContext} from "../contexts/PolkadotExtensionContext";
export default function DashboardNominator() {

    const {selectedAccount} = usePolkadotExtensionContext();

    return (
        <DashboardLayout>
            <Page title="Nomination">
                <Container maxWidth="xl">
                    {
                        selectedAccount ?
                            (
                                <NominatorDetailView
                                    nominatorName={selectedAccount.meta.name}
                                    nominatorId={selectedAccount.address}/>
                            ) :
                            (
                                <Typography>Connect Your wallet</Typography>
                            )
                    }
                </Container>
            </Page>
        </DashboardLayout>
    );
}