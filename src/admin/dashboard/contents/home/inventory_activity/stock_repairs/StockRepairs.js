import { Box, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { activitiesApi } from '../../../../../../api/admin/activities/api'


const useStyles = makeStyles((theme) => ({
    stockRepair: {
        backgroundColor: "#101d68",
        borderRight: "1px solid",
        borderRadius: 5
    },
    stockRepairCont: {
        height: "calc(74vh - 200px)",
        overflowY: "auto"
    }
}))

function StockRepairs(){

    const [loading, setLoading] = useState(false)
    const [failed, setFailed] = useState(false)
    const [stockRepairs, setStockRepairs] = useState([])

    const {storeName} = useParams()
    const activity = activitiesApi(storeName, 'item_stock_repairs')
    const classes = useStyles()


    useEffect(()=> {

        activity.load().then((response => {

            console.log(response)
        })).catch(err => {

            console.log(err)
        })


    }, [])

    return (
        <Box>
            <Box p={2} textAlign="left"> <Typography variant="h5"> Stock Repairs </Typography></Box>


            {
                loading ? 
                <Box display="flex" alignItems="center" justifyItems="center"> <CircularProgress size={29} /> </Box> : failed ?
                <Box display="flex" alignItems="center" justifyItems="center"> <Typography> Failed To Load Stock Repairs </Typography> </Box>  :
                <Box marginTop={3} className={classes.stockRepairCont}>
           
                <Grid spacing={1} container >
                    {
                        // stockRepairs.map(restock => {

                        //     const {id, item_name, quantity, created_at} = restock

                        //     return (
                        //         <Grid  item xs={12} md={6} key={id} >
                        //             <Box className={classes.restock}  p={2} display="flex" justifyContent="space-around">
                        //                 <Typography> {item_name} </Typography>
                        //                 <Typography> {quantity} </Typography>
                        //             </Box>
                        //         </Grid>
                        //     )
                        // })
                    }
                </Grid>
                
            
        </Box>
            }
           
                
        
                   
        

        </Box>
    )
}


export default StockRepairs