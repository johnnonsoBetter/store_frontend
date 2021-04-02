import { Box, Typography, TableBody, IconButton, createMuiTheme, TableContainer, makeStyles, Table, Paper, TableCell, TableHead, TableRow, Divider } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TransactionActivityContext from '../../../../../../context/admin/transaction_activity/TransactionActivity'
import {ThemeProvider} from '@material-ui/styles'
import { activitiesApi } from '../../../../../../api/admin/activities/api'
import Loader from '../../../../../dashboard/Loader'
import FailedActivityLoader from '../../FailedActivityLoader'
import ArrowForward from '@material-ui/icons/ArrowForward'
import AmountFormater from '../../../../../../helpers/AmountFormater'
import { DateTime } from 'luxon'


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },

    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),

    },
 
    whiteText:  { 
      color: "white",
      textTransform: "capitalize"
    },
    blackText:  { 
      color: "black",
      textTransform: "capitalize"
    },

    noBottom: {
      borderBottom: "none"
    },
   
   
    saleContainer: {
      // [theme.breakpoints.up('sm')]: {
      //   width: "100%"
      // },
      // width: 320,
    },
    tableComponent: {
      maxHeight: 440
    },
    cell: {
      backgroundColor: "black"
    }
  }));


const theme = createMuiTheme({

    typography: {
      fontFamily: [
        'Kanit',
        'cursive',
      ].join(','),
     
  }
})


function DebtTable(){
    const [dailyDebts, setDailyDebts] = useState([])
    const [previousPendingDebts, setPreviousPendingDebts] = useState([])
    const [costOfTotalDebts, setCostOfTotalDebts] = useState('')
    const [costOfPreviousDebts, setCostOfPreviousDebts] = useState('')
    const {staticDate, setTransactionActivity} = useContext(TransactionActivityContext)
    const {storeName} = useParams()
    const classes = useStyles()
    const debtApi = activitiesApi(storeName, 'debts')
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)


    useEffect(()=> {
        if (staticDate !== ""){
            debtApi.loadDate(staticDate).then(response => {

             const {transaction_activity, previous_pending_debts, daily_debts, cost_of_previous_debts, cost_of_total_debts} = response.data
             setCostOfPreviousDebts(cost_of_previous_debts)
             setCostOfTotalDebts(cost_of_total_debts)
             setDailyDebts(daily_debts)
             
             setPreviousPendingDebts(previous_pending_debts)
             setTransactionActivity(transaction_activity)
             setLoading(false)
             
            
            
            }).catch(err => {
        
              setLoading(false)
              setFailed(true)
              
            })
        
      
          }else{
            debtApi.load().then(response => {
              const {transaction_activity, previous_pending_debts, daily_debts, cost_of_previous_debts, cost_of_total_debts} = response.data
              setCostOfPreviousDebts(cost_of_previous_debts)
              setCostOfTotalDebts(cost_of_total_debts)
              setDailyDebts(daily_debts)
              setPreviousPendingDebts(previous_pending_debts)
              setTransactionActivity(transaction_activity)
              setLoading(false)
            }).catch(err => {
        
             
              setLoading(false)
              setFailed(true)
              
            })
      
      
          }

          return ()=> {
              setCostOfTotalDebts('')
              setCostOfTotalDebts('')
              setDailyDebts([])
              setPreviousPendingDebts([])
          }
    }, [])

    return (
        <Box flexGrow={1}>

            {
              loading ? <Loader /> : 
              failed ? <FailedActivityLoader activity="Debts"/> :
              <>
            <Box width="100%" display="flex" justifyContent="space-between">
                <Typography style={{color: "white"}}> All: ₦{costOfTotalDebts} </Typography>
                <Typography style={{color: "white"}}> Previous: ₦{costOfPreviousDebts} </Typography>
            </Box>

            
            <ThemeProvider theme={theme}>
                <Box width="100%" marginTop={1}>
                    <Typography style={{color: "white", textAlign:"left"}} > Current Debts </Typography>
                    <TableContainer className={classes.tableComponent} component={Paper} style={{backgroundColor: "black"}}>
                    <Table stickyHeader  className={classes.table} aria-label="simple table">
                        <TableHead   style={{backgroundColor: "black"}} className={classes.noBottom}>
                            <TableRow>
                            
                            <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Cost </Typography></TableCell>
                            <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Debtor </Typography> </TableCell>
                            <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Time </Typography> </TableCell>
                             <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Info </Typography> </TableCell>
                           
                            </TableRow>
                        </TableHead>

                        <TableBody style={{backgroundColor: "#040715"}}>

                              {
                                  dailyDebts.map(debt => {

                                      const {id, cost, debtor_name, created_at} = debt
                                     
                                      const time =  DateTime.fromISO(created_at).toLocaleString(DateTime.TIME_SIMPLE)

                                      return (
                                          <TableRow key={id} style={{borderBottom: "none"}}>
                                      
                                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText} >  {`₦ ${AmountFormater(cost).amount()}`} </Typography>   </Box></TableCell>
                                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText} > {debtor_name} </Typography>   </Box></TableCell>

                                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText}> {time} </Typography>   </Box></TableCell>
                                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <IconButton > <ArrowForward style={{color: "#1f87f5"}} /> </IconButton>  </Box></TableCell>
                                          
                                          
                                          </TableRow>
                                      )
                                  })
                              }

{
                                  previousPendingDebts.map(debt => {

                                      const {id, cost, debtor_name, created_at} = debt
                                     
                                      const time =  DateTime.fromISO(created_at).toLocaleString(DateTime.TIME_SIMPLE)

                                      return (
                                          <TableRow key={id} style={{borderBottom: "none", backgroundColor: "#d89b2e"}}>
                                      
                                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.blackText} >  {`₦ ${AmountFormater(cost).amount()}`} </Typography>   </Box></TableCell>
                                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.blackText} > {debtor_name} </Typography>   </Box></TableCell>

                                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.blackText}> {time} </Typography>   </Box></TableCell>
                                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <IconButton > <ArrowForward style={{color: "black"}} /> </IconButton>  </Box></TableCell>
                                          
                                          
                                          </TableRow>
                                      )
                                  })
                              }

                        
                      </TableBody>





                        
        
                    </Table>
                    </TableContainer>
                </Box>
                
                
            </ThemeProvider>
            </>
              }
            
            
        </Box>
        
    )
}

export default DebtTable