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
    appsMobx.updateAppCounterList()
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
    appsMobx.updateAppCounterList()
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

  function renderMonthText(index){
    switch(index){
      case 0: return "январь"
      case 1: return "февраль"
      case 2: return "март"
      case 3: return "апрель"
      case 4: return "май"
      case 5: return "июнь"
      case 6: return "июль"
      case 7: return "август"
      case 8: return "сентябрь"; break;
      case 9: return "октябрь"
      case 10: return "ноябрь"
      case 11: return "декабрь"
      default: return "месяц"
    }
  }

  function getCurrentMonth(){
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth(); 
    return currentMonthIndex;
  }

  function isDateValide(timestamp){
    if(new Date(timestamp).getFullYear() == new Date().getFullYear()){
      if(new Date(timestamp).getMonth() == new Date().getMonth()){
        return true
      }
    }
    return false
  }

  function getAppCount(){
    let appList = appsMobx.appCounterList.filter(app => app.user == appsMobx.currentUser.name)
    appList = appList.filter(app => isDateValide(app.time) )
    return appList.length
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
        {appsMobx.currentUser ? (
          <>
            Пользователь, {appsMobx.currentUser.name} <br/>
            Счетчик за {renderMonthText(getCurrentMonth())} - {getAppCount()}
          </>
        ) : <UserComponent />}
      </Stack>
      {routing()}
      {appsMobx.snackBar.open && <CustomizedSnackbars />}
    </div>
  );
}

export default observer(App);
