import React from 'react'
import {Box, Grow, Typography, Button} from '@material-ui/core'

function DeleteConfirmation({...props}){

    const {confirmationVisible, name, deleteConfirmation, toggleConfirmationVisible, deleteItem} = props

    return (
        <Grow in={confirmationVisible}>
           
            <Box >
                <Box textAlign="center" p={1} className={deleteConfirmation}>
                    <Typography style={{lineHeight: "2.2"}}> Are You Sure You Want To Delete</Typography>
                    <Typography> {name} </Typography>

                    <Box display="flex" justifyContent="space-around">
                        <Button onClick={toggleConfirmationVisible} >
                           Cancel
                        </Button>

                        <Button  onClick={deleteItem}>
                            Confirm
                        </Button>
                    </Box>

                </Box>
            </Box>

        </Grow>
    )
}


export default DeleteConfirmation