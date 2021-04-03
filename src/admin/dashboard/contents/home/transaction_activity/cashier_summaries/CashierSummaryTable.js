
import { Box, Grid, Typography } from '@material-ui/core'
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


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
  }
}));

function CashierSummaryTable(){
    const {storeName} = useParams()
    const {staticDate, setTransactionActivity} = useContext(TransactionActivityContext)
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [cashier_summaries, setCashierSummaries] = useState([])
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const cashierSummaryApi = activitiesApi(storeName, 'cashier_sales_summaries')

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    

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

      <Box width="100%">
        {
          loading ? <Loader  minHeight={300}/> :
            failed ? <FailedActivityLoader activity="expenses" />
          : 

            <Box widht="100%">
                    {
                        cashier_summaries.length === 0 ? <NoData activity="Cashier Summary"/> : <Typography> Hello Please tell </Typography> 
                    }     
                
            </Box>
        }


     </Box>
        
      
    )
}

export default CashierSummaryTable