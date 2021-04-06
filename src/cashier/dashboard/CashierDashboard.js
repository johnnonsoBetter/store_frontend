
import React, { useLayoutEffect, useState } from 'react';
import { Box, Drawer, createMuiTheme, ThemeProvider, Grid, makeStyles, Paper, Typography, useMediaQuery, IconButton } from '@material-ui/core';

import NotUsable from './NotUsable';
import CashierAppBar from './CashierAppBar';
import Shelf from './shelf/Shelf';
import { DashboardContextProvider } from '../../context/cashier/DashboardContext';
import { Clear } from '@material-ui/icons';

const muiTheme = createMuiTheme({
    typography: {
      fontFamily: [
        'Kanit',
        'cursive',
      ].join(','),
},});


function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }
  
  

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
    const [drawerOpened, setDrawerOpened] = useState(true)
    const [width] = useWindowSize()

    const toggleDrawer = () => {
        setDrawerOpened(!drawerOpened)
    }

    return (
       <>
            {
                matches ? <NotUsable /> :
                <ThemeProvider theme={muiTheme}>

                <DashboardContextProvider
                value={{
                    toggleDrawer,
                }}>


                
                    <Box maxWidth="xl" className={classes.root}  fixed
                        
                    >


                        <Drawer anchor="left" open={drawerOpened} >
                            <Box width={width} > 
                                <Box display="flex" p={1} justifyContent="flex-end">
                                    <IconButton onClick={toggleDrawer} >
                                        <Clear />
                                    </IconButton>

                                </Box>
                                
                             </Box>
                        </Drawer>
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
                                    <Typography style={{color: "white"}}> Please l</Typography>
                                    </Paper>
                                </Grid>


                            </Grid>
                        </Box>


                        
                    </Box>
                </DashboardContextProvider>
                </ThemeProvider>
            }
       </>
    )
}


export default CashierDashboard