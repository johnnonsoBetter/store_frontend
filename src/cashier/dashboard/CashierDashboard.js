import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Box, Drawer, createMuiTheme, ThemeProvider, Grid, makeStyles, Paper, Typography, useMediaQuery, IconButton, Avatar, Chip, Snackbar } from '@material-ui/core';
import NotUsable from './NotUsable';
import CashierAppBar from './CashierAppBar';
import Shelf from './shelf/Shelf';
import { DashboardContextProvider } from '../../context/cashier/DashboardContext';
import { Clear } from '@material-ui/icons';
import ActivityNav from './activity/ActivityNav';
import CashierActionSnackBar from './CashierActionSnackBar';
import { cashierApi } from '../../api/cashier/activity/api';

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
    }, 
    closeDrawerButton: {
        color: "white"
    }
 }))


function CashierDashboard(){

    const matches = useMediaQuery('(max-width:900px)')
    const classes = useStyles()
    const [drawerOpened, setDrawerOpened] = useState(false)
    const [width] = useWindowSize()
    const [snackBarOpened, setSnackbarOpened] = useState(false)
    const [taskDone, setTaskDone] = useState(false)
    const [message, setMessage] = useState('')
    const [products, setProducts] = useState([])




    useEffect(()=> {

        cashierApi().fetchStoreResource().then(response => {
            console.log(response)

           const {items, store_info} = response.data
           setProducts(items)
        }).catch(err => {
            console.log(err)
        })
       

        return ()=> {
            setProducts([])
        }
    }, [])
    



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
                    taskDone,
                    message,
                    setTaskDone,
                    snackBarOpened,
                    setSnackbarOpened,
                    showSnackBar: (message, taskDone)=> {
                        setMessage(message)
                        setTaskDone(taskDone)
                        setSnackbarOpened(true)
                    },
                    products,
                    setProducts,


                }}>


                
                    <Box maxWidth="xl" className={classes.root}  fixed
                        
                    >


                        <Drawer anchor="left" open={drawerOpened} >
                            <Box width={width} flexGrow={1} style={{backgroundColor: "#0b1225"}} > 
                                <Box display="flex" p={2} justifyContent="space-between" alignItems="center">
                                    <Box display="flex" justifyContent="center">
                                        <Chip
                                             avatar={<Avatar>U</Avatar>}
                                             label="Upright Supermarket"
                                             style={{backgroundColor: "#ff9347"}}
                                             variant="outlined"
                                        />
                                        
                                    </Box>
                                    <IconButton className={classes.closeDrawerButton} onClick={toggleDrawer} >
                                        <Clear />
                                    </IconButton>
                                </Box>
                                <ActivityNav />
                                <CashierActionSnackBar  />
                                
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