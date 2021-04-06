import { Box, Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import CashierLoginForm from './CashierLoginForm'
import CashierDashboard from './dashboard/CashierDashboard'






const useStyles = makeStyles((theme) => ({
   
 }))
 
 

function CashierPage(){
    const classes = useStyles()

    const currentCashier = localStorage.getItem('cashier')

    return (
        <Container maxWidth="xl" className={classes.root}>
            {
                currentCashier ? 
                <CashierDashboard />
                : <CashierLoginForm />
            }
           
        </Container>
       
    )
}

export default CashierPage
