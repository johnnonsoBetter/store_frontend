import { Box, Grid, List, ListItem, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core'
import { DateTime } from 'luxon'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { activitiesApi } from '../../../../../../api/admin/activities/api'
import TransactionActivityContext from '../../../../../../context/admin/transaction_activity/TransactionActivity'
import AmountFormater from '../../../../../../helpers/AmountFormater'
import Loader from '../../../../Loader'
import FailedActivityLoader from '../../FailedActivityLoader'
import NoData from '../../NoData'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    infoContainer: {
        backgroundColor: "#030417"
    },
    info: {
        color: "white",
        textTransform: "capitalize"
    },
    previousDayChange: {
        backgroundColor: "orange",
        color: "black",
        padding: theme.spacing(0.5),
        borderRadius: "3px"
    }
}))

function ChangeTable(){

    const {storeName} = useParams()
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [change_balances, setChangeBalances] = useState([])
   
    const {staticDate, setTransactionActivity} = useContext(TransactionActivityContext)
    const [previousDayChange, setPreviousDayChange] = useState("")
    const classes = useStyles()
    const [isToday, setIsToday] = useState(false)
    const changeApi = activitiesApi(storeName, 'change_balances')

    
 
    useEffect(()=> {

        if (staticDate !== ""){

            changeApi.loadDate(staticDate).then(response => {
                const {change_balances, transaction_activity, previous_day_change} = response.data
                setChangeBalances(change_balances)
                setPreviousDayChange(previous_day_change)
                setTransactionActivity(transaction_activity)
                setLoading(false)
                setIsToday(new Date(staticDate).toDateString() === new Date().toDateString())
                
            }).catch(err => {
                setLoading(false)
                setFailed(true)
                console.log(err)
            })

        }else{

            changeApi.load().then(response => {
             
                const {change_balances, transaction_activity, previous_day_change} = response.data
                setChangeBalances(change_balances)                
                setPreviousDayChange(previous_day_change)
                setTransactionActivity(transaction_activity)
                setLoading(false)
                setIsToday(true)
                console.log(response)
            }).catch(err => {
                setLoading(false)
                setFailed(true)
                console.log(err)
    
            })
        }





        return ()=> {
            // clean up
            setFailed(false)
            setLoading(true)
            setChangeBalances([])
            setPreviousDayChange('')
            setIsToday(false)
        }
    }, [])

    return (
        <Box className={classes.root} width="100%">
            {
                loading ? <Loader /> : failed ? <FailedActivityLoader activity="Changes" /> : 
                
                <Box width="100%" >
                    <Box display="flex" justifyContent="flex-end" width="100%"  >
                        {
                             isToday && 
                            <Typography className={classes.previousDayChange} > Startup Change ₦{AmountFormater(previousDayChange).amount()}</Typography>

                        }
                    </Box>

                    <Box>
                        {
                            change_balances.length === 0 ? <NoData activity="Changes" /> :
                             <Grid spacing={3} container>
                                {
                                    change_balances.map(change => {

                                        const {id, amount, cashier_name, created_at} = change
                                        const time =  DateTime.fromISO(created_at).toLocaleString(DateTime.TIME_SIMPLE)

                                        return (
                                            <Grid item xs={12} sm={6} md={6} >
                                                <Paper className={classes.infoContainer} width="100%">
                                                    <Box p={1}>
                                                        <Typography className={classes.info}> {cashier_name} Collected ₦{AmountFormater(amount).amount()} at {time}  </Typography>
                                                    </Box>
                                                   
                                                </Paper>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>  
                           
                        }             
                    </Box>
                    
                </Box>
            }
        </Box>
    )
}

export default ChangeTable