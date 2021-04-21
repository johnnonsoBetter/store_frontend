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
             <Grid container>
                <Grid item md={5}>
                    <CreateAccount />
                </Grid>

                <Grid item md={7}>
                    <Typography> THe same time and the same place </Typography>
                </Grid>
            </Grid>
        </Container>
       
    )
}

export default AccountContainer