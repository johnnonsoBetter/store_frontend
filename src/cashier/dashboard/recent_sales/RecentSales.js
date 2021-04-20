import { Box, Button, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { cashierSalesApi } from '../../../api/cashier/activity/api'


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
    

    useEffect(()=> {
        cashierSalesApi().fetchRecentSales().then((response)=> {
            console.log(response)
            setLoading(false)
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
                            <Grid item lg={6} xs={4}>
                                <Box p={2} className={classes.saleContainer} >
                                    <Box p={3}>
                                        <Typography >3000</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Box width="33%" justifyContent="center" alignItems="center" display="flex">
                                            <Typography> 2:30pm</Typography>
                                        </Box>

                                        <Box width="33%" justifyContent="center" alignItems="center" display="flex">
                                            <Button> View </Button>
                                        </Box>
                                        <Box width="33%" justifyContent="center" alignItems="center" display="flex">
                                            <Typography> Pos Cashback</Typography>
                                        </Box>
                                        
                                        
                                    </Box>
                                </Box>
                            </Grid>

                        </Grid>
                    
                    </Box>
                    

                }
            </Box>
        </>
    )
}

export default RecentSales