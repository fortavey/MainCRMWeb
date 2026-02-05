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
    const [longString, setLongString] = React.useState('')
    const [output, setOutput] = React.useState([])

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


    const parseApps = () => {
        const elements = appsMobx.appList.map(app => (
            {
                appId: 'com.' + app.firstAppName.toLowerCase(),
                brend: app.newAppName
            }
        ))

        const startArr = longString.split('+++')
        const defaultArr = startArr.map(el => el.split(';'))
        let brendsArr = []
        let brendSortedArr = []

        brendsArr = defaultArr.map(el => {
            const brend = elements.filter(app => app.appId == el[1])
            
            return [el[0], brend[0].brend, el[2]]
        })

        brendsArr.forEach(item => {
            const oneItem = brendSortedArr.find(el => el.brend == item[1])
            if(oneItem) {
                oneItem.arr.push([item[0], item[2]])
            }else {
                brendSortedArr.push({
                    brend: item[1],
                    arr: [[item[0], item[2]]]
                })
            }
        })

        brendSortedArr.forEach(el => {
            el.arr = mergeCountries(el.arr)
        })
        
        setOutput(brendSortedArr)
    }

    const mergeCountries = (arr) => {
        const newArr = []

        arr.forEach(item => {
            const itemOfArr = newArr.find(el => el[0] == item[0])
            if(itemOfArr){
                const first = itemOfArr[1]
                const second = item[1].split(",").join("")
                itemOfArr[1] = parseInt(first) + parseInt(second)
            }else {
                newArr.push([item[0], item[1].split(",").join("")])
            }
        })


        return newArr
    }

    const renderBrend = () => {
        return output.map(el => <div><strong>{el.brend}</strong><br/>{renderClicks(el.arr)}</div>)
    }

    const renderClicks = (arr) => {
        return arr.sort((a, b) => b[1] - a[1]).map(el => <div style={{paddingLeft:20}}>{el[0] + " - " + el[1]}</div>)
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
        <h3>Парсер приложений кейтары</h3>
        <div style={styles.div}>
            <TextField
            required
            id="outlined-required"
            label="Строка из кейтары"
            defaultValue={longString}
            value={longString}
            onChange={(e) => setLongString(e.target.value)}
            />
            <Button variant="outlined" onClick={parseApps}>Старт</Button>
        </div>
        {renderBrend()}
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