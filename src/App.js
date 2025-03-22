import React, {useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import appsMobx from './mobx/appsMobx.js';
import MainComponent from './components/MainComponent.js';

function updateList(){
  let timeOutID = setTimeout(() => {
    appsMobx.updateFM()
    appsMobx.updateRN()
    appsMobx.updateCR()
    updateList()
    clearTimeout(timeOutID)
  }, 15000)
}

function App() {  
                
  useEffect(() => {
    appsMobx.updateFM()
    appsMobx.updateRN()
    appsMobx.updateCR()
    updateList()
  }, [])

  return (
    <div className="App">
      <MainComponent />
    </div>
  );
}

export default observer(App);
