import {React, useState, useContext} from 'react'
import {Box, Drawer, InputAdornment, InputLabel, OutlinedInput, TextField, Button, MenuItem, Typography, IconButton, useMediaQuery, makeStyles, withStyles, InputBase} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import AuditModeContext from '../../../../context/audit_item/AuditModeContext'
import { itemApi } from '../../../../api/admin/item/api'
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';




 const Input = withStyles((theme) => ({
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
      borderColor: '#a0a0a0a1',
      color: "black",
      height: "42px",
      fontSize: 16,
      padding: '7px 10px 5px 7px',
      borderRadius: 5,
      textTransform: "capitalize",
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
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
      },
      buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
      },
      fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
      },
      buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      }
}))

function CreateItem(){

    const matches = useMediaQuery('(min-width:600px)')
    const {items, setItems, setTotalItems, setSnackBarAction, categories} = useContext(AuditModeContext)
    const {snackBarAction} = useContext(AuditModeContext).snackBarAction
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        e.preventDefault()
    
        let new_item = Object.assign({}, item);  
        const field_name = e.target.name
        switch(field_name){
            case "name":
                new_item['item']['name'] = `${e.target.value}`
                
            break;
            case "barcode": 
                new_item['item']['barcode'] = `${e.target.value}`
            break;
            case "cost_price": 
                new_item['item']['cost_price'] = e.target.value
                console.log(e.target)
            break;
            case "selling_price": 
                new_item['item']['selling_price'] = e.target.value
            break;
            case "category": 
                
                new_item['item']['category_id'] = e.target.value
            break;
            case "quantity":
                new_item['item']['quantity'] = e.target.value
                
            break;
           
            default: 

    
        }
    
        setItem(new_item)
    
    }



    const [item, setItem] = useState({
        item: {
            name: "",
            cost_price: 0,
            selling_price: 0,
            barcode: "",
            category_id: 1,
            quantity: 0,
        },
    })


    const handleSubmit = (e)=> {
        e.preventDefault()
        const newSnackBarAction = Object.assign({}, snackBarAction)
        setLoading(true)
        itemApi().createItem(item).then(response => {
            
            const new_item = response.data
            console.log(new_item)
            newSnackBarAction['itemName'] = item['item'].name
            newSnackBarAction['action'] = "Created"
            newSnackBarAction['snackBarOpened'] = true
            newSnackBarAction['taskDone'] = true
           
            let new_items = [...items, new_item['item']]
            let totalItems = new_items.length
            
            setItems(new_items)

            setTotalItems(totalItems)
            setSnackBarAction(newSnackBarAction)
            setItem({
                item: {
                    name: "",
                    cost_price: 0,
                    selling_price: 0,
                    barcode: "",
                    category_id: 1,
                    quantity: 0,
                },
                
            })
            setLoading(false)
            
           
            
        }).catch(err => {
            newSnackBarAction['itemName'] = item['item'].name
            newSnackBarAction['action'] = "Created"
            newSnackBarAction['snackBarOpened'] = true
            newSnackBarAction['taskDone'] = false
            setSnackBarAction(newSnackBarAction)
            setLoading(false)
            
        })
    }

  
    const clearItemState = () => {
        let cleared_item = Object.assign({}, item)

        cleared_item['item'] = {
            name: "",
            cost_price: 0,
            selling_price: 0,
            barcode: "",
            category_id: 1,
            quantity: 0,
        }

        setItem(cleared_item)

    }

    const [drawerOpened, setDrawerOpened] = useState(false)
    const classes = useStyles()
    

    return (
        <>
         <IconButton  aria-label="add to shopping cart" onClick = {() => {
                
                setDrawerOpened(true)
                clearItemState()
            
            }
              


                }>
                <AddShoppingCartIcon style={{color: "hsl(31deg 90% 44% / 96%)"}}/>
            </IconButton>

        <Drawer  p={2} anchor="right" open={drawerOpened} >
                
                <Box width={matches ? 365 : "100%"}  p={2}>
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton onClick={() => setDrawerOpened(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box m={2}>
                        <Typography variant="h5"> Create Item</Typography>
                    </Box>
                    <form onSubmit={handleSubmit}  noValidate autoComplete="off">
                     
                        <Box display="flex"  m={1} justifyContent="center">
                            <Box m={1} > 
                                <Input name="name"placeholder="Name" variant="outlined" onChange={handleChange} value={item['item'].name} />
                            </Box>

                            <Box m={1}>
                                <Input id="outlined-basic" name="barcode" placeholder="Barcode"  label="Barcode" variant="outlined" onChange={handleChange} value={item['item'].barcode} />

                            </Box>
                        </Box>

                        <Box display="flex" m={1} justifyContent="center">
                            <Box m={1}>
                                <InputLabel htmlFor="outlined-adornment-amount">Cost Price</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    type={"number"}
                                    value={item['item'].cost_price}
                                    name="cost_price"
                                    onChange={handleChange}
                                    placeholder={0}
                                    startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                                    
                                />
                            </Box>


                            <Box m={1}>
                                <InputLabel htmlFor="outlined-adornment-amount">Selling Price</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    type={"number"}
                                    value={item['item'].selling_price}
                                    name="selling_price"
                                    placeholder={0}
                                    onChange={handleChange}
                                    startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                                    
                                />
                            </Box>
                            


                        
                        </Box>
           
                        <Box display="flex" m={1} justifyContent="center">
                            
                            <Box m={1}>
                                <TextField
                                    
                                    select
                                    labelWidth={70}
                                    label="Category"
                                    
                                    name="category"
                                    onChange={handleChange}
                                    variant="outlined"
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    
                                    ))}
                                    
                                </TextField>

                                
                            </Box>

                            
                        </Box>

                        <Box display="flex" m={1} justifyContent="center">
                            <Box m={1}>
                                <InputLabel htmlFor="outlined-adornment-amount">Quantity</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    type="number"
                                    value={item['item'].quantity}
                                    onChange={handleChange}
                                    name="quantity"
                                    
                                />
                            
                            
                            </Box>

                           
                        </Box>

                        <Box display="flex"  m={1} justifyContent="center">

                            <Box m={1}>
                            <div className={classes.wrapper}>
                                <Button
                                variant="contained"
                                color="primary"
                                
                                disabled={loading}
                                type="submit"
                                >
                                Create Item
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                            </Box>               
                        </Box>
                       
                    </form>

                </Box>
            
            </Drawer>
        </>
    )
}

export default CreateItem