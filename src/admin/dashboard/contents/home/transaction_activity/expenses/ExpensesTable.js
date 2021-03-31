import { Box, Typography } from '@material-ui/core'
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
    color: theme.palette.text.secondary,
    textTransform: "capitalize"
   
  },
  detail: {
    textTransform: "capitalize"
  }
}));

function ExpensesTable(){
    const {storeName} = useParams()
    const {staticDate, setTransactionActivity} = useContext(TransactionActivityContext)
   
    const [expenses, setExpenses] = useState([])
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    

    useEffect(() => {
        
        if (staticDate !== ""){
            axios({
              method: 'GET',
              url: `http://localhost:3001/api/v1/admin_dashboards/${storeName}/expenses`,
              headers: JSON.parse(localStorage.getItem('admin')),
              params: {static_date: staticDate}
            }).then(response => {
              
             console.log(response)
             const {transaction_activity, expenses} = response.data
             console.log(expenses)
             setTransactionActivity(transaction_activity)
             setExpenses(expenses)
            
            }).catch(err => {
        
              console.log(err)
             
              
            })
        
      
          }else{
            axios({
              method: 'GET',
              url: `http://localhost:3001/api/v1/admin_dashboards/${storeName}/expenses`,
              headers: JSON.parse(localStorage.getItem('admin'))
            }).then(response => {
              console.log(response)
              const {transaction_activity, expenses} = response.data
              console.log(expenses)
              setTransactionActivity(transaction_activity)
              setExpenses(expenses)
        
              
            }).catch(err => {
        
              console.log(err)
              
            })
      
      
          }

          return ()=> {
              setExpenses([])
          }
          
          

    }, [])

    return (


       <Box width="100%">

         {
           expenses.map(expense => {
            const {cost, detail, created_at, cashier_name, id} = expense
            const time =  DateTime.fromISO(created_at).toLocaleString(DateTime.TIME_SIMPLE)

            return (
               <Box width="100%" key={id} id={id} p={1}>
                <Accordion expanded={expanded === `panel${id}`} onChange={handleChange(`panel${id}`)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id= {`panel${id}-header`}
                >
                  <Typography className={classes.heading}>₦{cost}</Typography>
                  <Box display="flex" width="100%" justifyContent="center">
                    <Typography className={classes.secondaryHeading}>{cashier_name}</Typography>
                   </Box>
                  
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.detail}>
                    {detail}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              </Box>
            )
           })
         }
       </Box>
      
    )
}

export default ExpensesTable