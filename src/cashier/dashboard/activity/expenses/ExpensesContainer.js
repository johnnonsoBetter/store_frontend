import {Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { expensesApi } from '../../../../api/cashier/activity/expenses'
import CreateExpense from './CreateExpense'

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1
    }
}))

function ExpensesContainer(){   

    const classes = useStyles()
    const [expenses, setExpenses] = useState([])
    const [total_expenses, setTotalExpenses] = useState('')
    
    useEffect(()=> {

        expensesApi().fetchAll().then(response => {

            const {expenses, total_expenses} = response.data
            setExpenses(expenses)
            setTotalExpenses(total_expenses)
            console.log(expenses)

        }).catch(err => {
            console.log(err)
        })


        return ()=> {
            setExpenses([])
        }
    }, [])



    return (
        <Container className={classes.root} >
            
            <Grid container>
                <Grid item xs={8}>
                <Typography> Side </Typography>
                </Grid>

                <Grid item xs={4}>
                    <CreateExpense createExpenseProps = {expenses, setTotalExpenses, setExpenses} />
                </Grid>
            </Grid>
        </Container>
    )
}


export default ExpensesContainer