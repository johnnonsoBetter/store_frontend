
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardContext from '../../context/cashier/DashboardContext';
import { Avatar, Box, Button, Menu, MenuItem } from '@material-ui/core';
import { cashierApi } from '../../api/cashier/activity/api';
import { useHistory } from 'react-router-dom';

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
}));


// <Box style={style} className={classes.item}> 
// <Card className={classes.item}>
//     <ButtonBase style={{width: "100%"}} onClick={()=> {
        
//  }}>
//        <CardContent style={{padding: "0" , width: "100%"}}>
//              <Box display="flex" p={1} justifyContent="space-between" style={{backgroundColor: "#002142"}}>
            
//                  <Typography  > {product.name} </Typography>
//             </Box>

//              <Box p={2} style={{backgroundColor: "#0A0B0C"}} >
//              <Typography variant="h5" style={{color: "#DEC429"}}> ₦{AmountFormater(product.selling_price).amount() } </Typography>
//              </Box>
//        </CardContent>
//      </ButtonBase>
//  </Card> 
// </Box>




export default function CashierAppBar() {
  const classes = useStyles();
  const {toggleDrawer} = useContext(DashboardContext)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = ()=> {

    cashierApi().logout()
    .then((response) =>{
        localStorage.removeItem('cashier')
        history.push("/cashier_dashboard")
      }).catch(err => {
        console.log(err)
      })
  
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.header} position="static">
        <Toolbar variant="dense">
          <IconButton onClick={toggleDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Store
          </Typography>
          <Box width="100%" display="flex" justifyContent="flex-end">
            

            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <Avatar className={classes.small} > B </Avatar>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}