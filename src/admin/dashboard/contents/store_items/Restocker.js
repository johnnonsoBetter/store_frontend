import { Box, Button, CircularProgress, InputBase, makeStyles, Typography, withStyles } from '@material-ui/core'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { green } from '@material-ui/core/colors';
import StoreItemsInventory from '../../../../context/admin/store_item_inventory/StoreItemsInventory';
import { store } from '../../../../api/admin/item/api';
import { useParams } from 'react-router-dom';


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
      borderColor: '#a0a0a0a1',
      color: "#e0bb30",
      fontSize: 16,
      width: 100,
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

function Restocker(){

  const classes = useStyles()
  const [input, setInput] = useState('')
  const {loadingButton, setLoadingButton,setInventoryType, setDrawerOpened, itemName, launchSnackBar, items, setFilteredItems } = useContext(StoreItemsInventory)
  const {storeName} = useParams()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoadingButton(true)

    store(storeName).restockItem(itemName, parseInt(input)).then((response) => {

      const newFilteredItems = items.map(item => {

        if (item.name === itemName){
          const quantity = item.quantity + parseInt(input)
          item.quantity = quantity
          return item
        }
        return item
      })
      setLoadingButton(false)
      setInput('')
      setInventoryType(false)
      setDrawerOpened(false)
      setFilteredItems(newFilteredItems)
      launchSnackBar(`${parseInt(input)} ${itemName} Added`, 'success', 'success')

    }).catch(err => {
     
      setLoadingButton(false)
      launchSnackBar(`${parseInt(input)} ${itemName} Failed To Be Added`, 'primary', false)
    })
  }

  const handleChange = (e) => {

    e.preventDefault()
    setInput(e.target.value)
  }



    return (
        <Box>
            <Box textAlign="center"> 
                <Typography variant="h6"> Restock </Typography>
                <Box p={1}>
                    <Typography variant="h6"> {itemName} </Typography>
                </Box>
                <Box>
                    <form autoComplete={false} onSubmit={handleSubmit}>
                        <Box>
                            <Input onChange={handleChange} value={input} type="number"  autoFocus={true}/>
                            <div className={classes.wrapper}>
                                <Button
                                variant="contained"
                                color="primary"
                                
                                disabled={loadingButton}
                                type="submit"
                                >
                                Restock
                                </Button>
                                {loadingButton && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                        </Box>

                    </form>
                    
                
                </Box>
                
            </Box>
        </Box>

    )
}


export default Restocker