
import { Avatar, Box, Button, ButtonBase, Card, CardContent, CircularProgress, Container, Drawer, Fab, FormControl, FormControlLabel, FormLabel, IconButton, InputBase, makeStyles, Radio, RadioGroup, styled, Typography, useMediaQuery, withStyles } from '@material-ui/core'
import { AcUnit, Clear } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized'
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso'
import { itemApi, store } from '../../../../api/admin/item/api'
import { StoreItemsInventoryProvider } from '../../../../context/admin/store_item_inventory/StoreItemsInventory'
import ItemList from '../audit_item/audit_mode/ItemList'
import FixedBar from './FixedBar'
import ItemInventory from './ItemInventory'
import StoreInventory from './StoreInventory'
import { green } from '@material-ui/core/colors';
import Restocker from './Restocker'
import InventorySnackBar from './InventorySnackBar'
import BarcodeRestocker from './barcode/BarcodeRestocker'
import StockTaker from './StockTaker'




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
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
      },
      list: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",     
      },

      itemContainer: {
        backgroundColor: "#000000",
        color: "white",
        borderRadius: 9,
        marginTop: theme.spacing(2),
     
      
        [theme.breakpoints.up('lg')]: {
          width: "",
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
        },
        [theme.breakpoints.down('md')]: {
          width: "",
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
          
        },
        [theme.breakpoints.down('sm')]: {
          width: "100%",
          marginLeft: theme.spacing(0),
          marginRight: theme.spacing(0),
          
          
        },

      },
      small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
      },

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

function StoreItemsInventory(){
    const classes = useStyles()
    const [drawerOpened, setDrawerOpened]  = useState(false)
    const [currentAction, setCurrentAction] = useState(null)
    const [inputBoxDisabled, setInputBoxDisabled] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const [loadingButton, setLoadingButton] = useState(false)
    const [inventoryType, setInventoryType] = useState('store')
    const [items, setItems] = useState([])
    const matches = useMediaQuery('(max-width:600px)')
    const [itemId, setItemId] = useState('')
    const [itemName, setItemName] = useState('')
    const [q_value, setQ_Value] = useState('')
    const [filteredItems, setFilteredItems] = useState(items)
    const [loading, setLoading] = useState(false);
    const [snackBarOpened, setSnackbarOpened] = useState(false)
    const [taskDone, setTaskDone] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    
    
    const [itemInfo, setItemInfo] = useState({
      name: '',
      quantity: '0',
      inventory_manager: {
        total_goods_quantity: 0,
        total_goods_worth: 0,
        total_goods_cost: 0,
        expected_profit: 0

      },
      quantity_event_trackers: []
    })




    const {storeName} = useParams()
   

    useEffect(() => {

      
      store(storeName).fetchItems().then((response) => {

        console.log(response)
        const {items} = response.data

        setItems(items)
        setFilteredItems(items)
        setCurrentAction('overview')
        setInputBoxDisabled(true)
        setInventoryType(false)
        setDrawerOpened(false)
        

      }).catch((err) => {

        console.log(err)
      })

      
      return ()=> {
        setCurrentAction(null)
        setInputBoxDisabled(true)
        setDrawerOpened(false)
        setItemId('')
        setInputValue('0')
        setInventoryType('store')
        setFilteredItems([])
        setItemName('')
        setQ_Value('')
        
      }

    }, [])


    useEffect(() => {

      if(currentAction === "overview"){
        setInputValue('')
      }else{
        setInputValue('0')
      }

    }, [currentAction])

    const handleDrawerToggle = () => {
      
      setInventoryType(false)
      setDrawerOpened(false)
      setItemId('')
    }


    const actionType = () => {
      let theAction;

      if (currentAction === 'bad_item')
        theAction = "Remove Bad Item"
      else if(currentAction === 'restock')
        theAction = "Restock"
      else if(currentAction === 'stock')
        theAction = "Take Stock"
      else
        theAction = "Track Inventory"
      return theAction
    }


    const performAction = () => {

      console.log("action performed")


      

      if (currentAction === 'overview'){
        setInventoryType('item')
        setDrawerOpened(true)
        
      }else if(currentAction === 'restock'){
        setInventoryType('restocker')
        setDrawerOpened(true)
      }else if(currentAction === 'stock'){
        setInventoryType('take_stock')
        setDrawerOpened(true)
  
      }
     
      
    }

    const launchSnackBar =(s_message, severity, taskDone=false)=> {
      setSnackbarOpened(true)
      setMessage(s_message)
      setSeverity(severity)
      setTaskDone(taskDone)
    }



    


    return (

        <Container >
          <StoreItemsInventoryProvider

            value={{
              drawerOpened,
              setDrawerOpened,
              setInputBoxDisabled,
              inputBoxDisabled,
              currentAction,
              setCurrentAction,
              setInventoryType,
              items,
              setItemId,
              itemId,
              itemInfo,
              setItemInfo,
              setFilteredItems,
              filteredItems,
              loadingButton,
              setLoadingButton,
              itemName,
              items,
              snackBarOpened,
              severity,
              message,
              taskDone,
              setSnackbarOpened,
              setSeverity,
              setMessage,
              setTaskDone,
              launchSnackBar,
              setItemName,
              performAction,
              setItemId,
              

            }}
          
          >

                <Box  height="calc(100vh - 100px)" width="100%" className={classes.box}>
                <FixedBar />
                <InventorySnackBar  />
                <BarcodeRestocker />
                <Drawer
                      
                      variant="temporary"
                      anchor="right"
                      open={drawerOpened}
                      onClose={handleDrawerToggle}
                     
                      ModalProps={{
                        keepMounted: true, // Better open performance on mobile. Please tell me and the whole peopole  Please tell me and you to take from the bug the inventory i will try to make th
                      }}
                    >
                     <Box width={matches ? window.innerWidth : 320}>
                       <Box display="flex" justifyContent="flex-end">
                         <IconButton onClick={() => {handleDrawerToggle()}}>
                            <Clear />
                         </IconButton>
                       </Box>

                       {
                         inventoryType === false ?
                         null : inventoryType === 'store' ?
                         <StoreInventory />
                         : inventoryType === 'item' ? <ItemInventory /> 
                         : inventoryType === 'restocker' ? <Restocker /> : 
                         inventoryType === 'take_stock' ? <StockTaker /> : null
                       }
                       
                     </Box>
                      
                    </Drawer>
                    <VirtuosoGrid
                      totalCount={filteredItems.length}
                      overscan={2}
                    
                      listClassName={classes.list}
                      itemClassName={classes.itemContainer}
                      itemContent={index => {

                        const {id, name, quantity} = filteredItems[index]

                        

                        

                        return (
                          <Box p={1} minWidth={300}  className={classes.itemContainer} >
                            
                            

                            <Box p={1} width="100%" display="flex" justifyContent="center">
                              <Typography style={{color: "green"}}>{quantity}</Typography>
                            </Box>
                            

                            <Box p={1}> 
                              <Typography>  {name} </Typography> 
                            </Box>
                            <Box width="100%"> 
                              
                              
                            </Box>
                           
                            <Box width="100%"> 
                            <div className={classes.wrapper}>
                                <Button
                                variant="contained"
                                color="primary"
                                style={{width: "100%", color: "white", backgroundColor: "#00475dcf"}}
                                disabled={loading}
                                onClick ={() => {
                                       setItemId(id)
                                      
                                      
                                      performAction()
                                      setItemName(name)
                                      
                                }}
                                >
                                {actionType()}
                                </Button>
                               
                            </div> </Box>

                          </Box>
                          
                        )
                      }}
                  
                    />

           
                </Box>
           </StoreItemsInventoryProvider>
                
        </Container>
       
        
    )
}



export default StoreItemsInventory
