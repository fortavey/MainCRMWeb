import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import appsMobx from '../mobx/appsMobx';
import { observer } from 'mobx-react-lite';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function UserComponent() {
  const [open, setOpen] = React.useState(false);
  const [currentUserId, setCurrentUserId] = React.useState(null);
  const [pass, setPass] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCurrentUserId(null)
    setPass('')
    appsMobx.snackBar.open = false
    setOpen(false);
  }

  const handleChangeSelect = (event) => {
    setCurrentUserId(event.target.value)
    setPass("")
  }

  const passChangeSelect = (event) => {
    setPass(event.target.value)
  }

  const pressSave = () => {    
    let user = appsMobx.usersList.find(el => el.id == currentUserId)
    if(!user) {
      appsMobx.snackBar.text = "Неизвестная ошибка"
      appsMobx.snackBar.status = "error"
      return;
    }
    if(user.pass == pass){
      appsMobx.updateCurrentUser(user)
      appsMobx.snackBar.text = "Вход выполнен успешно"
      appsMobx.snackBar.status = "success"
    }else{
      appsMobx.snackBar.text = "Пароль введен неверно"
      appsMobx.snackBar.status = "error"
    }
      appsMobx.snackBar.open = true
  }

  return (
    <div>
      <Button onClick={handleOpen}>Пользователь</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Выбор пользователя
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Пользователь</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentUserId}
                  label="Пользователь"
                  onChange={handleChangeSelect}
                  >
                    {appsMobx.usersList.map((user) => <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>)}
                </Select>
                <div style={{height:10}}></div>
                {currentUserId && <TextField
                  id="outlined-password-input"
                  value={pass}
                  label="Пароль"
                  type="password"
                  autoComplete="current-password"
                  onChange={passChangeSelect}
                />}
                <div style={{height:10}}></div>
                {pass && <Button variant="contained" onClick={pressSave}>Вход</Button>}
            </FormControl>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default observer(UserComponent)