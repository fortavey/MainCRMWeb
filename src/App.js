import React, {useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import appsMobx from './mobx/appsMobx.js';
import MainComponent from './components/MainComponent.js';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppListComponent from './components/AppListComponent.js';
import AppForUac from './components/AppForUac.js';
import HelpersComponent from './components/HelpersComponent.js';

function updateList(){
  let timeOutID = setTimeout(() => {
    appsMobx.updateAppList()
    appsMobx.updateFM()
    appsMobx.updateRN()
    appsMobx.updateCR()
    appsMobx.updateASO()
    appsMobx.updateTR()
    updateList()
    clearTimeout(timeOutID)
  }, 15000)
}

function App() {  
  const [isTasks, setIsTasks] = useState('MainComponent')
                
  useEffect(() => {
    appsMobx.updateSelfList()
    appsMobx.updateAppList()
    appsMobx.updateFM()
    appsMobx.updateRN()
    appsMobx.updateCR()
    appsMobx.updateASO()
    appsMobx.updateTR()
    updateList()
  }, [])

  const routing = () => {
    if(isTasks == 'MainComponent') return <MainComponent />
    if(isTasks == 'AppListComponent') return <AppListComponent />
    if(isTasks == 'AppForUac') return <AppForUac />
    if(isTasks == 'HelpersComponent') return <HelpersComponent />
    return <></>
  }

  return (
    <div className="App">
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={() => setIsTasks('MainComponent')}>Список задач</Button>
        <Button variant="outlined" onClick={() => setIsTasks('AppListComponent')}>Список приложений</Button>
        <Button variant="outlined" onClick={() => setIsTasks('AppForUac')}>Под UAC</Button>
        <Button variant="outlined" onClick={() => setIsTasks('HelpersComponent')}>Настройки</Button>
      </Stack>
      {routing()}
    </div>
  );
}

export default observer(App);
