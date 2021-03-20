import React, { useContext, useEffect } from 'react'
import AuditModeContext from '../../../../context/audit_item/AuditModeContext'
import {Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ItemActionSnackbar(){

   
    const {itemName, action, snackBarOpened, snackBarAction, taskDone} = useContext(AuditModeContext).snackBarAction
    const {setSnackBarAction} = useContext(AuditModeContext)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setSnackBarAction({
            itemName: "",
            action: "",
            snackBarOpened: false,
            taskDone: ""
    
        })
    
       
    };




    return (

        <Snackbar open={snackBarOpened} onClose={handleClose}  autoHideDuration={3000} >
                        
            {
                taskDone ? <Alert severity="success" onClose={handleClose} > {itemName } Successfully {action} </Alert> : taskDone === false ?  <Alert severity="error" onClose={handleClose}> {itemName} Failed To Be {action}! </Alert> : null
            }
        </Snackbar>

    )
}

export default ItemActionSnackbar