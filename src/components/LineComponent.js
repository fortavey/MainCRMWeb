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
    const [visited, setVisited] = useState(false)

    const openDownloadWindow = () => {
        window.open(row.driveLink, '_blank');
        setVisited(true)
    }

    return (
        <StyledTableRow key={row.firstAppName}>
            <StyledTableCell component="th" scope="row">
            {row.firstAppName}
            </StyledTableCell>
            <StyledTableCell align="left">{row.createAccount}</StyledTableCell>
            <StyledTableCell align="left">{row.updateType}</StyledTableCell>
            <StyledTableCell align="left">
                <Button variant="outlined" onClick={openDownloadWindow} color={visited ? "inherit" : "primary"}>Скачать исходники</Button>
            </StyledTableCell>
            <StyledTableCell align="left">{row.message}</StyledTableCell>
            <StyledTableCell align="left">
                <Button variant="contained" onClick={() => appsMobx.changeFM(row.id)}>Готово</Button>
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default observer(LineComponent)