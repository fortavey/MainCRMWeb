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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function MainComponent({fmList}) {
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Название приложения</StyledTableCell>
            <StyledTableCell align="left">Аккаунт</StyledTableCell>
            <StyledTableCell align="left">Тип обновления</StyledTableCell>
            <StyledTableCell align="left">Исходники</StyledTableCell>
            <StyledTableCell align="left">Комментарий</StyledTableCell>
            <StyledTableCell align="left">Выполнение</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appsMobx.list.filter(el => !el.isDone).map((row) => (
            <StyledTableRow key={row.firstAppName}>
              <StyledTableCell component="th" scope="row">
                {row.firstAppName}
              </StyledTableCell>
              <StyledTableCell align="left">{row.createAccount}</StyledTableCell>
              <StyledTableCell align="left">{row.updateType}</StyledTableCell>
              <StyledTableCell align="left"><a href={row.driveLink} target='_blank'>Скачать</a></StyledTableCell>
              <StyledTableCell align="left">{row.message}</StyledTableCell>
              <StyledTableCell align="left"><button onClick={() => appsMobx.change(row.id)}>Готово</button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {!appsMobx.list.length && <Box sx={{ display: 'flex', width: '100%', height: 300, alignItems:'center', justifyContent:'center' }}>
      <CircularProgress />
    </Box>}
  </>
  );
}

export default observer(MainComponent)