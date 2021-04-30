import { Box, CircularProgress, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { itemApi } from '../../../../api/admin/item/api'
import StoreItemsInventory from '../../../../context/admin/store_item_inventory/StoreItemsInventory'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabPanel } from '@material-ui/lab';
import ItemInventoryNav from './ItemInventoryNav';



function ItemInventory(){
    const [loading, setLoading] = useState(false)
    const [failed, setFailed] = useState(false)
    const {itemId} = useContext(StoreItemsInventory)
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };



    useEffect(() => {

        itemApi().fetchItemInventoryInfo(parseInt(itemId)).then((response) => {

            console.log(response)
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
          

            console.log("clean up has been performed at the item")
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
                        <Typography variant="h6"> Item Name </Typography> 
                        <Box p={2}>  <Typography variant="h5"> 9 </Typography>  </Box>
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