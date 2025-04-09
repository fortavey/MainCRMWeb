import React, {useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import appsMobx from './mobx/appsMobx.js';
import MainComponent from './components/MainComponent.js';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppListComponent from './components/AppListComponent.js';

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
  const [isTasks, setIsTasks] = useState(true)
                
  useEffect(() => {
    appsMobx.updateAppList()
    appsMobx.updateFM()
    appsMobx.updateRN()
    appsMobx.updateCR()
    appsMobx.updateASO()
    appsMobx.updateTR()
    updateList()
  }, [])

  return (
    <div className="App">
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={() => setIsTasks(true)}>Список задач</Button>
        <Button variant="outlined" onClick={() => setIsTasks(false)}>Список приложений</Button>
      </Stack>
      {isTasks ? <MainComponent /> : <AppListComponent />}
    </div>
  );
}

export default observer(App);
