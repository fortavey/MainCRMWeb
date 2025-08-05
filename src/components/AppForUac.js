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

function getColor(status){
    if (status == "Одобрено") return "green"
    if (status == "Модерация") return "yellow"
    if (status == "Отклон") return "red"
    if (status == "Ожидание публикации") return "#9EC2EA"
    return ""
}

function getPlayStoreLink(appName){
    let name = appName.split(" ").join("").toLowerCase()
    return `https://play.google.com/store/apps/details?id=com.${name}`
}

function AppForUac() {

  return (
    <>
    <h3>Список приложений</h3>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Бренд</StyledTableCell>
            <StyledTableCell align="left">Тип обновления</StyledTableCell>
            <StyledTableCell align="left">Статус обновления</StyledTableCell>
            <StyledTableCell align="left">Ссылка</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appsMobx.appList
          .filter(app => !app.isUAC)
          .filter(app => {
            if(app.updateStatus == 'Добавлено Webview' || app.updateStatus == 'Готово') return true
          })
          .filter(app => {
            if(app.moderationStatus == 'Ожидание публикации' || app.moderationStatus == 'Одобрено') return true
          })
          .map((row) => (
            <StyledTableRow key={row.firstAppName}>
              <StyledTableCell component="th" scope="row">
                <strong>{row.newAppName}</strong>
              </StyledTableCell>
              <StyledTableCell align="left" style={{backgroundColor: getColor(row.moderationStatus)}}>
                {row.updateStatus}
                </StyledTableCell>
              <StyledTableCell align="left" style={{backgroundColor: getColor(row.moderationStatus)}}>
                {row.moderationStatus}
              </StyledTableCell>
              <StyledTableCell align="left">
                <a href={getPlayStoreLink(row.firstAppName)} target='_blank'>Открыть в GooglePlay</a>
              </StyledTableCell>
            </StyledTableRow>
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

export default observer(AppForUac)