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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import DialogComponent from './DialogComponent';
import AddBrendComponent from './AddBrendComponent';
import { Padding } from '@mui/icons-material';


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

function ClustersComponent() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [currentBrend, setCurrentBrend] = React.useState(null)
    const [open, setOpen] = React.useState(false);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  function clickOnBrend(brend){
    setCurrentBrend(brend)
    setOpen(true)
  }

  return (
    <>
    <h3>Кластеры</h3>
    <div style={styles.clustersContainer}>
        {
        [1,2,3,4,5,6,7,8,9,10].map(cluster => (
            <div style={styles.clusterItem}>
                <div style={styles.clusterHead}>
                    <span>Кластер №{cluster}</span>
                    <AddBrendComponent cluster={cluster} />
                </div>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    { appsMobx.brendsList.filter(brend => brend.limitCounter == cluster && brend.isFavorite && !brend.isPaused).map((brend, idx) => (
                        <ListItemButton
                            selected={selectedIndex === idx}
                            onClick={() => clickOnBrend(brend)} key={brend.name}>
                            <ListItemText primary={brend.name} />
                            {!brend.creoLink && " - (диз)"}
                        </ListItemButton>
                    )
                    )}
                </List>
            </div>
        ))
        }
    </div>
    {currentBrend ? <DialogComponent brend={currentBrend} resetBrend={setCurrentBrend} open={open} setOpen={setOpen} /> : <></>}
  </>
  );
}

const styles = {
    clustersContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    clusterHead: {
        backgroundColor: '#1976d2',
        height: 40,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        color: 'white'
    },
    clusterItem: {
        width: 250,
        marginRight: 10
    }
}

export default observer(ClustersComponent)