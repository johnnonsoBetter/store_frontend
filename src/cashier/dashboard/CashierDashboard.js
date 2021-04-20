import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Box, Drawer, createMuiTheme, ThemeProvider, Grid, makeStyles, Paper, Typography, useMediaQuery, IconButton, Avatar, Chip } from '@material-ui/core';
import NotUsable from './NotUsable';
import CashierAppBar from './CashierAppBar';
import Shelf from './shelf/Shelf';
import { DashboardContextProvider } from '../../context/cashier/DashboardContext';
import { Clear } from '@material-ui/icons';
import ActivityNav from './activity/ActivityNav';
import CashierActionSnackBar from './CashierActionSnackBar';
import { cashierApi } from '../../api/cashier/activity/api';
import TableContainer from './table/TableContainer'
import SaleInfoBoard from './SaleInfoBoard';
import CashierLoader from './CashierLoader';
import Dexie from 'dexie'
import SaleReceipt from './SaleReceipt';
import {uid} from 'uid'
import RecentSaleReceipt from './recent_sales/RecentSaleReceipt';


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
    const [severity, setSeverity] = useState('')
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [dashboardLoading, setDashboardLoading] = useState(true)
    const [storeInfo, setStoreInfo] = useState({
        name: ''
    })
    

    // table states
    const [itemsToBeSold, setItemsToBeSold] = useState([])
    const [sale, setSale] = useState({})
    const [transactionOnProcess, setTransactionOnProcess] = useState(false)
    const [discount, setDiscount] = useState('0')
    const [transactionType, setTransactionType] = useState('cash')
    const [counterInfo, setCounterInfo] = useState({
        productCount: 0,
        itemsSoldCount: 0,
    })
    const [transactionAmount, setTransactionAmount] = useState('0')
    const [inputOpened, setInputOpened] = useState(false)
    const [receiptOpened, setReceiptOpened] = useState(false)
    const [recentSale, setRecentSale] = useState({
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
        item_solds: []


    })
    const [recentSaleReceiptOpened, setRecentSaleReceiptOpened] = useState(false)
    const [storedSaleId, setStoredSaleId] = useState('-1')
    const [unSoldSales, setUnSoldSales] = useState([])


    const actualPayment = () => {
        if (sale['transaction_type'] === "pos_cashback"){
            return sale['pos_amount']
        }else if(sale['transaction_type'] === "transfer_cashback"){
            return sale['transfer_amount']
        }
            
        return sale['total_amount_paid']
    }

    useEffect(()=> {

        caculateCounterInfo()
        processTransaction()

       
       
    }, [itemsToBeSold])

   

    useEffect(()=> {
        processTransaction()
        
    }, [discount, transactionType, transactionAmount])

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
           setFilteredProducts(items)
           setDashboardLoading(false)
           setStoreInfo(store_info)
       
           var db = new Dexie('storeDb')

           db.version(1).stores({
               salesNotSold: '++id, receipt_id, issue, receipt_was_issued, total_items_amount, total_amount_paid, discount, transaction_type, cash_amount, cashback_profit, pos_amount, transfer_amount, items'
           })
   
           db.salesNotSold.toArray().then(sales => {
            
               setUnSoldSales(sales)
              
           })

          

        }).catch(err => {
            console.log(err)
        })
       

        return ()=> {
            setProducts([])
            setSale(null)
            setTransactionOnProcess(false)
            setTransactionType('cash')
            setItemsToBeSold([])
            setProducts([])
            setCounterInfo({
                productCount: 0,
                itemsSoldCount: 0,
            })
            setDashboardLoading(true)
            setStoreInfo({
                name: ''
            })
            setFilteredProducts([])
            setRecentSale({
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
                item_solds: []
    
    
            })
            setRecentSaleReceiptOpened(false)
            setUnSoldSales([])
        }
    }, [])


    
 

    const applyDefault = (itemsToBeSold) => {

        if (itemsToBeSold.length === 0){
            setTransactionOnProcess(false)
            setDiscount('0')
            setTransactionType('cash')
            setInputOpened(false)
            setTransactionAmount('0')
            setReceiptOpened(false)

        }
           
    }


    const processTransaction = () => {

        function getTotalItemAmount(total, item){
            return total + (item.price_sold_per_unit * item.quantity_sold)
        }

        
       
        const total_items_amount = itemsToBeSold.reduce(getTotalItemAmount, 0)
        const total_amount_paid = total_items_amount - discount

        const new_sale = Object.assign({}, sale)

        new_sale['pos_amount'] = 0
        new_sale['cash_amount'] = 0
        new_sale['transfer_amount'] = 0
        new_sale['cashback_profit'] = 0
        new_sale['receipt_id'] = uid()
        new_sale['receipt_was_issued'] = true

        new_sale['total_items_amount'] = total_items_amount
        new_sale['total_amount_paid'] = total_amount_paid
        new_sale['transaction_type'] = transactionType
        new_sale['items'] = itemsToBeSold.map((item) => {
            const {name, price_sold_per_unit, quantity_sold, selling_price_was_altered} = item
            return {
                name,
                price_sold_per_unit: parseInt(price_sold_per_unit),
                quantity_sold: parseInt(quantity_sold),
                selling_price_was_altered,
            }
        })
        new_sale['discount'] = parseInt(discount)

        const cashbackAmount = 100
        // processes the transaction type

        switch(transactionType){
            case "cash": 
                new_sale['cash_amount'] = parseInt(total_amount_paid)
            break
            case "pos":
                new_sale['pos_amount'] = parseInt((total_amount_paid)) 
            break
            case "transfer":
                new_sale['transfer_amount'] = (total_amount_paid)
            break
            case "pos_cashback":    
                const totalPos = (total_amount_paid + cashbackAmount + (parseInt(transactionAmount)))

                new_sale['pos_amount'] = parseInt(totalPos) 
                new_sale['cash_amount'] = parseInt(transactionAmount)
                new_sale['cashback_profit'] = parseInt(cashbackAmount) 

            break
            case "transfer_cashback":
                const totalTransfer = (total_amount_paid + cashbackAmount + (parseInt(transactionAmount)))

                new_sale['transfer_amount'] = parseInt(totalTransfer) 
                new_sale['cash_amount'] = parseInt(transactionAmount)
                new_sale['cashback_profit'] = cashbackAmount

            break
            case "pos_cash":
                const pos = (total_amount_paid - (parseInt(transactionAmount)))
                new_sale['pos_amount'] = pos
                new_sale['cash_amount'] = parseInt(transactionAmount)

            break
            case "transfer_cash":
                const transfer = (total_amount_paid - (parseInt(transactionAmount)))
                new_sale['transfer_amount'] = parseInt(transfer)
                new_sale['cash_amount'] = parseInt(transactionAmount)

            break
            case "pos_transfer": 
                const pos_ = (total_amount_paid - (parseInt(transactionAmount)))
                new_sale['pos_amount'] = parseInt(pos_)
                new_sale['transfer_amount'] = parseInt(transactionAmount)

            break
            

            

        }
        setSale(new_sale)


    }
    

    function caculateCounterInfo() {

        function getTotalItemsOnSHelf(total, item){
           
            return total + parseInt(item.quantity_sold)
        }
      
        const product_sum = itemsToBeSold.length

        const newCounterInfo = Object.assign({}, counterInfo)
       
        const items_sum = itemsToBeSold.reduce(getTotalItemsOnSHelf, 0)


        newCounterInfo['productCount'] = product_sum
        newCounterInfo['itemsSoldCount'] = items_sum

       
        setCounterInfo(newCounterInfo)
    }

    const launchSnackBar =(s_message, severity)=> {
        setSnackbarOpened(true)
        setMessage(s_message)
        setSeverity(severity)
        setTaskDone(true)
    }

   

    const addItemToTable  = (newProduct) => {


        function itemAlreadyExistOnCounter(){
           return itemsToBeSold.some((item) => item.barcode === newProduct.barcode)
           
        }

        function addItem(){

            const newItemsToBeSold = [...itemsToBeSold, {
                name: newProduct['name'],
                price_sold_per_unit: newProduct['selling_price'],
                quantity_sold: 1,
                selling_price_was_altered: false,
                barcode: newProduct['barcode'],
                fixed_price: newProduct['selling_price']
            }]
    
       
            setItemsToBeSold(newItemsToBeSold)
            setTransactionOnProcess(true)

           


          
            launchSnackBar(`Added ${newProduct['name']}`,'success')
          
           
        }



       if (itemAlreadyExistOnCounter()){
            
            launchSnackBar("Item Already Added for sale", "info")
       }else{
            addItem()
       }
     
      
       
    }


    const removeItemFromTable = (theProduct) => {

        const newItemsToBeSold = itemsToBeSold.filter(product => product.barcode != theProduct.barcode)

        
       setItemsToBeSold(newItemsToBeSold)
       applyDefault(newItemsToBeSold)
    }

    const clearAllItemsOnCounter = () => {

        setItemsToBeSold([])
        applyDefault([])

    }

    

    const toggleReceipt = () => {

        setReceiptOpened(!receiptOpened)
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
                    processTransaction,
                    discount,
                    setDiscount,
                    clearAllItemsOnCounter,
                    severity,
                    setSeverity,
                    setMessage,
                    launchSnackBar,
                    transactionType,
                    setTransactionType,
                    setTransactionAmount,
                    transactionAmount,
                    transactionOnProcess,
                    inputOpened,
                    setInputOpened,
                    toggleReceipt,
                    receiptOpened,
                    setReceiptOpened,
                    storeInfo,
                    actualPayment,
                    filteredProducts,
                    setFilteredProducts,
                    setRecentSale,
                    setRecentSaleReceiptOpened,
                    recentSale,
                    recentSaleReceiptOpened,
                    setStoredSaleId,
                    storedSaleId,
                    unSoldSales,
                    setUnSoldSales,
                
                }}>

                  {

                    dashboardLoading ?
                    <CashierLoader />:

                 
                
                    <Box maxWidth="xl" className={classes.root}  fixed
                        
                    >
                        
                        <CashierActionSnackBar  />
                        <Drawer anchor="left" open={drawerOpened} >
                            <Box width={width} flexGrow={1} style={{backgroundColor: "#0b1225"}} > 
                                <Box display="flex" p={2} justifyContent="space-between" alignItems="center">
                                    <Box display="flex" justifyContent="center">
                                        <Chip
                                             avatar={<Avatar>{ storeInfo['name'].charAt(0)   }</Avatar>}
                                             label={`${storeInfo['name']} Supermarket`}
                                             style={{backgroundColor: "#ff9347" , textTransform: "capitalize"}}
                                             variant="outlined"
                                            
                                        />
                                        
                                    </Box>
                                    <IconButton className={classes.closeDrawerButton} onClick={toggleDrawer} >
                                        <Clear />
                                    </IconButton>
                                </Box>
                                <ActivityNav />
                               
                                
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
                        
                        <SaleReceipt />
                        <RecentSaleReceipt />
                        
                    </Box>
                    }
                </DashboardContextProvider>
                </ThemeProvider>
            }
       </>
    )
}


export default CashierDashboard