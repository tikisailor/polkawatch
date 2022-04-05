import * as React from "react";
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// material
import {
    Box,
    Card,
    Table,
    Stack,
    Avatar,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination
} from '@mui/material';
// components
import DashboardLayout from "../../layouts/dashboard";
import Page from '../../components/Page';
import DetailTableHead from './DetailTableHead';

// {
//     "DotRewards": 4701.0045424333,
//     "Regions": 1,
//     "Countries": 1,
//     "Networks": 1,
//     "Validators": 6,
//     "Nominators": 1200,
//     "Id": "Jaco",
//     "ValidationGroup": "Jaco",
//     "DotMedianNomination": 329.573372614025
// },


export default function DetailTable({data, title}) {

    const [page, setPage] = useState(0);
    // const [selected, setSelected] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const tableHeadLabels = Object.keys(data[0])

    const tableHead = tableHeadLabels.map((value) => {
        return { id: value, label: value.replace(/([A-Z])/g, ' $1').trim(), alignRight:false }
    });
    // const handleClick = (event, name) => {
    //     const selectedIndex = selected.indexOf(name);
    //     let newSelected = [];
    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, name);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1)
    //         );
    //     }
    //     setSelected(newSelected);
    // };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    return (
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <Page title="User | Minimal-UI">
                {/*<Container>*/}
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            {title}
                        </Typography>

                    </Stack>
                    <Card>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <DetailTableHead
                                    headLabel={tableHead}
                                />
                                <TableBody>
                                    {data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    key={row.Id}
                                                    tabIndex={-1}
                                                >
                                                    {tableHeadLabels.map((label) => {
                                                        return (
                                                            <TableCell align="left">{row[label]}</TableCell>
                                                        );
                                                    })}

                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card>
                {/*</Container>*/}
            </Page>
        </Box>
    );
}