import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { observer } from 'mobx-react-lite';
import appsMobx from '../mobx/appsMobx';

function CustomizedSnackbars() {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    appsMobx.snackBar.open = false
  };

  return (
    <div>
      <Snackbar open={appsMobx.snackBar.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={appsMobx.snackBar.status}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {appsMobx.snackBar.text}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default observer(CustomizedSnackbars)
