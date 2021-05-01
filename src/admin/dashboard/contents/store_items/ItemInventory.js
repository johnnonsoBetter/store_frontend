import { Box, CircularProgress, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { itemApi } from '../../../../api/admin/item/api'
import StoreItemsInventory from '../../../../context/admin/store_item_inventory/StoreItemsInventory'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabPanel } from '@material-ui/lab';
import ItemInventoryNav from './ItemInventoryNav';
import AmountFormater from '../../../../helpers/AmountFormater';




function ItemInventory(){
    const [loading, setLoading] = useState(false)
    const [failed, setFailed] = useState(false)
    const {itemId, itemInfo, setItemInfo} = useContext(StoreItemsInventory)
   
    useEffect(() => {

        itemApi().fetchItemInventoryInfo(parseInt(itemId)).then((response) => {

            console.log(response)

            const {quantity, name} = response.data['item']
            const {inventory_manager, quantity_event_trackers} = response.data

            console.log(inventory_manager)
            setItemInfo({
                name,
                quantity,
                inventory_manager: inventory_manager,
                quantity_event_trackers,
              })

            setLoading(false)
            
        }).catch(err => {
            console.log(err)
            setLoading(false)
            setFailed(true)
        })

        return ()=> {

            // clean up
            setLoading(true)
            setFailed(false)
            setItemInfo({
                name: 'ser',
                quantity: '0',
                inventory_manager: {
                  total_goods_quantity: 0,
                  total_goods_worth: 0,
                  total_goods_cost: 0,
                  expected_profit: 0
          
                },
                quantity_event_trackers: []
              })
          

         
        }

    }, [])



    return (
        <Box>
            {
                loading ? 
                <Box display="flex" justifyContent="center" alignItems="center" height={500}>   <CircularProgress size={24} /> </Box>
                 : failed ? 
                 <Box display="flex" justifyContent="center" alignItems="center" height={500}>  <Typography> Failed To Load</Typography> </Box>
                : 
                <Box p={2}>
                    <Box textAlign="center"> 
                        <Typography variant="h6"> {itemInfo['name']} </Typography> 
                        <Box p={2}>  <Typography variant="h5"> { AmountFormater(itemInfo['quantity']).amount()  } </Typography>  </Box>
                        <Box display="flex" justifyContent="center"> 
                            <ItemInventoryNav />
                        </Box>
                        
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default ItemInventory