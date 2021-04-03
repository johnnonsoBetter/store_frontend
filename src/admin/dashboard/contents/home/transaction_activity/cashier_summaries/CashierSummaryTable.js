
import { Box, Button, Grid, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TransactionActivityContext from '../../../../../../context/admin/transaction_activity/TransactionActivity'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {DateTime} from 'luxon'
import Loader from '../../../../Loader'
import FailedActivityLoader from '../../FailedActivityLoader'
import NoData from '../../NoData'
import { activitiesApi } from '../../../../../../api/admin/activities/api'
import { Check, Mood, MoodBadOutlined, Person, TrackChangesOutlined } from '@material-ui/icons'
import AmountFormater from '../../../../../../helpers/AmountFormater'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '39.33%',
    flexShrink: 0,
    
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    textTransform: "capitalize"
   
  },
  detail: {
    textTransform: "capitalize"
  },
  summaryContainer: {
      backgroundColor: "#090E1E",
      borderRadius: 10

  },
  cashierName: {
      color: "#094595",
      textTransform: "capitalize"
  },
  reportButton: {
      backgroundColor: "#1265C8",
      width: "100%"
  },
  amount: {
      color: "#DEDEDE"
  },
  cashierIcon: {
      color: "#BE9D3D"
  }
}));

function CashierSummaryTable(){
    const {storeName} = useParams()
    const {staticDate, setTransactionActivity} = useContext(TransactionActivityContext)
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [cashier_summaries, setCashierSummaries] = useState([])
    const classes = useStyles();
    const cashierSummaryApi = activitiesApi(storeName, 'cashier_sales_summaries')


    useEffect(() => {
        
        if (staticDate !== ""){
            cashierSummaryApi.loadDate(staticDate).then(response => {

             const {transaction_activity, cashier_sales_summaries} = response.data
             setTransactionActivity(transaction_activity)
             setCashierSummaries(cashier_sales_summaries)
             setLoading(false)
            
            }).catch(err => {
        
              console.log(err)
              setLoading(false)
              setFailed(true)
             
              
            })
        
      
          }else{
            cashierSummaryApi.load().then(response => {
              const {transaction_activity, cashier_sales_summaries} = response.data
              setTransactionActivity(transaction_activity)
              setCashierSummaries(cashier_sales_summaries)
              setLoading(false)
              console.log(response)
 
            }).catch(err => {

              setLoading(false)
              setFailed(true)
              
            })
      
      
          }

          return ()=> {
              setCashierSummaries([])
              setLoading(true)
              setFailed(false)
          }
          
          

    }, [])

    return (

      <Box  className={classes.root}>
        {
          loading ? <Loader  minHeight={300}/> :
            failed ? <FailedActivityLoader activity="expenses" />
          : 

            <Box widht="100%">
                    {
                        cashier_summaries.length === 0 ? <NoData activity="Cashier Summary"/> : 
                        <Grid container>

                            {
                                cashier_summaries.map(cashier_summary => {
                                    const {cashier_name, total_amount_difference, id, final_outcome} = cashier_summary
                                    return (
                                        <Grid key={id} id={id} item xs={12} sm={3}>
                                            <Box className={classes.summaryContainer} width="100%" >
                                                <Box display="flex"  p={1} justifyContent="flex-end"> <Person  className={classes.cashierIcon}/> </Box>
                                                <Box textAlign="center" p={1} className={classes.cashierName}> <Typography > {cashier_name} </Typography> </Box>
                                                <Box textAlign="center" p={1} className={classes.amount}> <Typography > ₦{AmountFormater(total_amount_difference).amount()} </Typography> </Box>
                                                <Box textAlign="center" p={1} className={classes.amount}> 
                                                    <Typography >
                                                        {
                                                            final_outcome === "shortage" ? <TrackChangesOutlined style={{color: "red"}} /> : final_outcome === "excess" ? <TrackChangesOutlined style={{color: "grey"}} /> :
                                                            final_outcome === "balance" ? <TrackChangesOutlined style={{color: "green"}} /> : null
                                                        }
                                                        
                                                    </Typography> </Box>
                                                <Box textAlign="center" p={1}> <Button className={classes.reportButton}> View Report </Button>  </Box>
                                            </Box>
                                        </Grid>

                                    )
                                })
                            }

                            
                        </Grid>

                    }     
                
            </Box>
        }


     </Box>
        
      
    )
}

export default CashierSummaryTable