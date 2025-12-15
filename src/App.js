import React, {useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import appsMobx from './mobx/appsMobx.js';
import MainComponent from './components/MainComponent.js';
import MainComponent2 from './components/MainComponent2.js';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppListComponent from './components/AppListComponent.js';
import AppForUac from './components/AppForUac.js';
import TransfersComponent from './components/TransfersComponent.js';
import HelpersComponent from './components/HelpersComponent.js';

function updateList(){
  let timeOutID = setTimeout(() => {
    appsMobx.updateAppList()
    appsMobx.updateFM()
    appsMobx.updateRN()
    appsMobx.updateTO()
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
    appsMobx.updateTO()
    appsMobx.updateASO()
    appsMobx.updateTR()
    updateList()
  }, [])

  const routing = () => {
    if(isTasks == 'MainComponent') return <MainComponent />
    if(isTasks == 'MainComponent2') return <MainComponent2 />
    if(isTasks == 'AppListComponent') return <AppListComponent />
    if(isTasks == 'AppForUac') return <AppForUac />
    if(isTasks == 'TransfersComponent') return <TransfersComponent />
    if(isTasks == 'HelpersComponent') return <HelpersComponent />
    return <></>
  }

  return (
    <div className="App">
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={() => setIsTasks('MainComponent')}>Задачи Денис</Button>
        <Button variant="outlined" onClick={() => setIsTasks('MainComponent2')}>Задачи Саша</Button>
        <Button variant="outlined" onClick={() => setIsTasks('AppListComponent')}>Список приложений</Button>
        <Button variant="outlined" onClick={() => setIsTasks('AppForUac')}>Под UAC</Button>
        <Button variant="outlined" onClick={() => setIsTasks('TransfersComponent')}>Трансферы</Button>
        <Button variant="outlined" onClick={() => setIsTasks('HelpersComponent')}>Настройки</Button>
      </Stack>
      {routing()}
    </div>
  );
}

export default observer(App);
