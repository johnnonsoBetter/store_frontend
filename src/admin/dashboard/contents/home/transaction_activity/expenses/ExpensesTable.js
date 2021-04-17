import { Box, Grid, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TransactionActivityContext from '../../../../../../context/admin/transaction_activity/TransactionActivity'
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

function ExpensesTable(){
    const {storeName} = useParams()
    const {staticDate, setTransactionActivity} = useContext(TransactionActivityContext)
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [expenses, setExpenses] = useState([])
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const expensesApi = activitiesApi(storeName, 'expenses')

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    

    useEffect(() => {
        
        if (staticDate !== ""){
            expensesApi.loadDate(staticDate).then(response => {

             const {transaction_activity, expenses} = response.data
             setTransactionActivity(transaction_activity)
             setExpenses(expenses)
             setLoading(false)
            
            }).catch(err => {
        
              console.log(err)
              setLoading(false)
              setFailed(true)
             
              
            })
        
      
          }else{
            expensesApi.load().then(response => {
              const {transaction_activity, expenses} = response.data
              setTransactionActivity(transaction_activity)
              setExpenses(expenses)
              setLoading(false)
 
            }).catch(err => {

              setLoading(false)
              setFailed(true)
              
            })
      
      
          }

          return ()=> {
              setExpenses([])
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

            expenses.length === 0 ? 
            <NoData activity="Expenses" minHeight={300}/> :
            <Box width="100%">

            {
              expenses.map(expense => {
               const {cost, detail, created_at, cashier_name, id} = expense
               const time =  DateTime.fromISO(created_at).toLocaleString(DateTime.TIME_SIMPLE)
   
               return (
                  <Box width="100%"  key={id} id={id} p={1}>
                   <Accordion style={{backgroundColor: "rgb(31 41 84)", color: "white"}}  expanded={expanded === `panel${id}`} onChange={handleChange(`panel${id}`)}>
                   <AccordionSummary 
                     expandIcon={<ExpandMoreIcon />}
                     aria-controls="panel1bh-content"
                     id= {`panel${id}-header`}
                   >
                     <Typography className={classes.heading}>₦{cost}</Typography>
                     <Box display="flex" width="100%" justifyContent="center" >
                       <Typography className={classes.secondaryHeading}>{cashier_name}</Typography>
                      </Box>
                     
                   </AccordionSummary>
                   <AccordionDetails style={{backgroundColor: "rgb(31 41 84)", color: "white"}}>
                     
                     
   
                     <Grid spacing={3} container>
                       <Grid  item xs={12} sm={8}>
                         <Box >
                           <Typography className={classes.detail}>
                             {detail}
                           </Typography>
                         </Box>
                       </Grid>
   
                       <Grid  item xs={12} sm={4}>
                         <Box >
                           <Typography className={classes.detail}>
                             {time}
                           </Typography>
                         </Box>
                       </Grid>
                     </Grid>
                   </AccordionDetails>
                 </Accordion>
                 </Box>
               )
              })
            }
           </Box>


          }
        


      
       </Box>
        }
     </Box>
      
    )
}

export default ExpensesTable