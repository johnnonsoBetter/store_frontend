import {React, useState, useContext} from 'react'
import {Box, Drawer, InputAdornment, InputLabel, OutlinedInput, TextField, Button, MenuItem, Typography, IconButton, useMediaQuery, makeStyles} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import AuditModeContext from '../../../../context/audit_item/AuditModeContext'
import { itemApi } from '../../../../api/admin/item/api'
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';



  

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
      },
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
                new_item['real_item']['name'] = `${e.target.value}`
                
            break;
            case "barcode": 
                new_item['real_item']['barcode'] = `${e.target.value}`
            break;
            case "cost_price": 
                new_item['real_item']['cost_price'] = e.target.value
                console.log(e.target)
            break;
            case "selling_price": 
                new_item['real_item']['selling_price'] = e.target.value
            break;
            case "category": 
                
                new_item['real_item']['category_id'] = e.target.value
            break;
            case "upright":
                new_item['create_item']['upright']['quantity'] = e.target.value
                
            break;
            case "dechoice":
                new_item['create_item']['dechoice']['quantity'] = e.target.value
            break;
            case "warehouse":
                new_item['create_item']['warehouse']['quantity'] = e.target.value
            break;
            default: 

    
        }
    
        setItem(new_item)
    
    }



    const [item, setItem] = useState({
        real_item: {
            name: "",
            cost_price: 0,
            selling_price: 0,
            barcode: "",
            category_id: 1,
        },
        create_item: {
            upright: {
                name: "upright",
                quantity: 0
            }, 
            dechoice: {
                name: "dechoice",
                quantity: 0
            },
            warehouse: {
                quantity: 0
            }
        },
    })


    const handleSubmit = (e)=> {
        e.preventDefault()
        const newSnackBarAction = Object.assign({}, snackBarAction)
        setLoading(true)
        itemApi().createItem(item).then(response => {
            
            const new_item = response.data
            
            newSnackBarAction['itemName'] = item['real_item'].name
            newSnackBarAction['action'] = "Created"
            newSnackBarAction['snackBarOpened'] = true
            newSnackBarAction['taskDone'] = true
           
            let new_items = [...items, new_item['item']]
            let totalItems = new_items.length
            
            // setItemName(item['real_item'].name)
            setItems(new_items)
            setTotalItems(totalItems)
            setSnackBarAction(newSnackBarAction)
            setItem({
                real_item: {
                    name: "",
                    cost_price: 0,
                    selling_price: 0,
                    barcode: "",
                    category_id: 1,
                },
                create_item: {
                    upright: {
                        name: "upright",
                        quantity: 0
                    }, 
                    dechoice: {
                        name: "dechoice",
                        quantity: 0
                    },
                    warehouse: {
                        quantity: 0
                    }
                },
            })
            setLoading(false)
            
           
            
        }).catch(err => {
            newSnackBarAction['itemName'] = item['real_item'].name
            newSnackBarAction['action'] = "Created"
            newSnackBarAction['snackBarOpened'] = true
            newSnackBarAction['taskDone'] = false
            setSnackBarAction(newSnackBarAction)
            setLoading(false)
            
        })
    }

  
    const clearItemState = () => {
        let cleared_item = Object.assign({}, item)

        cleared_item['real_item'] = {
            name: "",
            cost_price: 0,
            selling_price: 0,
            barcode: "",
            category_id: 1,
        }

        cleared_item['create_item'] = {
            upright: {
                name: "upright",
                quantity: 0
            }, 
            dechoice: {
                name: "dechoice",
                quantity: 0
            },
            warehouse: {
                quantity: 0
            }
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
                                <TextField  id="outlined-basic" name="name" label="Name" variant="outlined" onChange={handleChange} value={item['real_item'].name}/>
                            </Box>

                            <Box m={1}>
                                <TextField id="outlined-basic" name="barcode"  label="Barcode" variant="outlined" onChange={handleChange} value={item['real_item'].barcode}/>
                            </Box>
                        </Box>

                        <Box display="flex" m={1} justifyContent="center">
                            <Box m={1}>
                                <InputLabel htmlFor="outlined-adornment-amount">Cost Price</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    type={"number"}
                                    value={item['real_item'].cost_price}
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
                                    value={item['real_item'].selling_price}
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
                                <InputLabel htmlFor="outlined-adornment-amount">Upright</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    type="number"
                                    value={item['create_item']['upright'].quantity}
                                    onChange={handleChange}
                                    name="upright"
                                    
                                />
                            
                            
                            </Box>

                            <Box m={1}>
                                <InputLabel htmlFor="outlined-adornment-amount">Dechoice</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    type="number"
                                    value={item['create_item']['dechoice'].quantity}
                                    onChange={handleChange}
                                    name="dechoice"
                                    
                                />
                            
                            
                            </Box>

                            <Box m={1}>
                                <InputLabel htmlFor="outlined-adornment-amount">Store</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    type="number"
                                    value={item['create_item']['warehouse'].quantity}
                                    onChange={handleChange}
                                    name="warehouse"
                                    
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