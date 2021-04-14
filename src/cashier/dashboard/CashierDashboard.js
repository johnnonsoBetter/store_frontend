import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Box, Drawer, createMuiTheme, ThemeProvider, Grid, makeStyles, Paper, Typography, useMediaQuery, IconButton, Avatar, Chip } from '@material-ui/core';
import NotUsable from './NotUsable';
import CashierAppBar from './CashierAppBar';
import Shelf from './shelf/Shelf';
import { DashboardContextProvider } from '../../context/cashier/DashboardContext';
import { Clear, Print } from '@material-ui/icons';
import ActivityNav from './activity/ActivityNav';
import CashierActionSnackBar from './CashierActionSnackBar';
import { cashierApi } from '../../api/cashier/activity/api';
import TableContainer from './table/TableContainer'
import SaleInfoBoard from './SaleInfoBoard';

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
        height: "calc(100vh - 100px)",
        backgroundColor: "#050310"
    }, 
    closeDrawerButton: {
        color: "white"
    },
    square: {
        width: theme.spacing(7)
        
      },
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

    // table states
    const [itemsToBeSold, setItemsToBeSold] = useState([])
    const [sale, setSale] = useState({})
    const [transactionOnProcess, setTransactionOnProcess] = useState(false)
    const [counterInfo, setCounterInfo] = useState({
        productCount: 0,
        itemsSoldCount: 0,
    })

    // {
   
    //     "log_issue_type": "sale",
    //     "sale": {
    //         "receipt_id": "bbbeea3f2f",
    //         "issue": true,
    //         "receipt_was_issued": true,
    //         "total_items_amount": 600,
    //         "discount": 0,
    //         "total_amount_paid": 600,
    //         "transaction_type": "cash",
    //         "cash_amount": 600,
    //         "cashback_profit": 0,
    //         "pos_amount": 0,
    //         "transfer_amount": 0,
    //         "items": [ {"name": "Snicker Chocolate", "quantity_sold": 1, "price_sold_per_unit": 600, "selling_price_was_altered": true}
    //         ]
                
    //     }
                                
               
    // }

    useEffect(()=> {

        caculateCounterInfo()
        processTransaction()

        return ()=> {

        }
    }, [itemsToBeSold])


    useEffect(()=> {

        setCounterInfo({
            productCount: 0,
            itemsSoldCount: 0,
        })

        setSale({
            receipt_id: "",
            issue: true,
            receipt_was_issued: false,
            total_items_amount: 0,
            discount: 0,
            total_amount_paid: 0,
            transaction_type: 'cash',
            cash_amount: 0,
            transfer_amount: 0,
            pos_amount: 0,
            cashback_profit: 0,
            items: []


        })

      

       
        cashierApi().fetchStoreResource().then(response => {
          
           const {items, store_info} = response.data
           setProducts(items)
        }).catch(err => {
            console.log(err)
        })
       

        return ()=> {
            setProducts([])
            setSale(null)
        }
    }, [])


    const processTransaction = () => {

        function getTotalItemAmount(total, item){
            return total + item.price_sold_per_unit
        }

        

        const total_items_amount = itemsToBeSold.reduce(getTotalItemAmount, 0)
        const total_amount_paid = total_items_amount - sale['discount']

        const new_sale = Object.assign({}, sale)

        new_sale['total_items_amount'] = total_items_amount
        new_sale['total_amount_paid'] = total_amount_paid
        
        console.log(new_sale)
        console.log(itemsToBeSold)

        setSale(new_sale)


    }
    

    function caculateCounterInfo() {

        function getTotalItemsOnSHelf(total, item){
            return total + item.quantity_sold
        }
      
        const product_sum = itemsToBeSold.length

        const newCounterInfo = Object.assign({}, counterInfo)
       
        const items_sum = itemsToBeSold.reduce(getTotalItemsOnSHelf, 0)


        newCounterInfo['productCount'] = product_sum
        newCounterInfo['itemsSoldCount'] = items_sum

       
        setCounterInfo(newCounterInfo)
    }

   

    const addItemToTable  = (newProduct) => {

     
       const newItemsToBeSold = [...itemsToBeSold, {
            name: newProduct['name'],
            price_sold_per_unit: newProduct['selling_price'],
            quantity_sold: 1,
            price_was_edited: false,
            barcode: newProduct['barcode']
        }]

   
       setItemsToBeSold(newItemsToBeSold)
       setTransactionOnProcess(true)
       
    }


    const removeItemFromTable = (theProduct) => {

        const newItemsToBeSold = itemsToBeSold.filter(product => product.barcode != theProduct.barcode)

        if (newItemsToBeSold.length === 0) 
            setTransactionOnProcess(false)
       setItemsToBeSold(newItemsToBeSold)
    }



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
                    itemsToBeSold,
                    setProducts,
                    counterInfo,
                    setCounterInfo,
                    setItemsToBeSold,
                    addItemToTable,
                    sale,
                    setSale,
                    removeItemFromTable,


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
                                        <TableContainer />
                                       
                                    </Paper>
                                </Grid>


                            </Grid>
                        </Box>

                        {
                            transactionOnProcess && <SaleInfoBoard />
                        }
                        


                        
                    </Box>
                </DashboardContextProvider>
                </ThemeProvider>
            }
       </>
    )
}


export default CashierDashboard