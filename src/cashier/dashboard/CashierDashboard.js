
import React from 'react';
import { Box, Container, createMuiTheme, ThemeProvider, Grid, makeStyles, Paper, Typography, useMediaQuery } from '@material-ui/core';

import NotUsable from './NotUsable';
import CashierAppBar from './CashierAppBar';
import Shelf from './shelf/Shelf';

const muiTheme = createMuiTheme({
    typography: {
      fontFamily: [
        'Kanit',
        'cursive',
      ].join(','),
},});

const useStyles = makeStyles((theme) => ({
    root: {
      
        flexGrow: 1,
        padding: theme.spacing(1)
    },
    toolbar: theme.mixins.toolbar,

    paper: {
        height: "calc(95vh - 50px)",
        backgroundColor: "#050310"
    }
 }))


function CashierDashboard(){

    const matches = useMediaQuery('(max-width:900px)')
    const classes = useStyles()
    return (
       <>
            {
                matches ? <NotUsable /> :
                <ThemeProvider theme={muiTheme}>

                
                <Box maxWidth="xl" className={classes.root}  fixed>
                    <CashierAppBar />
                 

                    <Box width="100%" marginTop={2} flexGrow={1}>
                        <Grid container spacing={3}>
                            <Grid item xs={7} >
                                <Paper className={classes.paper} >
                                    <Shelf />
                                </Paper>
                            </Grid>

                            <Grid item xs={5} >
                                <Paper className={classes.paper}>
                                <Typography> Please l</Typography>
                                </Paper>
                            </Grid>


                        </Grid>
                    </Box>


                    
                </Box>
                </ThemeProvider>
            }
       </>
    )
}


export default CashierDashboard