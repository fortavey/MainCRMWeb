import React, {useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import appsMobx from './mobx/appsMobx.js';
import MainComponent from './components/MainComponent.js';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppListComponent from './components/AppListComponent.js';
import AppForUac from './components/AppForUac.js';
import HelpersComponent from './components/HelpersComponent.js';
import AnaliticsComponent from './components/AnaliticsComponent.js';
import ClustersComponent from './components/ClustersComponent.js';
import UserComponent from './components/UserComponent.tsx';
import CustomizedSnackbars from './components/CustomizedSnackbars.tsx';

function updateList(){
  let timeOutID = setTimeout(() => {
    appsMobx.updateAppList()
    appsMobx.updateFM()
    appsMobx.updateRN()
    appsMobx.updateTO()
    appsMobx.updateASO()
    appsMobx.updateTR()
    appsMobx.updateBrendsList()
    appsMobx.updateUsersList()
    updateList()
    clearTimeout(timeOutID)
  }, 15000)
}

function App() {  
  const [isTasks, setIsTasks] = useState('MainComponent')
  const [snackbarText, setSnackbarText] = useState("Fist")
  const [snackbarStatus, setSnackbarStatus] = useState("error")
  const [snackbarOpen, setSnackbarOpen] = useState(false)
                
  useEffect(() => {
    appsMobx.updateSelfList()
    appsMobx.updateAppList()
    appsMobx.updateFM()
    appsMobx.updateRN()
    appsMobx.updateTO()
    appsMobx.updateASO()
    appsMobx.updateTR()
    appsMobx.updateBrendsList()
    appsMobx.updateUsersList()
    updateList()
  }, [])

  const routing = () => {
    if(isTasks == 'MainComponent') return <MainComponent />
    if(isTasks == 'AppListComponent') return <AppListComponent />
    if(isTasks == 'AppForUac') return <AppForUac />
    if(isTasks == 'HelpersComponent') return <HelpersComponent />
    if(isTasks == 'AnaliticsComponent') return <AnaliticsComponent />
    if(isTasks == 'ClustersComponent') return <ClustersComponent />
    return <></>
  }

  return (
    <div className="App">
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={() => setIsTasks('MainComponent')}>Задачи</Button>
        <Button variant="outlined" onClick={() => setIsTasks('AppListComponent')}>Список приложений</Button>
        <Button variant="outlined" onClick={() => setIsTasks('AppForUac')}>Под UAC</Button>
        <Button variant="outlined" onClick={() => setIsTasks('HelpersComponent')}>Настройки</Button>
        <Button variant="outlined" onClick={() => setIsTasks('AnaliticsComponent')}>Аналитика</Button>
        <Button variant="outlined" onClick={() => setIsTasks('ClustersComponent')}>Кластеры</Button>
        <Box sx={{ flexGrow: 1 }} />
        {appsMobx.currentUser ? <>Пользователь, {appsMobx.currentUser.name}</> : <UserComponent />}
      </Stack>
      {routing()}
      {appsMobx.snackBar.open && <CustomizedSnackbars />}
    </div>
  );
}

export default observer(App);
