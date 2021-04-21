import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import CreateAccount from './CreateAccount'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}))

function AccountContainer(){

    const classes = useStyles()


    return (
        <Container className={classes.root}>
             
                    <CreateAccount />
              
        </Container>
       
    )
}

export default AccountContainer