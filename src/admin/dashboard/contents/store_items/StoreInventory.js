import { Box, Divider, Paper, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { store } from '../../../../api/admin/item/api'
import StoreItemsInventory from '../../../../context/admin/store_item_inventory/StoreItemsInventory'
import AmountFormater from '../../../../helpers/AmountFormater'

function StoreInventory() {

    const [inventoryInfo, setInventoryInfo] = useState({
        total_goods_quantity: '0',
        total_goods_worth: '0',
        total_goods_cost: '0',
        expected_profit: '0'

    })

    const {storeName} = useParams()
    const {items} = useContext(StoreItemsInventory)
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        store(storeName).fetchInventoryInfo().then((response => {

            
            const {total_goods_cost, total_goods_worth, total_goods_quantity, expected_profit} = response.data['inventory_manager']
            setInventoryInfo({
                total_goods_quantity,
                total_goods_worth,
                total_goods_cost,
                expected_profit,
        
            })

        })).catch(err => {
            console.log(err)
        })
        return ()=> {
            // clean up
            setInventoryInfo({
                total_goods_quantity: '0',
                total_goods_worth: '0',
                total_goods_cost: '0',
                expected_profit: '0'
        
            })
        }
    }, [])

    return (
        <>
        

        <Paper>
            <Box p={1} textAlign="center">
                <Typography variant="h5" style={{textTransform: "capitalize"}}> {storeName} Inventory</Typography>
            </Box>

            <Divider />
            <Box p={2}> 
                <Box>
                    <Typography  variant="h6"> Total Products</Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                    <Typography variant="h6"> {AmountFormater(items.length).amount()}</Typography>
                </Box>
        
            </Box>
        <Divider />
        <Box p={2}> 
            <Box>
                <Typography variant="h6"> Total Goods Quantity</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end">
                <Typography variant="h6"> {AmountFormater(inventoryInfo['total_goods_quantity']).amount()}</Typography>
            </Box>
       
        </Box>

        


        <Divider />

        <Box p={2}> 
            <Box>
                <Typography variant="h6"> Total Goods Cost</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end">
                <Typography variant="h6"> ₦{AmountFormater(inventoryInfo['total_goods_cost']).amount()}</Typography>
            </Box>
       
        </Box>
        <Divider />

        <Box p={2}> 
            <Box>
                <Typography variant="h6"> Total Goods Worth</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end">
                <Typography variant="h6"> ₦{AmountFormater(inventoryInfo['total_goods_worth']).amount()}</Typography>
            </Box>
       
        </Box>

        <Divider />

        <Box p={2}> 
            <Box>
                <Typography variant="h6"> Expected Profit</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end">
                <Typography variant="h6"> ₦{AmountFormater(inventoryInfo['expected_profit']).amount()}</Typography>
            </Box>
       
        </Box>



        </Paper>
        
        </>
    )
}

export default StoreInventory
// total_goods_quantity, :total_goods_worth, :expected_profit, :total_goods_cost, :total_quantity_sold