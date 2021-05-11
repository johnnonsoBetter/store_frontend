import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
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
    }
}))


function Restock(){
    const classes = useStyles()
    const {inventoryActivity, restocks} = useContext(InventoryActivityContext)
    return (
        <Box>
            <Box p={2} textAlign="left"> <Typography variant="h5"> Restocks </Typography></Box>
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

            
                
        <Box marginTop={3} className={classes.restockCont}>
           
                <Grid spacing={1} container >
                    {
                        restocks.map(restock => {

                            const {id, item_name, quantity, created_at} = restock

                            return (
                                <Grid  item xs={12} md={6} key={id} >
                                    <Box className={classes.restock}  p={2} display="flex" justifyContent="space-around">
                                        <Typography> {item_name} </Typography>
                                        <Typography> {quantity} </Typography>
                                    </Box>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                
            
        </Box>
                   
        

        </Box>
    )
}

export default Restock