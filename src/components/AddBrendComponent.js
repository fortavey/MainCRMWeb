import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import appsMobx from '../mobx/appsMobx';

export default function AddBrendComponent({cluster}) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function save(){
    await appsMobx.addBrend(name, cluster);
    setOpen(false);
    setName('');
    appsMobx.updateBrendsList()
  }

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        +
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить новый бренд</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Бренд будет добавлен в кластер №{cluster}
          </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              label="Название бренда"
              fullWidth
              variant="standard"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
        </DialogContent>
        <DialogActions>
          <Button type="submit" form="subscription-form" onClick={save}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}