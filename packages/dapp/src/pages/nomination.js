import * as React from 'react';
import {Container, Typography} from '@mui/material';
import {NominatorDetailView} from "../sections";

// components
import Page from '../components/Page';
import DashboardLayout from "../layouts/dashboard";
import usePolkadotExtension from "../hooks/usePolkadotExtension";

export default function DashboardNominator() {
    const extWallet = usePolkadotExtension();
    return (
        <DashboardLayout>
            <Page title="Nomination">
                <Container maxWidth="xl">
                    {
                        extWallet.address ?
                            (
                                <NominatorDetailView
                                    nominatorName={"SAMPLE-STASH"}
                                    nominatorId={extWallet.address}/>
                            ) :
                            (
                                <Typography>Select Wallet</Typography>
                            )
                    }
                </Container>
            </Page>
        </DashboardLayout>
    );
}