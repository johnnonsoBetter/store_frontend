import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CreateExpense from './CreateExpense'

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1
    }
}))

function ExpensesContainer(){   

    const classes = useStyles()
    const [expenses, setExpenses] = useState([])

    useEffect(()=> {

        return ()=> {
            setExpenses([])
        }
    }, [expenses])




    return (
        <Container className={classes.root} >
            
            <Grid container>
                <Grid item xs={8}>
                <Typography> Side </Typography>
                </Grid>

                <Grid item xs={4}>
                    <CreateExpense />
                </Grid>
            </Grid>
        </Container>
    )
}


export default ExpensesContainer