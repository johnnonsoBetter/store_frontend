import { Avatar, Box, Button, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { Check, Clear, Flag } from '@material-ui/icons'
import { DateTime } from 'luxon'
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
        color: "white",
       
       
    }, 
    
    paper: {
        flexGrow: 1,
        padding: theme.spacing(4),
        backgroundColor: "#040a1b",
        color: "white",
        height: "calc(65vh - 200px)",
        overflowY: "auto",

        
    
    },
}))

function Cashier(){
    
    const classes = useStyles()
    const [salaryBalance, setSalaryBalance] = useState('0')

    const [myActivities, setMyActivities] = useState([])

    useEffect(()=> {

        cashierApi().fetchSubmittedReport().then((response) => {

            console.log(response)
            const {cashier_sales_summaries, salary_balance} = response.data
            setSalaryBalance(salary_balance)
            
            setMyActivities([...cashier_sales_summaries])
        }).catch(err => {
            console.log(err)
        })

        return ()=> {
            setMyActivities([])
            setSalaryBalance('0')
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
                <Paper elevation={3} className={classes.paper}>
                    
                    <Grid container spacing={2}>
                        {
                             myActivities.map((activity) => {
                                 
                                    const {id, created_at} = activity
                                    const {transaction_review} = activity
                                    const {final_outcome, total_amount_difference } = transaction_review
                                    const date = new Date(created_at)
                                   
                                    const color = final_outcome === "shortage" ? "red" : final_outcome === "excess" ? "gold" : final_outcome === "balanced" ? "green" : null
                                    
                                    return (
   
                                        <Grid  key={id} item md={4}>
                                            <Paper elevation={7} style={{backgroundColor: "#071833e8"}} >
                                                <Box p={2} style={{color: "white"}} display="flex" justifyContent="space-between">
                                                    <Box> 
                                                        <Typography>₦ {AmountFormater(total_amount_difference).amount()}</Typography>
                                                    </Box>
                                                    <Box> 
                                                        <Typography> {date.getDate()}</Typography>
                                                    </Box>
                                                   
                                                </Box>
               
                                                <Box  display="flex" justifyContent="center">
                                                    <Box p={2}>
                                                        <Avatar style={{backgroundColor: `${color}`}}>
                                                        <Flag> </Flag>
                                                        </Avatar>
                                                       
                                                    </Box>
                                                </Box>
               
               
                                                <Box >
                                                    <Button  style={{width: "100%", backgroundColor: "#065b6f"}}>More Info </Button>
                                                </Box>
           
           
                                        </Paper>
                                        </Grid>
                               
                                )


                                 
                             })
                        }
                           

                        
                    </Grid>



                    
                </Paper>

            </Box>

        </Container>
       
    )
}

export default Cashier