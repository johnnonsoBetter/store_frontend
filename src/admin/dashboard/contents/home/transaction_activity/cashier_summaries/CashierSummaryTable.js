
import { Box, Button, Drawer, Grid, Typography, useMediaQuery } from '@material-ui/core'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TransactionActivityContext from '../../../../../../context/admin/transaction_activity/TransactionActivity'
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../../../../Loader'
import FailedActivityLoader from '../../FailedActivityLoader'
import NoData from '../../NoData'
import { activitiesApi } from '../../../../../../api/admin/activities/api'
import {Person, TrackChangesOutlined } from '@material-ui/icons'
import AmountFormater from '../../../../../../helpers/AmountFormater'
import { CashierSummaryContextProvider } from '../../../../../../context/admin/transaction_activity/cashier_summaries/CashierSummaryContext';
import CashierSummaryInfo from './CashierSummaryInfo';


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


function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

function CashierSummaryTable(){
    const {storeName} = useParams()
    const {staticDate, setTransactionActivity} = useContext(TransactionActivityContext)
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [cashier_summaries, setCashierSummaries] = useState([])
    const classes = useStyles();
    const cashierSummaryApi = activitiesApi(storeName, 'cashier_sales_summaries')
    const [cashierSummaryId, setCashierSummaryId] = useState('')
    const matches = useMediaQuery('max-width:600px')
    const [drawerOpened, setDrawerOpened] = useState(false)
    const [width] = useWindowSize()

    useEffect(() => {
        
        if (staticDate !== ""){
            cashierSummaryApi.loadDate(staticDate).then(response => {

             const {transaction_activity, cashier_sales_summaries} = response.data
             setTransactionActivity(transaction_activity)
             setCashierSummaries(cashier_sales_summaries)
             setLoading(false)
            
            }).catch(err => {
        
              setLoading(false)
              setFailed(true)
             
              
            })
        
      
          }else{
            cashierSummaryApi.load().then(response => {
              const {transaction_activity, cashier_sales_summaries} = response.data
              setTransactionActivity(transaction_activity)
              setCashierSummaries(cashier_sales_summaries)
              setLoading(false)

 
            }).catch(err => {

              setLoading(false)
              setFailed(true)
              
            })
      
      
          }

          return ()=> {
              setCashierSummaries([])
              setLoading(true)
              setFailed(false)
              setCashierSummaryId('')
              setDrawerOpened(false)
          }
          
          

    }, [])

    return (


      <Box  className={classes.root}>
        {
          loading ? <Loader  minHeight={300}/> :
            failed ? <FailedActivityLoader activity="expenses" />
          : 

            <Box widht="100%">
              <CashierSummaryContextProvider
                value={{
                  cashierSummaryId,
                  setCashierSummaryId,
                  setDrawerOpened,
                }}
              > 
              <Drawer anchor="right" width={width} open={drawerOpened} onClose={()=> setDrawerOpened(false)}>
                <Box width={matches ? width : 320 } >
                  <CashierSummaryInfo />
                </Box>
              </Drawer>
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
                                                <Box textAlign="center" p={1}> <Button onClick={()=> {
                                                  setCashierSummaryId(id)
                                                  setDrawerOpened(true)
                                                }} className={classes.reportButton}> View Report </Button>  </Box>
                                            </Box>
                                        </Grid>

                                    )
                                })
                            }

                            
                        </Grid>

                    }     
                </CashierSummaryContextProvider>
            </Box>
        }


     </Box>
        
      
    )
}

export default CashierSummaryTable