import { Badge, Box, Divider, Grow, IconButton, InputBase, makeStyles, Typography, withStyles } from '@material-ui/core'
import { Clear, ShoppingCart } from '@material-ui/icons';
import React, { useContext } from 'react'
import DashboardContext from '../../../context/cashier/DashboardContext';
import AmountFormater from '../../../helpers/AmountFormater';


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

function ItemToBeSold(props){



    const classes = useStyles()
    const {removeItemFromTable,  setItemsToBeSold, itemsToBeSold } = useContext(DashboardContext)
    //const [quantity, setQuantity] = useState('1')
    const {name, price_sold_per_unit, quantity_sold, barcode} = props.item
    
    const totalItemAmount = (price_sold_per_unit * quantity_sold)



    const handleQuantityChange = (e) => {

        const value = e.target.value
        let newitemsToBeSold = null


        if (e.target.name === "quantity_sold"){

            newitemsToBeSold = itemsToBeSold.map((item) => {
                if (item.barcode === barcode){
                    const newItemToBeSold = Object.assign({}, item)
                    newItemToBeSold.quantity_sold = value
                    return newItemToBeSold
                }
    
                return item
            })
        }else{
            newitemsToBeSold = itemsToBeSold.map((item) => {
                if (item.barcode === barcode){
                    const newItemToBeSold = Object.assign({}, item)
                    newItemToBeSold.price_sold_per_unit = value
                    if (item.fixed_price !== parseInt(value)){
                        newItemToBeSold.selling_price_was_altered = true
                    }else{
                        newItemToBeSold.selling_price_was_altered = false
                    }
                    
                    return newItemToBeSold
                }
    
                return item
            })
        }


        setItemsToBeSold(newitemsToBeSold)

    }

    return (
        <Grow in={true}>
            <Box className={classes.itemContainer   } p={1}> 
            <Box className={classes.itemName} p={1} textAlign="center">
                <Typography variant="h6">{name} </Typography>
            </Box>
            <Box display="flex" justifyContent="space-around">
                <Box>
                    <Input  onChange={handleQuantityChange} value={price_sold_per_unit} name="price_sold_per_unit" />
                </Box>

                <Divider orientation="vertical" flexItem />


                <Box>
                    <Input onChange={handleQuantityChange} name="quantity_sold" value={quantity_sold} />
                </Box>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="space-around" p={1} >
                <Box display="flex" alignItems="center">
                    <StyledBadge style={{color: "gold"}} badgeContent={quantity_sold} > 
                        <ShoppingCart />
                    </StyledBadge>
                </Box>

                <Box textAlign="center" >
                    <Typography variant="h6"> ₦{AmountFormater(totalItemAmount).amount()} </Typography>
                </Box>

                <Box display="flex" alignItems="center">
                    <IconButton onClick={()=> {removeItemFromTable(props.item)}} style={{color: "#ff3b3bd1"}}>
                        <Clear /> 
                    </IconButton>
                </Box>
               
            </Box>

            
        </Box>

        </Grow>
        
    )
}

export default ItemToBeSold