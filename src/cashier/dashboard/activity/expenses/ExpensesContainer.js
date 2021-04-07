import {Box, CircularProgress, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { expensesApi } from '../../../../api/cashier/activity/expenses'
import CreateExpense from './CreateExpense'
import ExpensesList from './ExpensesList'

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1
    },
    box: {
        flexGrow: 1,
        height: "calc(80vh - 50px)",
       
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

            const {expenses, total_expenses} = response.data
            setExpenses(expenses)
            setTotalExpenses(total_expenses)
            setLoading(false)
            console.log(expenses)

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
        <Container className={classes.root} >
            
            <Grid spacing={7} container>
                <Grid item xs={8}>
                    <Box className={classes.box}   >

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
                            <Box>
                                <ExpensesList />
                            </Box>
                        

                        }
                    </Box>
                   
                    
                </Grid>

                <Grid item xs={4}>
                    <CreateExpense createExpenseProps = {expenses, setTotalExpenses, setExpenses} />
                </Grid>
            </Grid>
        </Container>
    )
}


export default ExpensesContainer