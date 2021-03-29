
import {React, useContext, useEffect, useState, useLayoutEffect} from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, Box, Typography, Drawer, IconButton, Button, Menu, MenuItem, InputBase, withStyles, Grow, useMediaQuery} from '@material-ui/core/';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import clsx from 'clsx';
import { PrintDisabledRounded, SearchRounded, FlashOffRounded, CancelOutlined} from '@material-ui/icons';
import TransactionActivityContext from '../../../../../../context/admin/transaction_activity/TransactionActivity';
import axios from 'axios'
import { DateTime } from 'luxon';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red'
import {ThemeProvider} from '@material-ui/styles'
import ArrowForward from '@material-ui/icons/ArrowForward'
import grey from '@material-ui/core/colors/grey'
import SalesList from './SalesList';
import { SalesContextProvider } from '../../../../../../context/admin/transaction_activity/sales/SalesContext';
import Sale from './Sale';
import { useParams } from 'react-router-dom';



const searchButtonTheme = createMuiTheme({
  palette: {
    primary: green,
  },
  
});


const theme = createMuiTheme({

  palette: {
    primary: {
      main: green[600]
    },
    secondary: {
      main: red[600]
    },
    success: {
      main: grey[100]
    }
  },
  typography: {
    fontFamily: [
      'Kanit',
      'cursive',
    ].join(','),
   
}
})

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },

    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],

    },
 
    whiteText:  { 
      color: "white",
      textTransform: "capitalize"
    },

    noBottom: {
      borderBottom: "none"
    },
   
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    saleContainer: {
      // [theme.breakpoints.up('sm')]: {
      //   width: "100%"
      // },
      // width: 320,
    },
    tableComponent: {
      maxHeight: 440
    },
    cell: {
      backgroundColor: "black"
    }
  }));

  const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '0px solid #ced4da',
      fontSize: 16,
      padding: '5px 10px 5px 7px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        'Kanit',
        'cursive',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);


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



function SalesTable() {
  const classes = useStyles();
  const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;
  const {storeName} = useParams()
  const {setTransactionActivity, setTableType} = useContext(TransactionActivityContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('all')
  const [sales, setSales] = useState([])
  const [filteredSales, setFilteredSales] = useState(sales)
  const [showSearch, setShowSearch] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [saleDrawerOpened, setSaleDrawerOpened] = useState(false)
  const [receipt_id, setReceiptId] = useState('')
  const matches = useMediaQuery('(max-width:600px)')
  const [width] = useWindowSize()


  const filterSalesByIssue = () => {

    const newlyfilteredSales = sales.filter(sale => sale.issue === true)
   
    setFilteredSales(newlyfilteredSales)
      
  }

  const filterSalesByReceiptIssued = () => {
    const newlyfilteredSales = sales.filter(sale => sale.receipt_was_issued === false)
   
    setFilteredSales(newlyfilteredSales)
  }

  const filterBySearchAmount =  () => {

    const newlyfilteredSales = sales.filter(sale => sale.total_items_amount === parseInt(searchInput))
    console.log(searchInput)
    console.log(newlyfilteredSales)
    setFilteredSales(newlyfilteredSales)
  }

  const toggleSaleDrawer = (saleDrawerOpened) => {

    setSaleDrawerOpened(saleDrawerOpened)
  }

 


  useEffect(()=> {

    axios({
      method: 'GET',
      url: `http://localhost:3001/api/v1/admin_dashboards/${storeName}/sales`,
      headers: JSON.parse(localStorage.getItem('admin'))
    }).then(response => {
      console.log(response)

       const {transaction_activity, sales} = response.data
      
       setTransactionActivity(transaction_activity)
       setSales(sales)
       setFilteredSales(sales)
       setTableType('sales')
      
    }).catch(err => {

      console.log(err)
    })

    return ()=> {
      setSales([])
      setTransactionTypeFilter("all")
      setFilteredSales([])
      setShowSearch(false)
      setSearchInput("")

    }
  }, [])

  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTransactionTypeFilter =(filterType) => {
    console.log(filterType)
    if (filterType === "all"){
      setFilteredSales(sales)
      
    }
    else{
      const newlyfilteredSales = sales.filter(sale => sale.transaction_type.toLowerCase() === filterType)
      setFilteredSales(newlyfilteredSales)
    }
    setTransactionTypeFilter(filterType)
    setAnchorEl(null)

  }
 
  
  
  return (
    <>
    <SalesContextProvider value={{
      filteredSales,
      setFilteredSales,
      sales,
      classes,
      circle,
      saleDrawerOpened,
      toggleSaleDrawer: (saleDrawerOpened) => setSaleDrawerOpened(saleDrawerOpened),
      receipt_id,
      setReceiptId: (receipt_id)=> setReceiptId(receipt_id)

    }}> 
      <ThemeProvider theme={theme}>
          <Drawer anchor="right" open={saleDrawerOpened} onClose={()=> toggleSaleDrawer(false)}>
            <Box width={matches ? width : 320 } className={classes.saleContainer}>
              <Sale />
            </Box>
          </Drawer>
        <TableContainer className={classes.tableComponent} component={Paper} style={{backgroundColor: "black"}}>
          <Box  alignContent="center" display="flex" paddingRight={3} paddingLeft={3}>

            {
              showSearch ? 

                <Grow in={true}>
                      
                <Box display="flex" width="100%" justifyContent="space-between">
                  <Box display="flex" >
                   
                    <BootstrapInput  value={searchInput} onChange={(e) => setSearchInput(e.target.value)} label="Search amount" type="number" id="demo-customized-textbox" />
                  
                    <ThemeProvider theme={searchButtonTheme} >
                        <Box display="flex" p={1}>
                          <Button disabled={searchInput === '' ? true : false} variant="contained" color="primary" size="small" onClick={filterBySearchAmount}>
                              <SearchRounded />
                          </Button>

                        </Box>
                        
                    </ThemeProvider>

                  </Box>

                  <Box display="flex">
                    <IconButton style={{color: "white"}} onClick={()=> {
                      setShowSearch(!showSearch)
                      setFilteredSales(sales)
                      setTransactionTypeFilter("all")
                    }}> 
                      <CancelOutlined />
                    </IconButton>


                  </Box>
               
                  


                </Box>
                </Grow>
           
                :
                <Box display="flex" width="100%"> 
                  <Box display="flex"  flexGrow={1}>
                    
                      <IconButton onClick={()=> {
                        setShowSearch(!showSearch)
                      }}> 
                        <SearchRounded style={{color: "white"}}/>
                      </IconButton>


                  </Box>

               

                  <Box display="flex" >
                  
                    <Button style={{color: "white"}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                     {transactionTypeFilter}
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={()=>  setAnchorEl(null)}
                    >
                     
                      <MenuItem   onClick={()=> handleTransactionTypeFilter("all")}>All</MenuItem>
                      <MenuItem   onClick={()=> handleTransactionTypeFilter("cash")}>Cash</MenuItem>
                      <MenuItem   onClick={()=> handleTransactionTypeFilter("pos")}>Pos</MenuItem>
                      <MenuItem   onClick={()=> handleTransactionTypeFilter("transfer")} >Transfer</MenuItem>
                      <MenuItem   onClick={()=> handleTransactionTypeFilter("pos_cashback")} >Pos Cashback</MenuItem>
                      <MenuItem   onClick={()=> handleTransactionTypeFilter("transfer_cashback")}>Transfer Cashback</MenuItem>
                      <MenuItem   onClick={()=> handleTransactionTypeFilter("pos_cash")}>Pos Cash</MenuItem>
                      <MenuItem   onClick={()=> handleTransactionTypeFilter("transfer_cash")}>Transfer Cash</MenuItem>
                      <MenuItem   onClick={()=> handleTransactionTypeFilter("pos_transfer")}>Pos Transfer</MenuItem>
                    </Menu>
               
                    
                  </Box>

                  <Box display="flex" marginRight={1} marginLeft={1}>
                    <IconButton onClick={filterSalesByReceiptIssued}> 
                        <PrintDisabledRounded style={{color: "white"}}/>
                    </IconButton>
                    
                  </Box>

                  <Box display="flex" marginRight={1} marginLeft={1}>
                    <IconButton onClick={filterSalesByIssue}> 
                        <FlashOffRounded style={{color: "white"}}/>
                    </IconButton>
                    
                  </Box>
                  
                  </Box>
                  
           
          
            }
            </Box>
         
       
        

        {
          filteredSales.length === 0 ? <Box m={5}>
              <Typography>  <div style={{color: "white"}}> No Data</div> </Typography>

          </Box>  :

        <Table stickyHeader  className={classes.table} aria-label="simple table">
          <TableHead   style={{backgroundColor: "black"}} className={classes.noBottom}>
            <TableRow>
            
              <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Cashier </Typography></TableCell>
              <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Sales Amount </Typography> </TableCell>
              <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Transaction </Typography> </TableCell>
              <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Issue </Typography> </TableCell>
              <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Time </Typography> </TableCell>
              <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Info </Typography></TableCell>
            </TableRow>
          </TableHead>
         
        
          <SalesList />
        
        </Table>
       }
      </TableContainer>



      </ThemeProvider>
    </SalesContextProvider>
   
    </>
  );
}

export default SalesTable