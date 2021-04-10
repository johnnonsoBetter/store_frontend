import {Box, CircularProgress, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { cashierDebtApi, cashierRecoverDebtApi } from '../../../../api/cashier/activity/api'
import DashboardContext from '../../../../context/cashier/DashboardContext'
import {DebtContextProvider} from '../../../../context/cashier/DebtContext'
import AmountFormater from '../../../../helpers/AmountFormater'
import CreateDebtContainer from './CreateDebtContainer'
import CurrentDebtsList from './CurrentDebtsList'
import PendingDebtsList from './PendingDebtsList'


const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1
    },
    box: {
        flexGrow: 1,
        height: "calc(75vh - 50px)",
       
    },
    
}))

function DebtContainer(){   

    const classes = useStyles()
    const [currentDebts, setCurrentDebts] = useState([])
    const [pendingDebts, setPendingDebts] = useState([])
    const [todayTotal, setTodayTotal] = useState('0')
    const [totalPending, setTotalPending] = useState('0')
    const [failed, setFailed] = useState(false)
    const [loading, setLoading] = useState(true)
    const {showSnackBar} = useContext(DashboardContext)
    const [recoverBtnDisabled, setRecoverBtnDisabled] = useState(false)


    const recoverDebt = (debtReceiptId, amount, debtType) => {
        const recoveredDebt = {
            debt_receipt_id: debtReceiptId,
            amount: amount
        }

        cashierRecoverDebtApi().recoverDebt(recoveredDebt).then((response) => {
            console.log(response)
            if(debtType === "current"){
                const newCurrentDebts = currentDebts.filter((debt) => debt.receipt_id !== debtReceiptId)
                let sum = (todayTotal - amount)
                setCurrentDebts(newCurrentDebts)
                setTodayTotal(sum)
            }else{
                const newPendingDebts = pendingDebts.filter((debt) => debt.receipt_id !== debtReceiptId)
                let sum = (totalPending - amount)
                setPendingDebts(newPendingDebts)
                setTotalPending(sum)
            }
            setRecoverBtnDisabled(false)
            showSnackBar('Successfully Recovered Debt', true)
        }).catch(err => {
            showSnackBar('Failed to Recover Debt ', false)
        })
    }
 
    
    useEffect(()=> {

        cashierDebtApi().fetchAll().then(response => {

            const {current_debts, total_pending_debts, today_total, total_pending_cost} = response.data
 
             setCurrentDebts(current_debts)
             setPendingDebts(total_pending_debts)
             setTotalPending(total_pending_cost)
             setTodayTotal(today_total)
             setLoading(false)
            console.log(response.data)

        }).catch(err => {

            setLoading(false)
            setFailed(true)
        })


        return ()=> {
           
            setCurrentDebts([])
            setPendingDebts([])
            setTodayTotal('')
            setTotalPending('')
            setLoading(true)
            setRecoverBtnDisabled(false)
        }
    }, [])
    

    return (
        <DebtContextProvider
            value={{
                
                
                
                pendingDebts,
                setPendingDebts,
                setTodayTotal,
                todayTotal,
                currentDebts,
                setCurrentDebts,
                recoverDebt,
                recoverBtnDisabled,
                setRecoverBtnDisabled
                
            }}
        >

        
        <Container className={classes.root} >
            
            <Grid spacing={7} container>
                <Grid item xs={8}>
                    <Box    >

                        {
                            loading ? 
                        
                        
                            <Box width="100%" minHeight={400} alignItems="center" display="flex" justifyContent="center">
                                
                                <CircularProgress style={{color: "yellow"}} size={24} />
                            </Box>

                            : 
                            failed ?
                            
                            <Box width="100%"  minHeight={400} alignItems="center" display="flex" justifyContent="center">
                                
                                <Typography style={{color: "white"}}> Failed To Load Debts </Typography>
                            </Box>

                            : 
                            <Box  >
                                 
                                 <Box display="flex" justifyContent="space-around" >
                                 <Typography style={{color: "white"}} variant="h6"> Total Current  ₦{AmountFormater(todayTotal).amount()} </Typography>
                                 <Typography style={{color: "white"}} variant="h6"> Total Pending ₦{AmountFormater(totalPending).amount()} </Typography>
                                 
                                 </Box>
                                <Box className={classes.box}  >
                                    
                                    <Box >
                                        <CurrentDebtsList />
                                    </Box>

                                    <Box marginTop={3}>
                                        
                                        <PendingDebtsList />
                                        
                                    </Box>
                                </Box>
                               
                               
                            </Box>
                        

                        }
                    </Box>
      
                </Grid>

                <Grid item xs={4}>
                    <CreateDebtContainer />
                </Grid>
            </Grid>
        </Container>
        </DebtContextProvider>
    )
}


export default DebtContainer