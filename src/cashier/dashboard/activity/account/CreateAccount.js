import { Box, Button, CircularProgress, Grid, Grow, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import {Input} from '../../CustomInput'
import { green } from '@material-ui/core/colors';
import { cashierApi } from '../../../../api/cashier/activity/api';
import DashboardContext from '../../../../context/cashier/DashboardContext';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "calc(100vh - 200px)"
       
    }, 
    paper: {
        flexGrow: 1,
        padding: theme.spacing(2),
        backgroundColor: "rgb(11 18 37)"
    },
    inputContainer: {
        backgroundColor: "black",
        color: "white"
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
      },
      buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
      },
      fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
      },
      buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
    
}))

function CreateAccount(){
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [cash, setCash] = useState('0')
    const [pos, setPos] = useState('0')
    const [transfer, setTransfer] = useState('0')
    const [change, setChange] = useState('0')
    const [cashierSaleSummary, setCashierSaleSummary] = useState({
        total_cash_at_hand: '0',
        total_pos: '0',
        total_transfer: '0',
        next_day_change: '0'
    })
    const {launchSnackBar} = useContext(DashboardContext)


    useEffect(()=> {

        setCashierSaleSummary({
            total_cash_at_hand: cash,
            total_pos: pos,
            total_transfer: transfer,
            next_day_change: change
        })

        return ()=> {
            //clean up 
            setCashierSaleSummary({
                total_cash_at_hand: '0',
                total_pos: '0',
                total_transfer: '0',
                next_day_change: '0'
            })
        }
    }, [cash, transfer, pos, change])



    const handleSubmit = (e)=> {
        
        e.preventDefault()
        setLoading(true)
        cashierApi().submitAccount(cashierSaleSummary).then((response) => {

            launchSnackBar("Thanks! Account Submitted for processing ", 'success')
           setLoading(false)
           setCash('0')
           setPos('0')
           setTransfer('0')
           setChange('0')
        }).catch(err => {
            launchSnackBar("Opps Something went wrong Please try again", "secondary")
            setLoading(false)
        })  
    }


    const handleChange = (e) => {

       const value = e.target.value
       const name = e.target.name

       if(name === "cash"){
           setCash(value)
       }else if(name === "pos"){
           setPos(value)
       }else if(name === "transfer"){
           setTransfer(value)
       }else if(name === "change"){
           setChange(value)
       }else{

       }


    }


    return (
        <Grow in={true}>

       
       <Box width="100%" className={classes.root} display="flex" justifyContent="center" alignItems="center">
           <Paper elevation={6} className={classes.paper} >
               
           <form onSubmit={handleSubmit}    noValidate autoComplete="off">
                <Grid container justify="center"  spacing={3}>
                    <Grid item xs={6}>
                        <Box display="flex" justifyContent="center">
                            <Box boxShadow={30} width={200} borderRadius={6} p={2} className={classes.inputContainer}>
                                <Box textAlign="center">
                                    <Typography variant="h6"> Cash At Hand </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Typography variant="h5">  </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Input type="number" value={cash} onChange={handleChange} name="cash" placeholder="cash?"    />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                   {/* } <Grid item xs={6}>
                        <Box display="flex" justifyContent="center">
                            <Box boxShadow={30} width={200} borderRadius={6} p={2} className={classes.inputContainer}>
                                <Box textAlign="center">
                                    <Typography variant="h6"> Total Pos </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Typography variant="h5">  </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Input type="number" value={pos} name="pos"  placeholder="pos?" onChange={handleChange}   />
                                </Box>
                            </Box>
                        </Box>
                    </Grid> */ }

                    <Grid item xs={6}>
                        <Box display="flex" justifyContent="center">
                            <Box boxShadow={30} width={200} borderRadius={6} p={2} className={classes.inputContainer}>
                                <Box textAlign="center">
                                    <Typography variant="h6"> Total Transfer </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Typography variant="h5">  </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Input type="number" value={transfer} name="transfer" placeholder="transfer?"  onChange={handleChange}  />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    {/* <Grid item xs={6}>
                        <Box display="flex" justifyContent="center">
                            <Box boxShadow={30} width={200} borderRadius={6} p={2} className={classes.inputContainer}>
                                <Box textAlign="center">
                                    <Typography variant="h6"> Next Day Change </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Typography variant="h5">  </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Input type="number" value={change} name="change" placeholder="next change?" onChange={handleChange}   />
                                </Box>
                            </Box>
                        </Box>
                    </Grid> */ }

                    <Grid item xs={6}>
                         <Box  display="flex"  justifyContent="center">
                            <div className={classes.wrapper}>
                                <Button
                                variant="contained"
                                color="primary"
                                
                                disabled={loading}
                                type="submit"
                                >
                                Submit Account
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                        </Box>
                    </Grid>

                    
                </Grid>
                
            </form>
        </Paper>

       </Box>
       </Grow>
    )
}

export default CreateAccount