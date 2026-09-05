import React, { useState } from "react";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { observer } from "mobx-react-lite";
import TableRow from '@mui/material/TableRow';
import appsMobx from '../mobx/appsMobx';
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

  const LineComponent = ({row}) => {
    const openDownloadWindow = () => {
        window.open(row.driveLink, '_blank');
    }

    const addToWork = () => {
      const arr = appsMobx.listFM.filter(app => app.user == appsMobx.currentUser.id && !app.isDone)
      if(arr.length > 10) {
        appsMobx.snackBar.open = true
        appsMobx.snackBar.text = "Нельзя резервировать больше 10 приложений"
        appsMobx.snackBar.status = "error"
      }
      else appsMobx.changeFMWork(row.id)
    }

    const cancelWork = () => {
      appsMobx.changeFMWork(row.id, true)
    }

    const renderWorkButton = () => {
      if(appsMobx.currentUser){
        if(appsMobx.currentUser.id == row.user) {
          return <Button variant="outlined" onClick={cancelWork}>Отмена</Button>
        }else{
          return <Button variant="outlined" onClick={addToWork}>Забрать в работу</Button>
        }
      }else {
        return <></>
      }
    }

    return (
        <StyledTableRow key={row.firstAppName}>
            <StyledTableCell>
              {renderWorkButton(row)}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {row.firstAppName}
            </StyledTableCell>
            <StyledTableCell align="left">{row.createAccount}</StyledTableCell>
            <StyledTableCell align="left">
              {appsMobx.currentUser ? <Button variant="outlined" 
                                              onClick={openDownloadWindow}>
                                                Скачать исходники
                                      </Button> : <></>
              }
            </StyledTableCell>
            <StyledTableCell align="left">{row.message}</StyledTableCell>
            <StyledTableCell align="left">
                {appsMobx.currentUser ? <>
                    <Button variant="contained" onClick={() => {
                      appsMobx.changeFM(row.id)
                      appsMobx.changeCounter(row.id)
                      }}>
                      Готово
                    </Button>
                  .
                    <Button variant="outlined" onClick={() => appsMobx.changeFMFail(row.id)}>
                      Не создает
                    </Button>
                  </>
                    : 
                    <></>
                  }
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default observer(LineComponent)