import { Box, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { activitiesApi } from '../../../../../../api/admin/activities/api'
import AmountFormater from '../../../../../../helpers/AmountFormater'


const useStyles = makeStyles((theme) => ({
 
    fixedHeight: {
        height: "calc(74vh - 200px)"
    },
    badItem: {
        backgroundColor: "#101d68",
        borderRight: "1px solid",
        borderRadius: 5
    },
    badItemCont: {
        height: "calc(74vh - 200px)",
        overflowY: "auto"
    }
}))


function BadItems(){

    const [loading, setLoading] = useState(false)
    const [failed, setFailed] = useState(false)
    const [badItems, setBadItems] = useState([])
    const classes = useStyles()
    const {storeName} = useParams()
    const activity = activitiesApi(storeName, 'bad_items')
    const [inventoryActivity, setInventoryActivity] = useState({
        total_bad_goods_cost: '0',
        total_bad_goods_quantity: '0',
        total_bad_goods_worth: '0'
    })



    useEffect(()=> {
        setLoading(true)

        activity.load().then((response => {

          
            const {bad_items, inventory_activity} = response.data
            const {total_bad_goods_cost, total_bad_goods_quantity, total_bad_goods_worth} = inventory_activity

 
            setInventoryActivity({
                total_bad_goods_cost,
                total_bad_goods_quantity,
                total_bad_goods_worth,
            })
            setBadItems(bad_items)
            setLoading(false)
        })).catch(err => {

            setFailed(true)
            setLoading(false)
            setInventoryActivity({
                total_bad_goods_cost: '0',
                total_bad_goods_quantity: '0',
                total_bad_goods_worth: '0'
            })
        })


        return ()=> {
            setLoading(false)
            setInventoryActivity({
                total_bad_goods_cost: '0',
                total_bad_goods_quantity: '0',
                total_bad_goods_worth: '0'
            })
            setFailed(false)
            setBadItems([])
        }
    }, [])





    return (
        <Box>
            <Box p={2} textAlign="left"> <Typography variant="h5"> BadItems </Typography></Box>
            {
                loading ? 
                <Box display="flex" className={classes.fixedHeight} alignItems="center" justifyContent="center"> <CircularProgress size={26} /> </Box> : failed ?
                <Box display="flex" className={classes.fixedHeight} alignItems="center" justifyContent="center"> <Typography> Failed To Load Stock Repairs </Typography> </Box>  :
                <Box marginTop={3} >
                    <Box display="flex">
                        <Box p={1} >
                            <Typography> Q </Typography>
                            <Typography> {AmountFormater(inventoryActivity['total_bad_goods_quantity']).amount()} </Typography>
                        </Box>
                        <Box p={1}>
                            <Typography> TC </Typography>
                            <Typography> ₦{AmountFormater(inventoryActivity['total_bad_goods_cost']).amount()} </Typography>
                        </Box>
                        <Box p={1}>
                            <Typography> TW </Typography>
                            <Typography> ₦{AmountFormater(inventoryActivity['total_bad_goods_worth']).amount()} </Typography>
                        </Box>
                        
                    </Box>

                    <Box marginTop={3} className={classes.badItemCont}>
                        {

                            badItems.length === 0 &&
                            <Box display="flex" className={classes.fixedHeight} alignItems="center" justifyContent="center">
                                <Typography> No Stock Repairs Found </Typography>
                            </Box>

                            }
                            <Grid spacing={1} container >
                            {
                            badItems.map(badItem => {

                                const {id, name, quantity, created_at} = badItem

                                return (
                                    <Grid  item xs={12} md={6} key={id} >
                                        <Box className={classes.badItem}  p={2} display="flex" justifyContent="space-around">
                                            <Typography> {name} </Typography>
                                            <Typography> {quantity} </Typography>
                                        </Box>
                                    </Grid>
                                )
                            })
                            }
                        </Grid>

                    </Box>
                    
                     
                
            
                </Box>
                }
        </Box>
    )
}

export default BadItems