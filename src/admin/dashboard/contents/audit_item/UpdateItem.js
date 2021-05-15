import { Box, IconButton, Slide, Typography, TextField, MenuItem, OutlinedInput, InputLabel, InputAdornment, Button, makeStyles, CircularProgress} from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import SaveIcon from '@material-ui/icons/Save'
import {React, useContext, useEffect, useState} from  'react'
import { itemApi } from '../../../../api/admin/item/api'
import AuditModeContext from '../../../../context/audit_item/AuditModeContext'
import { green } from '@material-ui/core/colors';




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


function UpdateItem({...props}){

    const {itemInfo, setItemInfo, setItems, items, snackBarAction, setSnackBarAction, categories} = useContext(AuditModeContext)
    const {toggleUpdate} = props
    const {item, category} = itemInfo
    const {name, barcode, cost_price, selling_price, id} = item
    const [loading, setLoading] = useState(false)
    const classes = useStyles()
    
    const [itemUpdate, setItem] = useState({
        real_item: {
            name: "",
            cost_price: 0,
            selling_price: 0,
            barcode: "",
            category_id: 1,
        }
    })

     useEffect(()=> {
        setItem({
            real_item: {
                name: name,
                cost_price: cost_price,
                selling_price: selling_price,
                barcode: barcode,
                category_id: category['id'],
            }
        })

        return ()=> {
            setItem({
                real_item: {
                    name: "",
                    cost_price: 0,
                    selling_price: 0,
                    barcode: "",
                    category_id: 1,
                }
            })
        }
     }, [name, barcode, cost_price, selling_price, category, id])

    const handleChange = (e) => {
        e.preventDefault()

       
    
        let new_item = Object.assign({}, itemUpdate);  
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
                
            break;
            case "selling_price": 
                new_item['real_item']['selling_price'] = e.target.value
            break;
            case "category": 

                const category = categories.find(category => category.id === e.target.value)            
                new_item['real_item']['category_id'] = category.id
            break;
          
            default: 

        }


        setItem(new_item)
    
        
    
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const newSnackBarAction = Object.assign({}, snackBarAction)
        setLoading(true)
        itemApi().updateItem(name, itemUpdate).then(response => {
            
            const {item, cost_price_trackers, selling_price_trackers, category} = response.data
            
            let itemUpdate = Object.assign({}, itemInfo)
            itemUpdate['item'] = item
            itemUpdate['cost_price_trackers'] = cost_price_trackers
            itemUpdate['selling_price_trackers'] = selling_price_trackers
            itemUpdate['category'] = category
            console.log(response)

            const new_items = items.map((this_item) => (id === this_item.id) ? item : this_item)
           
            newSnackBarAction['itemName'] = item['name']
            newSnackBarAction['action'] = "Updated"
            newSnackBarAction['snackBarOpened'] = true
            newSnackBarAction['taskDone'] = true
            
            console.log(new_items)
            setItems(new_items)

            console.log(newSnackBarAction)
            setItemInfo(itemUpdate)
            toggleUpdate()
            setSnackBarAction(newSnackBarAction)
            setLoading(false)
            

        
        }).catch(err => {

            console.log(err)
           
            newSnackBarAction['itemName'] = item['name']
            newSnackBarAction['action'] = "Updated"
            newSnackBarAction['snackBarOpened'] = true
            newSnackBarAction['taskDone'] = false

            setSnackBarAction(newSnackBarAction)
            setLoading(false)
        })
    }
    

  

    return (
        <Slide direction="left" in={true}  > 
            <Box >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Update Item</Typography>
                    <IconButton onClick={toggleUpdate}>
                        <ArrowBack />
                    </IconButton>
                </Box>
                <Box textAlign="center" m={2}>
                    <Typography variant="h6">{name}</Typography>
                </Box>

                <Box>

                <form  onSubmit={handleSubmit} noValidate autoComplete="off">
                     
                     <Box display="flex" m={1} justifyContent="center">
                         <Box m={1}> 
                             <TextField id="outlined-basic" name="name" label="Name" variant="outlined"  value={itemUpdate['real_item'].name} onChange={handleChange}/>
                         </Box>

                         <Box m={1}>
                             <TextField id="outlined-basic" name="barcode"  label="Barcode" variant="outlined"  value={itemUpdate['real_item'].barcode} onChange={handleChange}/>
                         </Box>
                     </Box>

                     <Box display="flex" m={1} justifyContent="center">
                            <Box m={1}>
                                <InputLabel htmlFor="outlined-adornment-amount">Cost Price</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    type={"number"}
                                    value={itemUpdate['real_item'].cost_price}
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
                                    value={itemUpdate['real_item'].selling_price}
                                    name="selling_price"
                                    placeholder={0}
                                    onChange={handleChange}
                                    startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                                    
                                />
                            </Box>

                     </Box>

                     <Box m={1} display="flex" justifyContent="center">
                                
                            <TextField
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                
                                name="category"
                                onChange={handleChange}
                                select
                                >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                
                                ))}
                            </TextField>

                     </Box>

                     <Box display="flex" p={3} justifyContent="center" marginTop={1}>
                    

                        <div className={classes.wrapper}>
                                <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={loading}
                                type="submit"
                                startIcon={<SaveIcon />}
                                >
                                Update Item
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                     </Box>

                     
                    
                 </form>

                </Box>


            </Box>

        </Slide>
        
    )

}


export default UpdateItem