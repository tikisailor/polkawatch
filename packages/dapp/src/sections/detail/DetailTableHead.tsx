import * as React from 'react';

// material
import { TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';



export default function DetailTableHead({
                                         headLabel,
                                     }) {
    return (
        <TableHead>
            <TableRow>
                {headLabel.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.alignRight ? 'right' : 'left'}
                    >
                        <TableSortLabel
                            hideSortIcon
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
