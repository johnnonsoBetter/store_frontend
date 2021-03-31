import { Box, Typography, createMuiTheme, TableContainer, makeStyles, Table, Paper, TableCell, TableHead, TableRow } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TransactionActivityContext from '../../../../../../context/admin/transaction_activity/TransactionActivity'
import axios from 'axios'
import {ThemeProvider} from '@material-ui/styles'


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
    const {staticDate} = useContext(TransactionActivityContext)
    const {storeName} = useParams()
    const classes = useStyles()


    useEffect(()=> {
        if (staticDate !== ""){
            axios({
              method: 'GET',
              url: `http://localhost:3001/api/v1/admin_dashboards/${storeName}/debts`,
              headers: JSON.parse(localStorage.getItem('admin')),
              params: {static_date: staticDate}
            }).then(response => {
              
             console.log(response)
            const {transaction_activity, previous_pending_debts, daily_debts, cost_of_previous_debts, cost_of_total_debts} = response.data
            

            setCostOfPreviousDebts(cost_of_previous_debts)
            setCostOfTotalDebts(cost_of_total_debts)
            
            
            }).catch(err => {
        
              console.log(err)
            //   setLoading(false)
            //   setFailed(true)
             
              
            })
        
      
          }else{
            axios({
              method: 'GET',
              url: `http://localhost:3001/api/v1/admin_dashboards/${storeName}/debts`,
              headers: JSON.parse(localStorage.getItem('admin'))
            }).then(response => {
                const {transaction_activity, previous_pending_debts, daily_debts, cost_of_previous_debts, cost_of_total_debts} = response.data
                setCostOfPreviousDebts(cost_of_previous_debts)
                setCostOfTotalDebts(cost_of_total_debts)
                console.log(response)
            }).catch(err => {
        
              console.log(err)
            //   setLoading(false)
            //   setFailed(true)
              
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
            <Box width="100%" display="flex" justifyContent="space-between">
                <Typography style={{color: "white"}}> All: ₦{costOfTotalDebts} </Typography>
                <Typography style={{color: "white"}}> Previous: ₦{costOfPreviousDebts} </Typography>
            </Box>

            
            <ThemeProvider theme={theme}>
                <Box width="100%" marginTop={1}>
                    <Typography style={{color: "white"}} variant="h6"> Current Debts </Typography>
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

                <Box width="100%" display="flex"  marginTop={1}>
                    <Typography style={{color: "white"}} variant="h6"> Previous Debts </Typography>
                </Box>

            </ThemeProvider>
            
            
        </Box>
        
    )
}

export default DebtTable