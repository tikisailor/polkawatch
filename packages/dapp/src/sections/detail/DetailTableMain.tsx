import * as React from "react";
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// material
import {
    Box,
    Card,
    Table,
    Stack,
    TableRow,
    TableBody,
    TableCell,
    Typography,
    TableContainer,
    TablePagination
} from '@mui/material';
// components
// import DashboardLayout from "../../layouts/dashboard";
import Page from '../../components/Page';
import DetailTableHead from './DetailTableHead';
import {navigate} from 'gatsby';
import {useLocation} from "@reach/router";
// import { useLocation } from '@reach/router';


export default function DetailTable({data, title, redirect=null}) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const tableHeadLabels = Object.keys(data[0])

    const tableHead = tableHeadLabels.map((value) => {
        return { id: value, label: value.replace(/([A-Z])/g, ' $1').trim(), alignRight:false }
    });

    const location = useLocation();



    const handleClick = (event, Id, row) => {
        const path = location.pathname.split('/')
        const slice = path.slice(1, path.length -1);
        if (!redirect) return;
        if((slice[0] === 'geography') && (slice[1] === 'country')) {
            navigate(redirect+Id+'/'+path[path.length -1]);
            return;
        }
        navigate(redirect+Id);
    }

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
                                                    onClick={(event) => handleClick(event, row.Id, row)}
                                                    hover
                                                    key={row.Id}
                                                    tabIndex={-1}
                                                >
                                                    {tableHeadLabels.map((label) => {
                                                        return (
                                                            <TableCell style={{cursor:'pointer'}} align="left">{row[label]}</TableCell>
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
            </Page>
        </Box>
    );
}