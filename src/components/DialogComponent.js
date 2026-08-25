import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import appsMobx from '../mobx/appsMobx';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function DialogComponent({brend, resetBrend, open, setOpen}) {
  const [cluster, setCluster] = React.useState(brend.limitCounter)
  const [openSelect, setOpenSelect] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleClose = () => {
    resetBrend(null)
    setOpen(false);
    setChecked(true);
  };

  const handleChangeSelect = (event: SelectChangeEvent<typeof age>) => {
    setCluster(event.target.value);
  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  async function save(){
    await appsMobx.changeBrend(brend.id, cluster, !checked)
    setOpen(false);
    setChecked(true)
  }

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {brend.name}
        </DialogTitle>
        <div style={{width: 300}}></div>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div>
            <Button sx={{ display: 'block', mt: 2 }} onClick={handleOpenSelect}>
                Изменить кластер
            </Button>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-controlled-open-select-label">Кластер</InputLabel>
                <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openSelect}
                onClose={handleCloseSelect}
                onOpen={handleOpenSelect}
                value={cluster}
                label="Кластер"
                onChange={handleChangeSelect}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                </Select>
            </FormControl>
          </div>
          <Typography gutterBottom>
            <Button sx={{ display: 'block', mt: 2 }} onClick={handleOpenSelect}>
                Рабочий бренд
            </Button>
            <Switch
                checked={checked}
                onChange={handleChangeSwitch}
                slotProps={{ input: { 'aria-label': 'controlled' } }}
            />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={save}>
            Сохранить
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}