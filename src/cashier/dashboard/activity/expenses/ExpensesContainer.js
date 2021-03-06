import {Box, CircularProgress, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { expensesApi } from '../../../../api/cashier/activity/api'
import { ExpensesContextProvider } from '../../../../context/cashier/ExpensesContext'
import CreateExpense from './CreateExpense'
import ExpensesList from './ExpensesList'

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1
    },
    box: {
        flexGrow: 1,
    
       
    },
    
}))

function ExpensesContainer(){   

    const classes = useStyles()
    const [expenses, setExpenses] = useState([])
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [totalExpenses, setTotalExpenses] = useState('')
    
    useEffect(()=> {

        expensesApi().fetchAll().then(response => {

            const {expenses, total_expenses_cost} = response.data
            setExpenses(expenses)
            setTotalExpenses(total_expenses_cost)
            
            setLoading(false)
            console.log(response.data)

        }).catch(err => {
            console.log(err)
            setLoading(false)
            setFailed(true)
        })


        return ()=> {
            setExpenses([])
            setLoading(true)
        }
    }, [])
    

    return (
        <ExpensesContextProvider
            value={{
                expenses,
                totalExpenses,
                setExpenses,
                setTotalExpenses
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
                                
                                <Typography style={{color: "white"}}> Failed To Load Expenses </Typography>
                            </Box>

                            : 
                            <Box  >
                                 <Typography style={{color: "white"}} variant="h6"> Total Expenses {totalExpenses} </Typography>
                                <Box className={classes.box} display="flex" >
                                <ExpensesList expenses={expenses}  />
                                </Box>
                               
                               
                            </Box>
                        

                        }
                    </Box>
      
                </Grid>

                <Grid item xs={4}>
                    <CreateExpense createExpenseProps = {expenses, setTotalExpenses, setExpenses, totalExpenses} />
                </Grid>
            </Grid>
        </Container>
        </ExpensesContextProvider>
    )
}


export default ExpensesContainer