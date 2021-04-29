
import { Box, Button, ButtonBase, Card, CardContent, Container, Drawer, Fab, FormControl, FormControlLabel, FormLabel, InputBase, makeStyles, Radio, RadioGroup, styled, Typography, withStyles } from '@material-ui/core'
import { AcUnit } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized'
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso'
import { StoreItemsInventoryProvider } from '../../../../context/admin/store_item_inventory/StoreItemsInventory'
import ItemList from '../audit_item/audit_mode/ItemList'
import FixedBar from './FixedBar'


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
        backgroundColor: "green",
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

      }
}))

function StoreItemsInventory(){
    const classes = useStyles()
    const items = [{name: "chicken"}, {name: "noodles"}, {name: "noodles"}, {name: "noodles"}, {name: "Milk"}, {name: "Timer"}, {name: "Wind"}]
    const [drawerOpened, setDrawerOpened]  = useState(false)
    const [currentAction, setCurrentAction] = useState(null)


    useEffect(() => {

      setCurrentAction('info')

      return ()=> {
        setCurrentAction(null)
      }

    }, [currentAction])

    const handleDrawerToggle = () => {
      setDrawerOpened(!drawerOpened)
    }


    return (

        <Container >
          <StoreItemsInventoryProvider

            value={{
              drawerOpened,
              setDrawerOpened,
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
                       <Typography> Please let all the same people and the whole time when we are going to start to add some permutation to take from the whole </Typography>
                     </Box>
                      
                    </Drawer>
                    <VirtuosoGrid
                      totalCount={items.length}
                      overscan={2}
                    
                      listClassName={classes.list}
                      itemClassName={classes.itemContainer}
                      itemContent={index => {
                        return (
                          <Box   className={classes.itemContainer} >
                            
                            
                            <Box width="100%"> 
                              <Input />
                            </Box>
                            <Typography>  Item {items[index].name} </Typography> 
                            <Box> <Button > Restock</Button> </Box>

                            
                             
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
