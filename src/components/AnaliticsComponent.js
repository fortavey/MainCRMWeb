import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import appsMobx from '../mobx/appsMobx';
import { observer } from 'mobx-react-lite';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function AnaliticsComponent() {

    function getPositions(analiticsArray, code){
        var newArr = []
        if(analiticsArray?.length){
            newArr = analiticsArray.map(str => {
                return str.split("*")
            })
        }else {
            return ""
        }
        newArr = newArr.filter(arr => arr.includes(code.toLowerCase()))
        newArr = newArr.sort((a, b) => a[0] - b[0]).reverse();

        return newArr.map(arr => arr[2]).join(", ")
    }

  return (
    <>
    <h3>Аналитики по позициям</h3>

    {
    [1,2,3,4,5,6,7,8,9,10].map(cluster => (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell width={200}>Кластер №{cluster}</StyledTableCell>
                <StyledTableCell align="left">ГЕО</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>

                { appsMobx.brendsList.filter(brend => brend.limitCounter == cluster && brend.isFavorite).map(brend => (
                <StyledTableRow key={cluster}>
                    <StyledTableCell component="th" scope="row">
                        <div>{brend.name}</div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                        {
                            brend.countries?.length && brend.countries.map(code => (
                                <div>
                                    {code} - {}
                                    {getPositions(brend.analiticsArray, code)}
                                </div>
                            ))
                        }
                    </StyledTableCell>
                </StyledTableRow>)
                )}

            </TableBody>
        </Table>
        </TableContainer>
    ))}
  </>
  );
}

export default observer(AnaliticsComponent)