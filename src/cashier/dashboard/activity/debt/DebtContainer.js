import {Box, CircularProgress, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { cashierDebtApi } from '../../../../api/cashier/activity/api'
import {DebtContextProvider} from '../../../../context/cashier/DebtContext'


const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1
    },
    box: {
        flexGrow: 1,
        height: "calc(75vh - 50px)",
       
    },
    
}))

function DebtContainer(){   

    const classes = useStyles()
    const [debts, setDebts] = useState([])
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
 
    
    useEffect(()=> {

        cashierDebtApi().fetchAll().then(response => {

            // const {debts, total_debts_cost} = response.data
            // setDebts(debts)
            // setTotaldebts(total_debts_cost)
            
            // setLoading(false)
            console.log(response.data)

        }).catch(err => {
            console.log(err)
            setLoading(false)
            setFailed(true)
        })


        return ()=> {
            setDebts([])
            setLoading(true)
        }
    }, [])
    

    return (
        <DebtContextProvider
            value={{
                
                setDebts,
                
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
                                
                                <Typography style={{color: "white"}}> Failed To Load Debts </Typography>
                            </Box>

                            : 
                            <Box  >
                                 <Typography style={{color: "white"}} variant="h6"> Total debts </Typography>
                                <Box className={classes.box} display="flex" >
                                {/* <debtsList debts={debts}  /> */}
                                </Box>
                               
                               
                            </Box>
                        

                        }
                    </Box>
      
                </Grid>

                <Grid item xs={4}>
                    {/* <CreateExpense createExpenseProps = {debts, setTotaldebts, setDebts, totaldebts} /> */}
                </Grid>
            </Grid>
        </Container>
        </DebtContextProvider>
    )
}


export default DebtContainer