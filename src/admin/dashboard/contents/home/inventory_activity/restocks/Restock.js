import { Avatar, Box, CircularProgress, Grid, InputBase, makeStyles, Typography, withStyles } from '@material-ui/core'
import { DateTime } from 'luxon'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { VirtuosoGrid } from 'react-virtuoso'
import { activitiesApi } from '../../../../../../api/admin/activities/api'
import InventoryActivityContext from '../../../../../../context/admin/inventory_activity/InventoryActivity'
import AmountFormater from '../../../../../../helpers/AmountFormater'

const useStyles = makeStyles((theme) => ({
    restock: {
        backgroundColor: "#101d68",
        borderRight: "1px solid",
        borderRadius: 5
    },
    restockCont: {
        height: "calc(74vh - 200px)",
        overflowY: "auto"
    },
    fixedHeight: {
        height: "calc(74vh - 200px)"
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
        minWidth: 290
    },
    [theme.breakpoints.down('md')]: {
        width: "",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        minWidth: 290
        
        
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
        backgroundColor: "#111078"
    },
}))



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
       //Use the system font instead of the default Roboto font.
      fontFamily: [
        'Kanit',
        'cursive',
      ].join(','),
      '&:focus': {
        borderRadius: 5,
        
        
      },
    },
  }))(InputBase);



function Restock(){
    const classes = useStyles()
    const [restockedItems, setRestockedItems] = useState([])
    const [inventoryActivity, setInventoryActivity] = useState({
        restocked_goods_cost: '0',
        restocked_goods_quantity: '0',
        restocked_goods_worth: '0',
       
    })
    const [loading, setLoading] = useState(false)
    const [failed, setFailed] = useState(false)
    const {storeName} = useParams()
    const activity = activitiesApi(storeName, 'restocks')
    const [filteredRestocks, setFilteredRestocks] = useState(restockedItems)

   


    useEffect(() => {

        setLoading(true)
        activity.load().then(response => {
           
            const {restocks, inventory_activity} = response.data
            const {restocked_goods_cost, restocked_goods_quantity, restocked_goods_worth} = inventory_activity
            
            setRestockedItems(restocks)
            setFilteredRestocks(restocks)
            setInventoryActivity({
                restocked_goods_cost,
                restocked_goods_quantity,
                restocked_goods_worth,
               
            })
            setLoading(false)
            console.log(restocks)

         
          }).catch(err => {
            
            setFailed(true)
            setLoading(false)
          })

        

        return ()=> {

           
            
            setLoading(false)
            setFailed(false)
            setRestockedItems([])
            setFilteredRestocks([])
            setInventoryActivity({
                restocked_goods_cost: '0',
                restocked_goods_quantity: '0',
                restocked_goods_worth: '0',
               
            })
            
        }
    }, [])
    return (
            <>

                    <Box display="flex">
                        <Box p={1} >
                            <Typography> Q </Typography>
                            <Typography> {AmountFormater(inventoryActivity['restocked_goods_quantity']).amount()} </Typography>
                        </Box>
                        <Box p={1}>
                            <Typography> TC </Typography>
                            <Typography> ₦{AmountFormater(inventoryActivity['restocked_goods_cost']).amount()} </Typography>
                        </Box>
                        <Box p={1}>
                            <Typography> TW </Typography>
                            <Typography> ₦{AmountFormater(inventoryActivity['restocked_goods_worth']).amount()} </Typography>
                        </Box>
                        
                    </Box>
                    <Box width="100%" display="flex" justifyContent="flex-end">
                        <form>
                            <Input />

                        </form>
                        
                    </Box>

            {
                loading ? 
                <Box display="flex" className={classes.fixedHeight} alignItems="center" justifyContent="center"> <CircularProgress size={26} /> </Box> : failed ?
                <Box display="flex" className={classes.fixedHeight} alignItems="center" justifyContent="center"> <Typography> Failed To Load Stock Repairs </Typography> </Box>  :
                <Box marginTop={3} height= "calc(74vh - 200px)"  >
                    

                   
                        <VirtuosoGrid
                            totalCount={restockedItems.length}
                            overscan={2}
                            
                            listClassName={classes.list}
                            itemClassName={classes.itemContainer}
                            itemContent={index => {

                            const {id, item_name, quantity, created_at} = restockedItems[index]
                            const time =  DateTime.fromISO(restockedItems[index]['created_at']).toLocaleString(DateTime.TIME_SIMPLE)
            

                            return (
                                <Box  p={2}  justifyContent="space-around">
                                    <Box p={1}> 
                                        <Typography> {item_name} </Typography>
                                    </Box>
                                   
                                    
                                   
                                    <Box display="flex" justifyContent="space-around" alignItems="center">
                                        <Avatar className={classes.small}> {quantity} </Avatar>
                                        <Typography> {time} </Typography>
                                       
                                    </Box>
                                </Box>
                            )
                        }}
                
                    />


                   
                    
                     
                
            
                </Box>
                }
                </>
        

       
    )
}

export default Restock