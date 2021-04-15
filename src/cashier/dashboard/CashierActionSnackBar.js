import React, { useContext } from 'react'
import {Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import DashboardContext from '../../context/cashier/DashboardContext';



function Alert(props) {
    return <MuiAlert elevation={20} variant="filled" {...props} />;
}

function CashierActionSnackBar(){

    const {taskDone, message, setMessage, setTaskDone, setSnackbarOpened, snackBarOpened, setSeverity, severity} = useContext(DashboardContext)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setTaskDone('')
        setSnackbarOpened(false)
        setSeverity('success')
        setMessage('')
    };

    return (

        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}}  open={snackBarOpened} onClose={handleClose}  autoHideDuration={3000} >
                        
            {
                taskDone ? <Alert severity={severity} onClose={handleClose} > {message} </Alert> : taskDone === false ?  <Alert severity="error" onClose={handleClose}> {message}! </Alert> : null
            }
        </Snackbar>

    )
}

export default CashierActionSnackBar