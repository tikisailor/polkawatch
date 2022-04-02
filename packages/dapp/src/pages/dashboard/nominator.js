import * as React from "react";
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'gatsby';
// material
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
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
import Label from '../../components/Label';
// import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserMoreMenu } from '../../components/_dashboard/user';
//
import USERLIST from '../../_mocks_/user';
import DetailTableHead from '../../sections/detail/DetailTableHead';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Nominator name', alignRight: false },
    { id: 'group', label: 'Nominator group', alignRight: false },
    { id: 'region', label: 'Region', alignRight: false },
];

// ----------------------------------------------------------------------


export default function DashboardNominator() {
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

    return (
        <DashboardLayout>
            <Page title="User | Minimal-UI">
                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Nominators
                        </Typography>

                    </Stack>
                    <Card>
                            <TableContainer sx={{ minWidth: 800 }}>
                                <Table>
                                    <DetailTableHead
                                        headLabel={TABLE_HEAD}
                                    />
                                    <TableBody>
                                        {USERLIST
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const { id, name, status, company, avatarUrl } = row;
                                            const isItemSelected = selected.indexOf(name) !== -1;

                                            return (
                                                <TableRow
                                                    hover
                                                    key={id}
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                    selected={isItemSelected}
                                                    aria-checked={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            onChange={(event) => handleClick(event, name)}
                                                        />
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" padding="none">
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            <Avatar alt={name} src={avatarUrl} />
                                                            <Typography variant="subtitle2" noWrap>
                                                                {name}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell align="left">{company}</TableCell>
                                                    <TableCell align="left">
                                                        <Label
                                                            variant="ghost"
                                                            color={(status === 'banned' && 'error') || 'success'}
                                                        >
                                                            {sentenceCase(status)}
                                                        </Label>
                                                    </TableCell>

                                                    <TableCell align="right">
                                                        <UserMoreMenu />
                                                    </TableCell>
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
                            count={USERLIST.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card>
                </Container>
            </Page>
        </DashboardLayout>
    );
}
