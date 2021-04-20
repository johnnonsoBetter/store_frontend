import { Box, Button, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core'
import { DateTime } from 'luxon'
import React, { useContext, useEffect, useState } from 'react'
import { cashierSalesApi } from '../../../api/cashier/activity/api'
import DashboardContext from '../../../context/cashier/DashboardContext'
import AmountFormater from '../../../helpers/AmountFormater'
import RecentSaleReceipt from './RecentSaleReceipt'
import Dexie from 'dexie'


const useStyles = makeStyles((theme) => ({
    saleContainer: {
        borderRadius: 5,
        color: "white",
        backgroundColor: "#18710e"
    }
}))

function RecentSales(){

    const [recentSales, setRecentSales] = useState([])
    const [failedToLoad, setFailedToLoad] = useState(false)
    const [loading, setLoading] = useState(true)
    const classes = useStyles()
    const {setRecentSale, recentSale, setRecentSaleReceiptOpened, recentSaleReceiptOpened} = useContext(DashboardContext)
    

    useEffect(()=> {
        cashierSalesApi().fetchRecentSales().then((response)=> {
            const {sales} = response.data
            setRecentSales(sales)
            setLoading(false)
            console.log("this is the sales", sales)
        }).catch((err)=> {
            console.log(err)
            
            setLoading(true)
            setFailedToLoad(true)
        })
        return ()=> {

            setRecentSales([])
            setLoading(true)
            setFailedToLoad(false)
        }

    }, [])

  


    return (
        <>
            <Box height="calc(100vh - 200px)">
                {
                    loading ? 
                    <Box width="100%" display="flex" alignItems="center" justifyContent="center" >  <CircularProgress /> </Box>
                    : failedToLoad ? 
                    <Box width="100%"> <CircularProgress /> </Box>
                    : 
                    <Box >
                        {
                            
                        }

                        <Grid spacing={2} container>
                            
                            {

                                recentSales.map((recent_sale)=> {
                                    const {total_items_amount, transaction_type, created_at} = recent_sale   
                                    const time =  DateTime.fromISO(created_at).toLocaleString(DateTime.TIME_SIMPLE)
           

                                    return (
                                        <>
                                           

                                            <Grid key={recent_sale.id} item lg={6} xs={4}>
                                                <Box p={2} className={classes.saleContainer} >
                                                    <Box p={3}>
                                                        <Typography >₦{AmountFormater(total_items_amount).amount()} </Typography>
                                                    </Box>
                                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                                        <Box width="33%" justifyContent="center" alignItems="center" display="flex">
                                                            <Typography> {time} </Typography>
                                                        </Box>
                
                                                        <Box width="33%" justifyContent="center" alignItems="center" display="flex">
                                                            <Button onClick={()=> {
                                                                setRecentSaleReceiptOpened(true)
                                                                setRecentSale(recent_sale)
                                                            }}>  View </Button>
                                                        </Box>
                                                        <Box width="33%" justifyContent="center" alignItems="center" display="flex">
                                                            <Typography> {transaction_type}</Typography>
                                                        </Box>
                                                        
                                                        
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </>
                                    )
                                })
                            }
                            
                           

                        </Grid>
                    
                    </Box>
                    

                }
            </Box>
        </>
    )
}

export default RecentSales