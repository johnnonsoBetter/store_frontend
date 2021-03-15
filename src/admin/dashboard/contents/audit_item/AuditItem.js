import { Box, Drawer, IconButton, makeStyles, Switch, TextField, useMediaQuery, InputAdornment, InputLabel, OutlinedInput, MenuItem, Button, Typography} from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCartRounded'
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import React, { useState } from 'react'
import AuditMode from './audit_mode/AuditMode'
import NoAuditMode from './no_audit_mode/NoAuditMode'

const value = (input) => (input === "true" ? true : false) 

const useStyles = makeStyles((theme) => ({
    create: {

    }
    ,
    textField: {
        width: '25ch',
    },
}))



function AuditItem(){

    const storedMode = localStorage.getItem('audit')
    //{real_item: {name: "zee soap", cost_price: 80, selling_price: 150, barcode: "897738384", category_id: @category.id},  
    //create_item: {upright: {name: "upright", quantity: 3}, dechoice: {name: "dechoice", quantity: 4}, warehouse: {quantity: 6}}
    const matches = useMediaQuery('(min-width:600px)')



    const handleChange = (e) => {
        e.preventDefault()
    
        let new_item = Object.assign({}, item);  
        const field_name = e.target.name
        switch(field_name){
            case "name":
                new_item['real_item']['name'] = e.target.value
            break;
            case "barcode": 
                new_item['real_item']['barcode'] = e.target.value
            break;
            case "cost_price": 
                new_item['real_item']['cost_price'] = e.target.value
                console.log(e.target)
            break;
            case "selling_price": 
                new_item['real_item']['selling_price'] = e.target.value
            break;
            case "category": 
                console.log(e.target.value)
                new_item['real_item']['category_id'] = e.target.value
            break;
            case "upright":
                new_item['create_item']['upright'] = e.target.value
            break;
            case "dechoice":
                new_item['create_item']['dechoice'] = e.target.value
            break;
            case "warehouse":
                new_item['create_item']['warehouse'] = e.target.value
            break;
            default: 

    
        }
    
        setItem(new_item)
    
    }


    

    const categories = [
        {
            id: 1,
            name: "Beverages"
        },
        {
            id: 2,
            name: "Hair Products"
        },
        {
            id: 3,
            name: "Hot Drinks And Wine"
        }
    ]

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

        console.log(item)

        
        axios({
            method: "POST",
            url: 'http://localhost:3001/api/v1/real_items',
            headers: JSON.parse(localStorage.admin),
            data: item
            
        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }
   
    if (storedMode === null) {
        localStorage.setItem('audit', false)
    }

    const [auditMode, setAuditMode] = useState(value(localStorage.getItem('audit')))
    const [drawerOpened, setDrawerOpened] = useState(false)
   
    const classes = useStyles()

   
    const categoryName = categories.find((cat) => cat.id == item['real_item']['category_id']).name

    console.log(categoryName)
 
    
    return (
            <div>
           <Switch checked={value(storedMode)} onChange={(e) => {
               setAuditMode(e.target.checked)
               
               localStorage.setItem('audit', e.target.checked)
           }}/>

            <IconButton  aria-label="add to shopping cart" onClick = {() => {
                
                setDrawerOpened(true)
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
              


                }>
                <AddShoppingCartIcon />
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
                    <form onSubmit={handleSubmit} className={classes} noValidate autoComplete="off">
                     
                        <Box display="flex" m={1} justifyContent="center">
                            <Box m={1}> 
                                <TextField id="outlined-basic" name="name" label="Name" variant="outlined" onChange={handleChange} value={item['real_item'].name}/>
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
                                    type="number"
                                    value={item['real_item'].cost_price}
                                    name="cost_price"
                                    onChange={handleChange}
                                    placeholder={0}
                                    startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                                    labelWidth={100}
                                />
                            </Box>


                            <Box m={1}>
                                <InputLabel htmlFor="outlined-adornment-amount">Selling Price</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    type="number"
                                    value={item['real_item'].selling_price}
                                    name="selling_price"
                                    placeholder={0}
                                    onChange={handleChange}
                                    startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                                    labelWidth={100}
                                />
                            </Box>
                            


                        
                        </Box>
           
                        <Box display="flex" m={1} justifyContent="center">
                            
                            <Box m={1}>
                                <TextField
                                    
                                    select
                                    labelWidth={70}
                                    label="Category"
                                    value={categoryName}
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
                                    labelWidth={100}
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
                                    labelWidth={100}
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
                                    labelWidth={100}
                                />
                            
                            
                            </Box>
                        </Box>

                        <Box display="flex"  m={1} justifyContent="center">
                            <Box m={1}>
                                <Button style={{backgroundColor: "#04044ee0", color: "white"}} type="submit" > Create Item</Button>
                            </Box>               
                        </Box>
                       
                    </form>

                </Box>
            
            </Drawer>
            <Box>   
               {auditMode ? <AuditMode /> :  <NoAuditMode />  }
          
            </Box>


        

        
       </div>
    )
}

export default AuditItem