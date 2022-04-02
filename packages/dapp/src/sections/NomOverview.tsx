// import * as React from 'react';
//
// import { useEffect, useState } from "react";
//
// import { Grid } from '@mui/material';
//
// import {
//     OperatorOverview
// } from '@ddp/client';
//
// import usePolkawatchApi from "../hooks/usePolkawatchApi";
//
// import TreeMap from "./TreeMap";
// import DetailTable from "./detail/DetailTableMain";
//
//
//
// export default function NomOverview() {
//
//     const { lastUpdated, api } = usePolkawatchApi();
//
//     const [pwData, setPwData] = useState({} as OperatorOverview);
//
//     useEffect(() => {
//         api.ddpIpfsNominatorOverview({
//             lastEras: 60,
//             validationType: 'public',
//         }).then(response => setPwData(response.data));
//         return () => {
//         };
//     }, [lastUpdated]);
//
//     return (
//         <>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} md={12} lg={12}>
//                     {pwData.nominatorDistributionDetail && (
//                         <DetailTable data={pwData.nominatorDistributionDetail} title='Nominator Distribution Detail'/>
//                     )}
//                 </Grid>
//             </Grid>
//         </>
//     );
// }