import { Box, makeStyles, Typography, Button, Menu, InputBase, MenuItem, withStyles, Badge, IconButton, Avatar, TextField, Popper, Fade, Paper, Grow} from '@material-ui/core'
import { Clear, Print, Search, ShoppingCart, ShoppingCartOutlined } from '@material-ui/icons';
import React, { useContext, useState } from 'react'
import DashboardContext from '../../../context/cashier/DashboardContext';
import ItemToBeSoldList from './ItemToBeSoldList';



export const TransactionCashInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: '',
      border: '2px solid #ced4da',
      borderColor: 'orange',
      color: "white",
      width: 80,
      textAlign: "center",
      fontSize: 16,
      padding: '7px 10px 5px 7px',
      borderRadius: 5,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        'Kanit',
        'cursive',
      ].join(','),
      '&:focus': {
        borderRadius: 5,
        
        
      },
    },
  }))(InputBase);

export const Input = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      border: '0px solid #ced4da',
      borderColor: 'orange',
      color: "white",
      width: 80,
      fontSize: 16,
      padding: '7px 10px 5px 7px',
      borderRadius: 5,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        'Kanit',
        'cursive',
      ].join(','),
      '&:focus': {
        borderRadius: 5,
        
        
      },
    },
  }))(InputBase);

 


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    popper: {
        width: 500
    },
    tableInfo: {
      
        color: "white",
     
    },
    tableInfoContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: "#050310",
        padding: theme.spacing(1)
    },
    tableItemsContainer: {
        backgroundColor: "",
        height: "calc(100vh - 170px)",
        overflowY: 'auto',
        padding: theme.spacing(2)
    }, 
    tableActionContainer: {
        backgroundColor: "#1b1b1b",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    
}))


const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);



function TableContainer(){
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const {counterInfo, clearAllItemsOnCounter, setCounterInfo} = useContext(DashboardContext)
    const [inputOpened, setInputOpened] = useState(false)

    const {discount, setDiscount, setTransactionAmount, transactionAmount, transactionType, setTransactionType} = useContext(DashboardContext)
  


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
       
    };

    const handleTransactionType = (type)=> {

        console.log(type)
        setTransactionType(type)
        setAnchorEl(null)
    }


    
    const handleClose = () => {
         setAnchorEl(null);
    };

    const handleChange = (e) => {
        e.preventDefault()
        setDiscount(e.target.value)
       
    }
    

    return (
        <Box className={classes.root} position="relative">

             {
                 inputOpened &&
                 <Grow in={true}>
                    <Box position="absolute" top={-50} left="50%" p={1}>
                        <TransactionCashInput />
                    </Box>
                 </Grow> 
                 
             }
            
            <Box className={classes.tableInfoContainer}>
                <Box className={classes.tableInfo}>
                    <Typography > 
                        <StyledBadge  badgeContent={counterInfo['productCount']} color="primary">
                            Products
                        </StyledBadge>    
                     </Typography>
                </Box>
                <Box className={classes.tableInfo}>
                <StyledBadge badgeContent={counterInfo['itemsSoldCount']} color="secondary">
                    <ShoppingCart />
                </StyledBadge>
                </Box>
                <Box className={classes.tableInfo}>

                    <Button disabled={false} style={{backgroundColor: "teal", color: "white"}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        {transactionType}
                    </Button>
                    <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                        <MenuItem   onClick={()=> {
                            handleTransactionType("cash")
                            setInputOpened(false)
                        }}>Cash</MenuItem>
                        <MenuItem   onClick={()=> {
                            handleTransactionType("pos")
                            setInputOpened(false)
                        }}>Pos</MenuItem>
                        <MenuItem   onClick={()=> {
                            handleTransactionType("transfer")
                            setInputOpened(false)
                        }} >Transfer</MenuItem>
                        <MenuItem   onClick={()=> {
                            handleTransactionType("pos_cashback")
                            setInputOpened(true)
                        }} >Pos Cashback</MenuItem>
                        <MenuItem   onClick={()=> {
                            handleTransactionType("transfer_cashback")
                            setInputOpened(true)
                        }}>Transfer Cashback</MenuItem>
                        <MenuItem   onClick={()=> {
                            handleTransactionType("pos_cash")
                            setInputOpened(true)
                        }}>Pos Cash</MenuItem>
                        <MenuItem   onClick={()=> {
                            handleTransactionType("transfer_cash")
                            setInputOpened(true)
                        }}>Transfer Cash</MenuItem>
                        <MenuItem   onClick={()=> {
                            handleTransactionType("pos_transfer")
                            setInputOpened(false)
                        }}>Pos Transfer</MenuItem>
                    </Menu>
                </Box>

                <Box display="flex"  alignItems="center">
                    <Input onChange={handleChange} value={discount}  type="number" placeholder="Discount"/>
                </Box>
            </Box>

            <Box className={classes.tableItemsContainer}>
                <ItemToBeSoldList />
            </Box>
            <Box position="absolute" bottom={20} left={-80} marginTop={3} className={classes.tableActionContainer}>
                <Box  height={100} justifyContent="center"  display="flex" flexDirection="column">
                        <Box >
                            <IconButton onClick={clearAllItemsOnCounter}>
                                <Avatar className={classes.square} style={{backgroundColor: "red"}} variant="rounded">
                                    <Clear />
                                </Avatar>
                            </IconButton>

                        </Box>

                </Box>
            </Box>
        
        </Box>
    )
}

export default TableContainer