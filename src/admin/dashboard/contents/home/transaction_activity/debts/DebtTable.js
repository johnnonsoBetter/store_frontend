import { Box, Typography, createMuiTheme, TableContainer, makeStyles, Table, Paper, TableCell, TableHead, TableRow, Divider } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TransactionActivityContext from '../../../../../../context/admin/transaction_activity/TransactionActivity'
import {ThemeProvider} from '@material-ui/styles'
import { activitiesApi } from '../../../../../../api/admin/activities/api'
import Loader from '../../../../../dashboard/Loader'
import FailedActivityLoader from '../../FailedActivityLoader'


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
                        
        
                    </Table>
                    </TableContainer>
                </Box>
                <Divider />

                <Box width="100%" marginTop={2}>
                    <Typography style={{color: "white", textAlign:"left"}} > Previous Debts </Typography>
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