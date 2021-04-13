import { Badge, Box, Divider, IconButton, InputBase, makeStyles, Typography, withStyles } from '@material-ui/core'
import { Cancel, CancelOutlined, Clear, ShoppingCart } from '@material-ui/icons';
import React from 'react'


const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

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
      borderColor: '',
      color: "white",
      width: 80,
      textAlign: "center",
      fontSize: 26,
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
    itemContainer: {
        backgroundImage: "linear-gradient(to right, rgb(15 22 37 / 67%), rgb(121 121 121 / 68%))",
        color: "white",
        borderRadius: 5
    },
    itemName: {
        color: "white"
    }
}))

function ItemToBeSold(){

    const classes = useStyles()

    return (
        <Box className={classes.itemContainer   } p={1}> 
            <Box className={classes.itemName} p={1} textAlign="center">
                <Typography variant="h6">Hollandia yogurth plain</Typography>
            </Box>
            <Box display="flex" justifyContent="space-around">
                <Box>
                    <Input value="200"/>
                </Box>

                <Divider orientation="vertical" flexItem />


                <Box>
                    <Input value="9" />
                </Box>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="space-around" p={1} >
                <Box display="flex" alignItems="center">
                    <StyledBadge style={{color: "gold"}} badgeContent={9} > 
                        <ShoppingCart />
                    </StyledBadge>
                </Box>

                <Box textAlign="center" >
                    <Typography variant="h6"> ₦1,800 </Typography>
                </Box>

                <Box display="flex" alignItems="center">
                    <IconButton style={{color: "#ff3b3bd1"}}>
                        <Clear /> 
                    </IconButton>
                </Box>
               
            </Box>

            
        </Box>
    )
}

export default ItemToBeSold