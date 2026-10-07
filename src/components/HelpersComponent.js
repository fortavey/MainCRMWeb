import * as React from 'react';
import appsMobx from '../mobx/appsMobx';
import { observer } from 'mobx-react-lite';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function HelpersComponent() {
    const [name, setName] = React.useState('Название')
    const [appID, setAppID] = React.useState('ID приложения')
    const [alias, setAlias] = React.useState('')
    const [brend, setBrend] = React.useState('')
    const [longString, setLongString] = React.useState('')
    const [output, setOutput] = React.useState([])
    const [month, setMonth] = React.useState(new Date().getMonth())
    const id = React.useId();

    const getSelfAlias = () => {
        const elements = appsMobx.selfList.filter(el => el.company.includes(name))
        let res = ""
        if(elements.length) {
            elements.forEach(e => {
                res = res + " - " + e.alias
            })
        }else {
            res = "Нет такого"
        }
        setAlias(res)
    }

    const getBrend = () => {
        const element = appsMobx.appList.find(el => el.firstAppName.toLowerCase() == appID)
        if(element) setBrend(element.newAppName)
        else setBrend('Нет такого')
    }





    function isDateValide(timestamp){
        if(new Date(timestamp).getMonth() == month){
            return true
        }
        return false
    }

    function getAppCount(name){
        let appList = appsMobx.appCounterList.filter(app => app.user == name)
        appList = appList.filter(app => isDateValide(app.time) )
        return appList.length
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMonth(event.target.value);
    };

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
        
        <FormControl>
        <FormLabel id={`${id}-label`}>Месяц</FormLabel>
        <RadioGroup row aria-labelledby={`${id}-label`} name="row-radio-buttons-group" value={month}
        onChange={handleChange}>
            <FormControlLabel value="0" control={<Radio />} label="Январь" />
            <FormControlLabel value="1" control={<Radio />} label="Февраль" />
            <FormControlLabel value="2" control={<Radio />} label="Март" />
            <FormControlLabel value="3" control={<Radio />} label="Апрель" />
            <FormControlLabel value="4" control={<Radio />} label="Май" />
            <FormControlLabel value="5" control={<Radio />} label="Июнь" />
            <FormControlLabel value="6" control={<Radio />} label="Июль" />
            <FormControlLabel value="7" control={<Radio />} label="Август" />
            <FormControlLabel value="8" control={<Radio />} label="Сентябрь" />
            <FormControlLabel value="9" control={<Radio />} label="Октябрь" />
            <FormControlLabel value="10" control={<Radio />} label="Ноябрь" />
            <FormControlLabel value="11" control={<Radio />} label="Декабрь" />
        </RadioGroup>
        </FormControl>

        <div>Александр - {getAppCount("Александр")}</div>
        <div>Наталья - {getAppCount("Наталья")}</div>
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