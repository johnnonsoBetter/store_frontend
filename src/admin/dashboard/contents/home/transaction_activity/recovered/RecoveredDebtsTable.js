import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
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
}))





function RecoveredDebtsTable(){

    const {storeName} = useParams()
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [recovered_debts, setRecoveredDebts] = useState([])
    const {staticDate, setTransactionActivity} = useContext(TransactionActivityContext)
    const classes = useStyles()
    const recoveredDebtApi = activitiesApi(storeName, 'recovered_debts')

    
 
    useEffect(()=> {

        if (staticDate !== ""){

            recoveredDebtApi.loadDate(staticDate).then(response => {
                const {recovered_debts, transaction_activity} = response.data
                setRecoveredDebts(recovered_debts)
                setTransactionActivity(transaction_activity)
                setLoading(false)
                
            }).catch(err => {
                setLoading(false)
                setFailed(true)
                console.log(err)
            })

        }else{

            recoveredDebtApi.load().then(response => {
             
                const {recovered_debts, transaction_activity} = response.data
                setRecoveredDebts(recovered_debts)                
                setTransactionActivity(transaction_activity)
                setLoading(false)
                
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
            setRecoveredDebts([])
        }
    }, [])

    return (
        <Box className={classes.root} width="100%">
            {
                loading ? <Loader /> : failed ? <FailedActivityLoader activity="recovered_debts" /> : 
                
                <Box width="100%" >

                    <Box>
                        {
                            recovered_debts.length === 0 ? <NoData activity="Recovered Debt" /> :
                             <Grid spacing={3} container>
                                {
                                    recovered_debts.map(recovered_debt => {

                                        const {id, amount, cashier_name, created_at} = recovered_debt
                                        const time =  DateTime.fromISO(created_at).toLocaleString(DateTime.TIME_SIMPLE)

                                        return (
                                            <Grid key={id} item xs={12} sm={6} md={6} >
                                                <Paper className={classes.infoContainer} width="100%">
                                                    <Box p={1}>
                                                        <Typography className={classes.info}> {cashier_name} Recovered ₦{AmountFormater(amount).amount()} at {time}  </Typography>
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

export default RecoveredDebtsTable