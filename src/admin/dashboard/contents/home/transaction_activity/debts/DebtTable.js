import { Box, Typography, Drawer, TableBody, IconButton, createMuiTheme, TableContainer, makeStyles, Table, Paper, TableCell, TableHead, TableRow, useMediaQuery, Hidden } from '@material-ui/core'
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
import Sale from '../sales/Sale'
import { DebtContextProvider } from '../../../../../../context/admin/transaction_activity/debts/DebtContext'
import DebtInfo from './DebtInfo'


const useStyles = makeStyles((theme) => ({
    table: {
       
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
    const [drawerOpened, setDrawerOpened] = useState(false)
    const [receipt_id, setReceiptId] = useState('')
    const [debtInfo, setDebtInfo] = useState(null)
    const [debtInfoOpened, setDebtInfoOpened] = useState(true)
    const matches = useMediaQuery('(max-width:600px)')


    const toggleDrawerOpened = (drawerOpened) => {
      setDrawerOpened(drawerOpened)
    }

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

              console.log(response)
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
              setReceiptId('')
          }
    }, [])

    return (
        <DebtContextProvider
          value={{
            debtInfo,
            setDebtInfoOpened,
            setDebtInfo,
            toggleDrawerOpened,
            setReceiptId,
            
          }}
        
        >

        
        <Box width="100%" flexGrow={1}
        
        >

            {
              loading ? <Loader /> : 
              failed ? <FailedActivityLoader activity="Debts"/> :
              
  

            <>
            <ThemeProvider theme={theme}>
              <Drawer anchor="right" open={drawerOpened} onClose={()=> toggleDrawerOpened(false)}>
                <Box width={matches ? window.innerWidth : 320 } className={classes.saleContainer}>
                  {
                    debtInfoOpened ? <DebtInfo /> : <Sale receipt_id={receipt_id} setReceiptId={setReceiptId} toggleSaleDrawer={toggleDrawerOpened} />
                  }
                  

                </Box>
              </Drawer>
              <Box width="100%" display="flex" justifyContent="space-between">
                  <Typography style={{color: "white"}}> All: ₦{costOfTotalDebts} </Typography>
                  <Typography style={{color: "white"}}> Previous: ₦{costOfPreviousDebts} </Typography>
              </Box>

            
           
                <Box width="100%" marginTop={1}>
                    <Typography style={{color: "white", textAlign:"left"}} > Current Debts </Typography>
                    <TableContainer className={classes.tableComponent} component={Paper} style={{backgroundColor: "black"}}>
                    <Table stickyHeader  className={classes.table} aria-label="simple table">
                        <TableHead   style={{backgroundColor: "black"}} className={classes.noBottom}>
                            <TableRow>

                              <Hidden mdUp>
                                <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Cost </Typography></TableCell>
                                <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Info </Typography> </TableCell>
                              </Hidden>
                              
                              <Hidden smDown>
                                  <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Cost </Typography></TableCell>
                                  <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Debtor </Typography> </TableCell>
                                  <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Time </Typography> </TableCell>
                                  <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Info </Typography> </TableCell>
                              </Hidden>
                            
                           
                            {/* <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Debtor </Typography> </TableCell>
                            <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Time </Typography> </TableCell>
                             <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Info </Typography> </TableCell>
                            */}
                            </TableRow>
                        </TableHead>

                        <TableBody style={{backgroundColor: "#040715"}}>

                              {
                                  dailyDebts.map(debt => {

                                      const {id, cost, debtor_name, created_at} = debt
                                     
                                      const time =  DateTime.fromISO(created_at).toLocaleString(DateTime.TIME_SIMPLE)

                                      return (
                                         
                                          
                                          
                                          
                                           <TableRow key={id} style={{borderBottom: "none"}}>
                                             <Hidden smDown>
                                                   <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText} >  {`₦ ${AmountFormater(cost).amount()}`} </Typography>   </Box></TableCell>
                                                     <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText} > {debtor_name} </Typography>   </Box></TableCell>

                                                    <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText}> {time} </Typography>   </Box></TableCell>
                                                         <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <IconButton onClick={()=>  {
                                                        
                                                          toggleDrawerOpened(true)
                                                          setDebtInfo(debt)
                                                          setDebtInfoOpened(true)

                                                       }
                                                        
                                                       } > <ArrowForward style={{color: "#1f87f5"}} /> </IconButton>  </Box></TableCell>


                                             </Hidden>
                                      
                                          

                                          <Hidden mdUp>
                                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText} > {debtor_name} </Typography>   </Box></TableCell>
                                               <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <IconButton onClick={()=>  {
                                                
                                                    toggleDrawerOpened(true)
                                                    setDebtInfo(debt)
                                                    setDebtInfoOpened(true)

                                                }
                                                  
                                                } > <ArrowForward style={{color: "#1f87f5"}} /> </IconButton>  </Box></TableCell>
                                          </Hidden>
                                       
                                          
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
                                            {/*                                       
                                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.blackText} >  {`₦ ${AmountFormater(cost).amount()}`} </Typography>   </Box></TableCell>
                                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.blackText} > {debtor_name} </Typography>   </Box></TableCell>

                                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.blackText}> {time} </Typography>   </Box></TableCell>
                                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <IconButton onClick={()=> {
                                               
                                                toggleDrawerOpened(true)
                                                setDebtInfo(debt)
                                                setDebtInfoOpened(true)
                                              }} > <ArrowForward style={{color: "black"}} /> </IconButton>  </Box></TableCell>
                                           */}


                                           <Hidden smDown >
                                           <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.blackText} >  {`₦ ${AmountFormater(cost).amount()}`} </Typography>   </Box></TableCell>
                                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.blackText} > {debtor_name} </Typography>   </Box></TableCell>

                                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.blackText}> {time} </Typography>   </Box></TableCell>
                                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <IconButton onClick={()=> {
                                               
                                                toggleDrawerOpened(true)
                                                setDebtInfo(debt)
                                                setDebtInfoOpened(true)
                                              }} > <ArrowForward style={{color: "black"}} /> </IconButton>  </Box></TableCell>

                                           </Hidden>


                                           <Hidden mdUp>
                                           <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.blackText} >  {`₦ ${AmountFormater(cost).amount()}`} </Typography>   </Box></TableCell>
                                           <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <IconButton onClick={()=> {
                                               
                                               toggleDrawerOpened(true)
                                               setDebtInfo(debt)
                                               setDebtInfoOpened(true)
                                             }} > <ArrowForward style={{color: "black"}} /> </IconButton>  </Box></TableCell>
                                           </Hidden>

                                          
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
        </DebtContextProvider>
        
    )
}

export default DebtTable