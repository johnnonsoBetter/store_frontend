
import { Avatar, Box, Button, ButtonBase, Card, CardContent, Container, Drawer, Fab, FormControl, FormControlLabel, FormLabel, IconButton, InputBase, makeStyles, Radio, RadioGroup, styled, Typography, withStyles } from '@material-ui/core'
import { AcUnit, Clear } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized'
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso'
import { store } from '../../../../api/admin/item/api'
import { StoreItemsInventoryProvider } from '../../../../context/admin/store_item_inventory/StoreItemsInventory'
import ItemList from '../audit_item/audit_mode/ItemList'
import FixedBar from './FixedBar'
import StoreInventory from './StoreInventory'


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
}))

function StoreItemsInventory(){
    const classes = useStyles()
    const [drawerOpened, setDrawerOpened]  = useState(false)
    const [currentAction, setCurrentAction] = useState(null)
    const [inputBoxDisabled, setInputBoxDisabled] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const [inventoryType, setInventoryType] = useState('store')
    const [items, setItems] = useState([])


    const {storeName} = useParams()


    useEffect(() => {

      
      store(storeName).fetchItems().then((response) => {

        console.log(response)
        const {items} = response.data

        setItems(items)
        setCurrentAction('overview')
        setInputBoxDisabled(true)
        setInventoryType('store')
        

      }).catch((err) => {

        console.log(err)
      })

      
      return ()=> {
        setCurrentAction(null)
        setInputBoxDisabled(true)
        setDrawerOpened(false)
        setInputValue('0')
        setInventoryType('store')

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
      setDrawerOpened(!drawerOpened)
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
      }

      
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
            }}
          
          >

                <Box  height="calc(100vh - 100px)" width="100%" className={classes.box}>
                <FixedBar />
                <Drawer
                      
                      variant="temporary"
                      anchor="right"
                      open={drawerOpened}
                      onClose={handleDrawerToggle}
                     
                      ModalProps={{
                        keepMounted: true, // Better open performance on mobile. Please tell me and the whole peopole  Please tell me and you to take from the bug the inventory i will try to make th
                      }}
                    >
                     <Box width={320}>
                       <Box display="flex" justifyContent="flex-end">
                         <IconButton onClick={() => {setDrawerOpened(false)}}>
                            <Clear />
                         </IconButton>
                       </Box>

                       {
                         inventoryType === 'store' ?
                         <StoreInventory />
                         : <Box> Please show the item inventory  </Box>
                       }
                       
                     </Box>
                      
                    </Drawer>
                    <VirtuosoGrid
                      totalCount={items.length}
                      overscan={2}
                    
                      listClassName={classes.list}
                      itemClassName={classes.itemContainer}
                      itemContent={index => {

                        const {name, quantity} = items[index]

                        return (
                          <Box p={1}  className={classes.itemContainer} >
                            
                            <Box width="100%"> 
                              <Input value={inputValue} type="number" disabled={inputBoxDisabled} />
                            </Box>

                            <Box p={1} width="100%" display="flex" justifyContent="center">
                              <Typography style={{color: "green"}}>{quantity}</Typography>
                            </Box>
                            

                            <Box p={1}> 
                              <Typography>  {name} </Typography> 
                            </Box>
                           
                            <Box width="100%"> <Button onClick={performAction} style={{width: "100%", color: "white", backgroundColor: "#00475dcf"}} > {actionType()}</Button> </Box>

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
