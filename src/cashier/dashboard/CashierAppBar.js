
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardContext from '../../context/cashier/DashboardContext';
import { Avatar, Box, Button, CircularProgress, InputBase, Menu, MenuItem } from '@material-ui/core';
import { cashierApi } from '../../api/cashier/activity/api';
import { useHistory } from 'react-router-dom';
import { Cached, Cancel, Check } from '@material-ui/icons';
import MovingText from 'react-moving-text'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#060423",
    borderRadius: 5
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  header: {
    backgroundColor: "#060423",
    borderRadius: 5
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: "orange",
    color: "black"
  },
  storeName: {
    textTransform: "capitalize"
  },
  salesLoader: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  }
}));


export const Input = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
  
    position: 'relative',
    borderBottom: "1px solid wheat",
    borderColor: 'orange',
    color: "wheat",
    width: 200,
    fontSize: 16,
    padding: '1px 10px 5px 7px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Kanit',
      'cursive',
    ].join(','),
    '&:focus': {
     
      
      
    },
  },
}))(InputBase);




export default function CashierAppBar() {
  const classes = useStyles();
  const {toggleDrawer, storeInfo, setProducts, products, setFilteredProducts} = useContext(DashboardContext)
  const [filterValue, setFilterValue] = useState('')
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory()
  const cashierAvatarL = JSON.parse(localStorage.cashier)['name'].charAt(0)
  const [indicatorLoading, setIndicatorLoading] = useState(false)
  const [refetchFailed, setRefetchFailed] = useState(false)

  useEffect(() => {
    setIndicatorLoading(false)
    setRefetchFailed(false)


    return ()=> {
      setIndicatorLoading(false)
      setRefetchFailed(false)
    }
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = ()=> {

    cashierApi().logout()
    .then((response) =>{
        localStorage.removeItem('cashier')
        history.push("/cashier_dashboard")
      }).catch(err => {
        console.log(err)
      })
  
  }

  const handleSubmit = (e)=> {

    e.preventDefault()
    const newFilteredProducts = [...products].filter((product) => product.name.toLowerCase().includes(filterValue.toLowerCase()) || product.barcode.toLowerCase().includes(filterValue.toLowerCase()) ) 
    
    if (newFilteredProducts.length !== 0){
      setFilterValue('')
    }
    setFilteredProducts(newFilteredProducts)
   
  }
  
  return (
    <div className={classes.root}>
      <AppBar className={classes.header} position="static">
        <Toolbar variant="dense">
          <IconButton onClick={toggleDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.storeName} color="inherit">
            {storeInfo['name']}
          </Typography>

          
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Box marginLeft={6} display="flex" >
                  <Input placeholder="Item name or code ?" value={filterValue} onChange={(e) => {
                      e.preventDefault()

                      setFilterValue(e.target.value)

                      if (e.target.value === ""){
                        setFilteredProducts(products)
                      }
                  }} />
                </Box>
              </form>

              <Box width="10%" display="flex" marginLeft={0} display="flex" justifyContent="center" marginLeft={5}>
                <IconButton onClick={()=> {
                    setIndicatorLoading(true)
                    cashierApi().fetchStoreResource().then(response => {
                              
                      const {items} = response.data
                      setProducts(items)
                      setFilteredProducts(items)
                      setRefetchFailed(false)
                      setIndicatorLoading(false)
                      
                      

                    }).catch(err => {
                      console.log(err)
                      setIndicatorLoading(false)
                      setRefetchFailed(true)
                    })


                }} size="small" style={{backgroundColor: "#0a4ea2f7", color: "white"}}>
                  <Cached />
                </IconButton>
              </Box>
                

              {/*  <Box  width="80%">
                  <MovingText
                    type="bounce"
                    duration="1000ms"
                    delay="0s"
                    direction="normal"
                    timing="ease"
                    iteration="infinite"
                    fillMode="none">
                      <Typography variant="h6"> Please Request .. For Your Receipt!</Typography>
                  </MovingText>

                 
                 
                </Box> 

                <Box  width="80%">
                  <MovingText
                    type="bounce"
                    duration="1000ms"
                    delay="0s"
                    direction="normal"
                    timing="ease"
                    iteration="infinite"
                    fillMode="none">
                      <Typography style={{backgroundColor: "red"}} variant="h6"> Please Request .. For Your Receipt!</Typography>
                  </MovingText>

                 
                 
                </Box> */}
                <>
                {
                  indicatorLoading ? 
                  <Box width="50%" justifyContent="center" className={classes.salesLoader}>
                    <CircularProgress size={24} />
                  
                  </Box>
                  : 
                  refetchFailed ? 
                  <Box width="50%" justifyContent="center" className={classes.salesLoader} s>
                    <Cancel style={{color: "red"}} />
                  </Box> :
                  <Box width="50%" justifyContent="center" className={classes.salesLoader} s>
                    <Check style={{color: "green"}} />
                  </Box>
                }
                </>
                
          <Box width="100%" display="flex" justifyContent="flex-end">
            

            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <Avatar className={classes.small} > {cashierAvatarL} </Avatar>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}