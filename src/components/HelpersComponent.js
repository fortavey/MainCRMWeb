import * as React from 'react';
import appsMobx from '../mobx/appsMobx';
import { observer } from 'mobx-react-lite';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

function HelpersComponent() {
    const [name, setName] = React.useState('Название')
    const [appID, setAppID] = React.useState('ID приложения')
    const [alias, setAlias] = React.useState('')
    const [brend, setBrend] = React.useState('')

    const getSelfAlias = () => {
        const element = appsMobx.selfList.find(el => el.company == name)
        if(element) setAlias(element.alias)
        else setAlias('Нет такого')
    }

    const getBrend = () => {
        const element = appsMobx.appList.find(el => el.firstAppName.toLowerCase() == appID)
        if(element) setBrend(element.newAppName)
        else setBrend('Нет такого')
    }

  return (
    <>
        <h3>Узнать номер профиля по названию компании - {alias}</h3>
        <div style={styles.div}>
            <TextField
            required
            id="outlined-required"
            label="Компания"
            defaultValue={name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <Button variant="outlined" onClick={getSelfAlias}>Старт</Button>
        </div>
        <h3>Узнать бренд по ID приложения - {brend}</h3>
        <div style={styles.div}>
            <TextField
            required
            id="outlined-required"
            label="Id приложения"
            defaultValue={appID}
            value={appID}
            onChange={(e) => setAppID(e.target.value)}
            />
            <Button variant="outlined" onClick={getBrend}>Старт</Button>
        </div>
    </>
  );
}

const styles = {
    div: {
        width: 300,
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}

export default observer(HelpersComponent)