
import {React, useContext, useEffect, useState} from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, Avatar, Select, Box, Typography, Badge, IconButton, MenuItem, InputBase, withStyles, Grow} from '@material-ui/core/';
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
import SalesList from './SalesList';
import { SalesContextProvider } from '../../../../../../context/admin/transaction_activity/sales/SalesContext';

const theme = createMuiTheme({

  palette: {
    primary: {
      main: green[600]
    },
    secondary: {
      main: red[600]
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



function SalesTable() {
  const classes = useStyles();
  const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;
  const storeName = "upright"
  const {setTransactionActivity, setTableType} = useContext(TransactionActivityContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const [sales, setSales] = useState([])
  const [filteredSales, setFilteredSales] = useState(sales)
  const [showSearch, setShowSearch] = useState(false)
  const [searchInput, setSearchInput] = useState('')



  const handleClose = (e) => {
    e.preventDefault()
    sortSales(e)
    console.log(e)
    setAnchorEl(null);
  };

  const sortSales = (e) => {
    e.preventDefault()

    console.log(e.target.value)
  }

  const handleTransactionTypeChange = (e) => {
    e.preventDefault()
    const value = e.target.value

    console.log(value)

    if (value === "."){
      setFilteredSales(sales)
    }
    else{
      const newlyfilteredSales = sales.filter(sale => sale.transaction_type.toLowerCase() === value)
      setFilteredSales(newlyfilteredSales)
    }
   

  }

  const filterSalesByIssue = () => {

    const newlyfilteredSales = sales.filter(sale => sale.issue === true)
   
      setFilteredSales(newlyfilteredSales)
      
  }

  const searchByAmount =(e) => {

    e.preventDefault()
    setSearchInput(e.target.value)

    const newlyfilteredSales = sales.filter(sale => sale.total_items_amount === parseInt(searchInput))
    setFilteredSales(newlyfilteredSales)

    if(e.target.length <= 0){
      setFilteredSales(sales)
    
    }
    console.log(e.target.length)
   
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

    }
  }, [])
 
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('all')
  
  return (
    <>
    <SalesContextProvider value={{
      filteredSales,
      setFilteredSales,
      sales,
      classes,
      circle,



    }}> 
      <ThemeProvider theme={theme}>
        <TableContainer component={Paper} style={{backgroundColor: "black"}}>
        
        <Box style={{backgroundColor: '#090A0A'}} alignContent="center" display="flex" paddingRight={3} paddingLeft={3}>

          

          <Box display="flex" flexGrow={1}>
            {showSearch ? 
                <Grow in={true}>
                    
                   <div>
                   <BootstrapInput value={searchInput} onChange={searchByAmount} label="Search amount" type="number" id="demo-customized-textbox" />
                   <IconButton  onClick={()=> {
                      setShowSearch(!showSearch)
                    }}> 
                     <CancelOutlined />
                   </IconButton>


                   </div>
                </Grow>
                :    

               
                   <IconButton onClick={()=> {
                      setShowSearch(!showSearch)
                    }}> 
                      <SearchRounded style={{color: "white"}}/>
                    </IconButton>

             
                

            }
            
            
            
            
          </Box>

          <Box   style={{color: "white"}} display="flex">
            
            <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={"helo"}
            onChange={handleTransactionTypeChange}
            color="primary"
            backgroundColor="secondary"
            
          >
              <MenuItem   value=".">All</MenuItem>
              <MenuItem  value="cash">Cash</MenuItem>
              <MenuItem  value="pos">Pos</MenuItem>
              <MenuItem  value="transfer">Transfer</MenuItem>
              <MenuItem  value="pos_cashback">Pos Cashback</MenuItem>
              <MenuItem  value="transfer_cashback">Transfer Cashback</MenuItem>
              <MenuItem  value="pos_cash">Pos Cash</MenuItem>
              <MenuItem  value="transfer_cash">Transfer Cash</MenuItem>
              <MenuItem  value="pos_transfer">Pos Transfer</MenuItem>
          </Select>

    
          </Box>

          <Box display="flex" marginRight={1} marginLeft={1}>
            <IconButton> 
                <PrintDisabledRounded style={{color: "white"}}/>
            </IconButton>
            
          </Box>

          <Box display="flex" marginRight={1} marginLeft={1}>
            <IconButton onClick={filterSalesByIssue}> 
                <FlashOffRounded style={{color: "white"}}/>
            </IconButton>
            
          </Box>
        </Box>
       
        

        {
          filteredSales.length === 0 ? <Box m={5}>
              <Typography>  <div style={{color: "white"}}> No Data</div> </Typography>

          </Box>  :

        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{backgroundColor: "black"}} className={classes.noBottom}>
            <TableRow>
            
              <TableCell align="center"> <Typography className={classes.whiteText}> Cashier </Typography></TableCell>
              <TableCell align="center"> <Typography className={classes.whiteText}> Sales Amount </Typography> </TableCell>
              <TableCell align="center"> <Typography className={classes.whiteText}> Transaction </Typography> </TableCell>
              <TableCell align="center"> <Typography className={classes.whiteText}> Issue </Typography> </TableCell>
              <TableCell align="center"> <Typography className={classes.whiteText}> Time </Typography> </TableCell>
              <TableCell align="center"> <Typography className={classes.whiteText}> Info </Typography></TableCell>
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