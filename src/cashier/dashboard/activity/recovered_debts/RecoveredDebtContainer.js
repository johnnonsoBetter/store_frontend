import {Box, CircularProgress, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { cashierRecoverDebtApi } from '../../../../api/cashier/activity/api'
import { RecoveredDebtContextProvider } from '../../../../context/cashier/RecoveredDebtContext'
import AmountFormater from '../../../../helpers/AmountFormater'


const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1
    },
    box: {
        flexGrow: 1,
        height: "calc(75vh - 50px)",
       
    },
    
}))

function RecoveredDebtContainer(){   

    const classes = useStyles()
    const [recoveredDebts, setRecoveredDebts] = useState([])
    const [totalAmountRecovered, setTotalAmountRecovered] = useState('0')
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)

    
    useEffect(()=> {

        cashierRecoverDebtApi().fetchAll().then(response => {

            
            const {recovered_debts, total_recovered_amount} = response.data

            setRecoveredDebts(recovered_debts)
            setTotalAmountRecovered(total_recovered_amount)
            setLoading(false)
            
            console.log(response.data)

        }).catch(err => {
            console.log(err)
            setLoading(false)
            setFailed(true)
        })


        return ()=> {
            setRecoveredDebts([])
            setTotalAmountRecovered('0')
            setLoading(true)
        }
    }, [])
    

    return (
        <RecoveredDebtContextProvider
            value={{
               recoveredDebts,
            }}
        >

        
        <Container className={classes.root} >
            
            <Grid spacing={7} container>
                <Grid item xs={8}>
                    <Box    >

                        {
                            loading ? 
                        
                        
                            <Box width="100%" minHeight={400} alignItems="center" display="flex" justifyContent="center">
                                
                                <CircularProgress style={{color: "yellow"}} size={24} />
                            </Box>

                            : 
                            failed ?
                            
                            <Box width="100%"  minHeight={400} alignItems="center" display="flex" justifyContent="center">
                                
                                <Typography style={{color: "white"}}> Failed To Load Recovered Debts </Typography>
                            </Box>

                            : 
                            <Box  >
                                 <Typography style={{color: "white"}} variant="h6"> Total Amount Recovered ₦{AmountFormater(totalAmountRecovered).amount()} </Typography>
                                <Box className={classes.box} display="flex" >
                                
                                </Box>
                               
                               
                            </Box>
                        

                        }
                    </Box>
      
                </Grid>

               
            </Grid>
        </Container>
        </RecoveredDebtContextProvider>
    )
}


export default RecoveredDebtContainer