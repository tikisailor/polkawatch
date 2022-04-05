import * as React from 'react';

import { useEffect, useState } from "react";

import {Box, Grid} from '@mui/material';

// import {
//     OperatorOverview
// } from '@ddp/client';
//
// import usePolkawatchApi from "../hooks/usePolkawatchApi";
//
// import TreeMap from "./TreeMap";
// import DetailTable from "./detail/DetailTableMain";
import WalletConnect from "./detail/WalletConnect";



export default function NomOverview() {

    // const { lastUpdated, api } = usePolkawatchApi();
    //
    // const [pwData, setPwData] = useState({} as OperatorOverview);

    const [w3account, setW3account] = useState([]);

    const handleSetW3 = (account) => {
        setW3account(account);
        console.log('got account', account);
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Box sx={{ flexGrow: 1 }} />
                    <WalletConnect handler={handleSetW3}/>
                </Grid>
                {/*<Grid item xs={12} md={12} lg={12}>*/}
                {/*    {pwData.nominatorDistributionDetail && (*/}
                {/*        <DetailTable data={pwData.nominatorDistributionDetail} title='Nominator Distribution Detail'/>*/}
                {/*    )}*/}
                {/*</Grid>*/}
            </Grid>
        </>
    );
}