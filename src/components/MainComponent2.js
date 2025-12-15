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
import LineComponent from './LineComponent';
import Button from '@mui/material/Button';

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

function MainComponent2() {

  return (
    <>

    <h3>Запуск приложения</h3>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Название приложения</StyledTableCell>
            <StyledTableCell align="left">Аккаунт Firebase</StyledTableCell>
            <StyledTableCell align="left">Аккаунт Google</StyledTableCell>
            <StyledTableCell align="left">Ссылки</StyledTableCell>
            <StyledTableCell align="left">Выполнение</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appsMobx.listTO.filter(el => !el.isDone).map((row) => (
              <StyledTableRow key={row.firstAppName}>
                <StyledTableCell align="left">
                  <div><strong>{row.firstAppName}</strong></div>
                  <div>com.{row.firstAppName.toLowerCase()}</div>
                </StyledTableCell>
                <StyledTableCell align="left">{row.firebaseAccount}</StyledTableCell>
                <StyledTableCell align="left">{row.locationAccount}</StyledTableCell>
                <StyledTableCell align="left">
                  <div>aso: {row.trackerLink}</div>
                  <div>link: {row.trackerLink}</div>
                  <div>uac: {row.trackerLink}</div>
                </StyledTableCell>
                <StyledTableCell align="left"><Button variant="contained" onClick={() => appsMobx.changeTO(row.id)}>Готово</Button></StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>

<h3>Первая модерация A.TRUST</h3>
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
          {appsMobx.listFM.filter(el => !el.isDone).filter(app => {
            const regex = new RegExp("A.TRUST*");
            if(regex.test(app.createAccount)) {
              return true
            }
            return false
          }).map((row) => (
            <LineComponent row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <h3>Первая модерация S.FARM</h3>
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
          {appsMobx.listFM.filter(el => !el.isDone).filter(app => {
            const regex = new RegExp("S.FARM*");
            if(regex.test(app.createAccount)) {
              return true
            }
            return false
          }).map((row) => (
            <LineComponent row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {!appsMobx.listFM.length && !appsMobx.listRN.length && <Box sx={{ display: 'flex', width: '100%', height: 300, alignItems:'center', justifyContent:'center' }}>
      <CircularProgress />
    </Box>}
  </>
  );
}

export default observer(MainComponent2)