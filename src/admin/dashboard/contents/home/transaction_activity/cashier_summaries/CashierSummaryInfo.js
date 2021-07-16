import { Box, IconButton, Paper, Typography, Avatar, makeStyles, Button } from '@material-ui/core'
import { ArrowBack, Clear, Person } from '@material-ui/icons'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { activitiesApi } from '../../../../../../api/admin/activities/api'
import CashierSummaryContext from '../../../../../../context/admin/transaction_activity/cashier_summaries/CashierSummaryContext'
import Loader from '../../../../Loader'
import deepOrange from '@material-ui/core/colors/deepOrange'
import AmountFormater from '../../../../../../helpers/AmountFormater'
import TransactionReview from './TransactionReview'



const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      fontSize: "2em"
      
      
    },
  }));


function CashierSummaryInfo(){
    
    const {storeName} = useParams()
    const {cashierSummaryId, setCashierSummaryId, setDrawerOpened} = useContext(CashierSummaryContext)
    const [cashierSummary, setCashierSummary] = useState(null)
    const [cashierSystemSummary, setCashierSystemSummary] = useState(null)
    const [transactionReview, setTransactionReview] = useState(null)
    const [view, setView] = useState('summary')
    const cashierSummaryApi = activitiesApi(storeName, `cashier_sales_summaries/${cashierSummaryId}`)
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const classes = useStyles()


    


    useEffect(()=> {

        cashierSummaryApi.load().then(response => {
            console.log(response)

            const {cashier_sales_summary, cashier_system_summary, transaction_review} = response.data
            setCashierSummary(cashier_sales_summary)
            setCashierSystemSummary(cashier_system_summary)
            setTransactionReview(transaction_review)
            setLoading(false)


        }).catch(err => {
            console.log(err)
           
            setFailed(true)
            setLoading(false)
        })

        return ()=> {
            // clean up
            setCashierSummaryId('')
            setCashierSummary(null)
            setCashierSystemSummary(null)
            setTransactionReview(null)
            setLoading(true)
            setFailed(false)
            setView('summary')
        }
    }, [])
    return (
        <Box width="100%">
            <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                <IconButton onClick={()=> {
                    setDrawerOpened(false)
                }}>
                    <Clear />
                </IconButton>
                
                {
                    view !== "summary" ?
                    <IconButton onClick={()=> setView('summary')} >
                        <ArrowBack />
                    </IconButton> : null
                }
                

            </Box>

            {
                loading ? <Loader minHeight={200} /> : failed ? 
                
                <Box width="100%" minHeight={300} display="flex" justifyItems="center" alignItems="center" justifyContent="center">
                    
                    <Typography > Oops Something went wrong </Typography>
            
                </Box> 
            : 

            <>

                {
                    view === "summary" ? 
                    <Box textAlign="center"> 
                
                    <Box display="flex"  justifyContent="center"  marginTop={1} width="100%">
                    
                        <Box> <Avatar className={classes.large}> {cashierSummary['cashier_name'].toString().toUpperCase().charAt(0)}  </Avatar> </Box>
                    </Box>
    
                    
    
                    
                    <Paper>
                       <Box p={2} >
                            <Box marginTop={2} display="flex"  justifyContent="space-between">
                                <Box> <Person /> </Box>
                                <Box>  <Typography> {cashierSummary['cashier_name']} </Typography>    </Box>
                            </Box>
    
                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Cash At Drawer </Typography>    </Box>
                                <Box>  <Typography> ₦{ AmountFormater(cashierSummary['total_cash_at_hand']).amount() } </Typography>    </Box>
                            </Box>
    
                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Pos Submitted </Typography>    </Box>
                                <Box>  <Typography> ₦{ AmountFormater(cashierSummary['total_pos']).amount() } </Typography>    </Box>
                            </Box>
    
                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Transfer Submitted </Typography>    </Box>
                                <Box>  <Typography> ₦{ AmountFormater(cashierSummary['total_transfer']).amount() } </Typography>    </Box>
                            </Box>

                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Next Day Change </Typography>    </Box>
                                <Box>  <Typography> ₦{ AmountFormater(cashierSummary['next_day_change']).amount() } </Typography>    </Box>
                            </Box>
                       </Box>
                    </Paper>
    
                    <Paper>
                        <Box marginTop={2} p={2}>
                            <Typography> System </Typography>
                        <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Total Sales </Typography>    </Box>
                                <Box>  <Typography> ₦{ AmountFormater(cashierSystemSummary['total_sales']).amount() } </Typography>    </Box>
                            </Box>
    
                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Total Expenses </Typography>    </Box>
                                <Box>  <Typography> ₦{ AmountFormater(cashierSystemSummary['total_expenses']).amount() } </Typography>    </Box>
                            </Box>
    
                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Total Debts </Typography>    </Box>
                                <Box>  <Typography> ₦{ AmountFormater(cashierSystemSummary['total_debts']).amount() } </Typography>    </Box>
                            </Box>
    
                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Total Recovered </Typography>    </Box>
                                <Box>  <Typography> ₦{ AmountFormater(cashierSystemSummary['total_recovered']).amount() } </Typography>    </Box>
                            </Box>
    
                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Total Goods Returned </Typography>    </Box>
                                <Box>  <Typography> ₦{ AmountFormater(cashierSystemSummary['total_goods_returned_cost']).amount() } </Typography>    </Box>
                            </Box>
    
                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Total Pos </Typography>    </Box>
                                <Box>  <Typography> ₦{ AmountFormater(cashierSystemSummary['total_pos']).amount() } </Typography>    </Box>
                            </Box>
    
                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Total Transfer </Typography>    </Box>
                                <Box>  <Typography> ₦{ AmountFormater(cashierSystemSummary['total_transfer']).amount() } </Typography>    </Box>
                            </Box>
    
                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Total Cash At Hand </Typography>    </Box>
                                <Box>  <Typography> ₦{ AmountFormater(cashierSystemSummary['total_cash_at_hand']).amount() } </Typography>    </Box>
                            </Box>
                        </Box>
                    </Paper>
    
                    <Box display="flex" p={1} marginTop={2} width="100%">
                        <Button onClick ={()=> setView("review")} style={{width: "100%", color: "white", backgroundColor: "#654ab9"}} > View Transaction BreakDown</Button>
                    </Box>
                </Box>
                    : 
                    
                    <TransactionReview setView={setView} transactionReviewInfo={transactionReview} />
                }


            </>
            
            
            }
            
        </Box>
    )
}

export default CashierSummaryInfo