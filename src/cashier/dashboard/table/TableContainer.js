import { Box, makeStyles, Typography, Button, Menu, InputBase, MenuItem, withStyles, Badge, IconButton, Avatar, TextField} from '@material-ui/core'
import { Clear, Print, Search, ShoppingCart, ShoppingCartOutlined } from '@material-ui/icons';
import React, { useState } from 'react'


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
      border: '1px solid #ced4da',
      borderColor: 'orange',
      color: "black",
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
        backgroundColor: "grey",
        padding: theme.spacing(1)
    },
    tableItemsContainer: {
        backgroundColor: "green",
        height: "calc(100vh - 170px)",
        overflowY: 'auto'
    }, 
    tableActionContainer: {
        backgroundColor: "red"
    }
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
                        <StyledBadge  badgeContent={1} color="primary">
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

            </Box>
            <Box p={2} position="absolute" bottom={0} left={-70} marginTop={3} className={classes.tableActionContainer}>
                <Box display="flex" flexDirection="column">

                    <Avatar variant="square">
                        <IconButton>
                            <Clear />
                        </IconButton>
                    </Avatar>

                    <Avatar variant="square">
                        <IconButton>
                           <Print />
                        </IconButton>
                    </Avatar>

                   

                  

                </Box>
            </Box>
        
        </Box>
    )
}

export default TableContainer