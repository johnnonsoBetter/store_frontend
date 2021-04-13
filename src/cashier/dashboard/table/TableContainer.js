import { Box, makeStyles, Typography, Button, Menu, InputBase, MenuItem, withStyles, Badge, IconButton, Avatar, TextField} from '@material-ui/core'
import { Clear, Print, Search, ShoppingCart, ShoppingCartOutlined } from '@material-ui/icons';
import React, { useContext, useState } from 'react'
import DashboardContext from '../../../context/cashier/DashboardContext';
import ItemToBeSoldList from './ItemToBeSoldList';


export const Input = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: '',
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
    square: {
        width: theme.spacing(7)
        
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
    const {counterInfo, setCounterInfo} = useContext(DashboardContext)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    

    return (
        <Box className={classes.root} position="relative">
            <Box className={classes.tableInfoContainer}>
                <Box className={classes.tableInfo}>
                    <Typography > 
                        <StyledBadge  badgeContent={counterInfo['productCount']} color="primary">
                        Products
                        </StyledBadge>    
                     </Typography>
                </Box>
                <Box className={classes.tableInfo}>
                <StyledBadge badgeContent={1} color="secondary">
                    <ShoppingCart />
                </StyledBadge>
                </Box>
                <Box className={classes.tableInfo}>
                <Button disabled={false} style={{backgroundColor: "teal", color: "white"}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    Cash
                </Button>
                <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                    <MenuItem   onClick={handleClick}>Cash</MenuItem>
                    <MenuItem   onClick={handleClick}>Pos</MenuItem>
                    <MenuItem   onClick={handleClick} >Transfer</MenuItem>
                    <MenuItem   onClick={handleClick} >Pos Cashback</MenuItem>
                    <MenuItem   onClick={handleClick}>Transfer Cashback</MenuItem>
                    <MenuItem   onClick={handleClick}>Pos Cash</MenuItem>
                    <MenuItem   onClick={handleClick}>Transfer Cash</MenuItem>
                    <MenuItem   onClick={handleClick}>Pos Transfer</MenuItem>
                </Menu>
                </Box>

                <Box display="flex"  alignItems="center">
                    <Input type="number" placeholder="Discount"/>
                </Box>
            </Box>

            <Box className={classes.tableItemsContainer}>
                <ItemToBeSoldList />
            </Box>
            <Box position="absolute" bottom={20} left={-80} marginTop={3} className={classes.tableActionContainer}>
                <Box  height={160} justifyContent="center"  display="flex" flexDirection="column">

                        <Box  marginBottom={2}>
                            <IconButton>
                                <Avatar className={classes.square} style={{backgroundColor: "green"}} variant="rounded">
                                    <Print />
                                </Avatar>
                            </IconButton>
                        </Box>
                       
                        <Box >
                            <IconButton>
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