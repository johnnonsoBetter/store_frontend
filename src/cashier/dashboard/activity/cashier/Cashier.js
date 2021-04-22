import { Avatar, Box, Button, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { Check, Clear, Flag } from '@material-ui/icons'
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
                <Paper elevation={3} className={classes.paper}>

                    <Grid container spacing={2}>
                    <Grid item md={4}>
                                <Paper elevation={7} style={{backgroundColor: "#071833e8"}} >
                                <Box p={2} style={{color: "white"}} display="flex" justifyContent="space-between">
                                    <Box> 
                                        <Typography>₦4,500</Typography>
                                    </Box>
                                    <Box> 
                                        <Typography> Nov 16</Typography>
                                    </Box>
                                    
                                </Box>

                                <Box  display="flex" justifyContent="center">
                                    <Box p={2}>
                                        <Avatar style={{backgroundColor: "green"}}>
                                        <Flag> </Flag>
                                        </Avatar>
                                        
                                    </Box>
                                </Box>


                                <Box >
                                    <Button  style={{width: "100%", backgroundColor: "#065b6f"}}>More Info </Button>
                                </Box>


                            </Paper>
                        </Grid>

                        <Grid item md={4}>
                                <Paper elevation={7} style={{backgroundColor: "#071833e8"}} >
                                <Box p={2} style={{color: "white"}} display="flex" justifyContent="space-between">
                                    <Box> 
                                        <Typography>₦4,500</Typography>
                                    </Box>
                                    <Box> 
                                        <Typography> Nov 16</Typography>
                                    </Box>
                                    
                                </Box>

                                <Box  display="flex" justifyContent="center">
                                    <Box p={2}>
                                        <Avatar style={{backgroundColor: "gold"}}>
                                            <Flag> </Flag>
                                        </Avatar>
                                        
                                    </Box>
                                </Box>


                                <Box >
                                    <Button  style={{width: "100%", backgroundColor: "#065b6f"}}>More Info </Button>
                                </Box>


                            </Paper>
                        </Grid>

                       

                        <Grid item md={4}>
                                <Paper elevation={7} style={{backgroundColor: "#071833e8"}} >
                                <Box p={2} style={{color: "white"}} display="flex" justifyContent="space-between">
                                    <Box> 
                                        <Typography>₦4,500</Typography>
                                    </Box>
                                    <Box> 
                                        <Typography> Nov 16</Typography>
                                    </Box>
                                    
                                </Box>

                                <Box  display="flex" justifyContent="center">
                                    <Box p={2}>
                                        <Avatar style={{backgroundColor: "red"}}>
                                        <Flag> </Flag>
                                        </Avatar>
                                        
                                    </Box>
                                </Box>


                                <Box >
                                    <Button  style={{width: "100%", backgroundColor: "#065b6f"}}>More Info </Button>
                                </Box>


                            </Paper>
                        </Grid>
                        

                        
                    </Grid>



                    
                </Paper>

            </Box>

        </Container>
       
    )
}

export default Cashier