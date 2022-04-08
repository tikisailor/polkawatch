import * as React from 'react';
import { useState } from "react";
import {navigate} from "gatsby";
import {
  Box,
  Card,
  Table,
  Button,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  TableHead,
  Container,
  Typography,
  TableContainer,
  TablePagination, CardHeader
} from "@mui/material";

import Scrollbar from './Scrollbar';
import { plainToInstance } from "class-transformer";

import {fShortenNumber} from '../utils/formatNumber';
import { Link } from "gatsby";


function fieldAttributes(index,name,value){
  return {
    align: typeof(value) == 'number' ? 'right':'left' as ('right'|'left'),
    value: typeof(value) == 'number' ?  fShortenNumber(value):value,
    header: name
  }
}

export default function DetailTable({title="Table", tableData, RowClass, rowsPerPageOptions=[5, 10, 25], minTableWidth=880, rowUri}){

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (event, Id, row) => {
    if(rowUri) navigate(rowUri(row));
  }

  const firstRow=plainToInstance(RowClass,tableData[0], {
    excludeExtraneousValues: true,
  });

  return (
    <Card>
      <CardHeader title={title} sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: minTableWidth }}>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(firstRow).map((field,i) => {
                  const {align,header,value} = fieldAttributes(i,field,firstRow[field]);
                  if (value!==undefined) return (
                    <TableCell align={align}>
                        {header}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row=>{
                const dataRow = plainToInstance(RowClass,row, {
                  excludeExtraneousValues: true,
                });
                return (
                    <TableRow
                      key={row.Id}
                      onClick={(event) => handleClick(event, row.Id, row)}
                      hover>
                      {Object.keys(dataRow).map((field,i) => {
                        const {align,value} = fieldAttributes(i,field,dataRow[field]);
                        if (value!==undefined) return (
                          <TableCell align={align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        { rowsPerPageOptions[0] < tableData.length && <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, value) => setPage(value)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> }
      </Scrollbar>
    </Card>
  )
}