import {Box, CircularProgress, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { cashierDebtApi } from '../../../../api/cashier/activity/api'
import {DebtContextProvider} from '../../../../context/cashier/DebtContext'
import AmountFormater from '../../../../helpers/AmountFormater'
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
 
    
    useEffect(()=> {

        cashierDebtApi().fetchAll().then(response => {

            const {current_debts, total_pending_debts, today_total, total_pending_cost} = response.data
            // setDebts(debts)
            
            
             setLoading(false)
             setPendingDebts(total_pending_debts)
            console.log(response.data)

        }).catch(err => {
            console.log(err)
            setLoading(false)
            setFailed(true)
        })


        return ()=> {
           
            setCurrentDebts([])
            setPendingDebts([])
            setTodayTotal('')
            setTotalPending('')
            setLoading(true)
        }
    }, [])
    

    return (
        <DebtContextProvider
            value={{
                
                pendingDebts,
                setCurrentDebts,
                
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
                                <Box className={classes.box} display="flex" >
                                    <PendingDebtsList />
                                </Box>
                               
                               
                            </Box>
                        

                        }
                    </Box>
      
                </Grid>

                <Grid item xs={4}>
                    {/* <CreateExpense createExpenseProps = {debts, setTotaldebts, setDebts, totaldebts} /> */}
                </Grid>
            </Grid>
        </Container>
        </DebtContextProvider>
    )
}


export default DebtContainer