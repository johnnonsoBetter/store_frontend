import { Box, Divider, Paper, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import StoreItemsInventory from '../../../../context/admin/store_item_inventory/StoreItemsInventory'
import AmountFormater from '../../../../helpers/AmountFormater'

function ItemInventoryInfo(){

    const {itemInfo} = useContext(StoreItemsInventory)
    const {inventory_manager} = itemInfo

    console.log(inventory_manager)
    console.log("this is the inventory")

    return (
        <Box>
        
        
        
            <Divider />
            <Box p={1} display="flex" justifyContent="space-between"> 
                <Box>
                    <Typography > Total Goods Quantity:</Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                    <Typography > {AmountFormater(inventory_manager['total_goods_quantity']).amount()}</Typography>
                </Box>
        
            </Box>

            


            <Divider />

            <Box p={1} display="flex" justifyContent="space-between"> 
                <Box>
                    <Typography > Total Goods Cost:</Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                    <Typography> ₦{AmountFormater(inventory_manager['total_goods_cost']).amount()}</Typography>
                </Box>
        
            </Box>
            <Divider />

            <Box p={1} p={1} display="flex" justifyContent="space-between"> 
                <Box>
                    <Typography > Total Goods Worth</Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                    <Typography > ₦{AmountFormater(inventory_manager['total_goods_worth']).amount()}</Typography>
                </Box>
        
            </Box>

            <Divider />

            <Box p={1} display="flex" justifyContent="space-between"> 
                <Box>
                    <Typography > Expected Profit</Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                    <Typography > ₦{AmountFormater(inventory_manager['expected_profit']).amount()}</Typography>
                </Box>
        
            </Box>

            <Box p={1} display="flex" justifyContent="space-between"> 
                <Box>
                    <Typography > Quantity Sold</Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                    <Typography > {AmountFormater(inventory_manager['total_quantity_sold']).amount()}</Typography>
                </Box>
        
            </Box>
    </Box>
    )
}

export default ItemInventoryInfo