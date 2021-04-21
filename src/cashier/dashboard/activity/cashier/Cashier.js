import { Box, Container, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { cashierApi } from '../../../../api/cashier/activity/api'
import AmountFormater from '../../../../helpers/AmountFormater'

const useStyles = makeStyles((theme) => ({
    container: {
        color: "white"
    },
    root: {
        flexGrow: 1,
        height: "calc(100vh - 200px)",
        color: "white"
       
    }, 
    paper: {
        flexGrow: 1,
        padding: theme.spacing(2),
        backgroundColor: "rgb(11 18 37)",
        color: "white"
    },
}))

function Cashier(){
    const salaryBalance = JSON.parse(localStorage.cashier)['salary_balance']
    const classes = useStyles()

    const [myActivities, setMyActivities] = useState([])

    useEffect(()=> {

        cashierApi().fetchSubmittedReport().then((response) => {

            console.log(response)
        }).catch(err => {
            console.log(err)
        })

        return ()=> {
            setMyActivities([])
        }

    }, [])



    return (

        <Container >
             <Box  className={classes.root}>
                <Box p={3}>
                    <Typography style={{color: "white"}}> Salary Balance: ₦{AmountFormater(salaryBalance).amount()} </Typography>
                </Box>

                <Box p={3}>
                    <Typography variant="h6" style={{color: "white"}}> My Activities </Typography>
                </Box>
                <Paper elevation={6} className={classes.paper}>
                    <Box>
                        <Box p={3 }>
                            <Typography>Excess</Typography>
                        </Box>
                    </Box>
                </Paper>

            </Box>

        </Container>
      
    )
}

export default Cashier