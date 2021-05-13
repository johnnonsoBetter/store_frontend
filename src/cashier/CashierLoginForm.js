import React, { useEffect, useState } from 'react'
import {TextField, Container, Grid, CssBaseline, Button, Box, Typography, Paper, CircularProgress} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios'
import { cashierApi } from '../api/cashier/activity/api';
import { green } from '@material-ui/core/colors';

const font = 'Kanit'



const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Kanit',
      'cursive',
    ].join(','),
  },});

const useStyles = makeStyles((theme) => ({
   root: {
     
   
       flexGrow: 1,
       height: "calc(100vh - 50px)"
       
   },

   formContainer: {
    backgroundColor: "white",
    width: 500,
    borderRadius: 7
   },
   inputContainer: {
       margin: theme.spacing(3),
       fontFamily: font,
       
   },
   button: {
    width: "50%",
   },
   img: {
       maxWidth: "15%",
       height: "auto"
   },
   headingText: {
       color: "black"
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


function CashierLoginForm(){
    const classes = useStyles()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [failed, setFailed] = useState(false)

    useEffect(()=> {

        setLoading(false)
    }, [failed])



    // handles form submit
    const handleSubmit = (e)=>{
        e.preventDefault()
        setLoading(true)
            cashierApi().login(email, password).then(response => {
                
                
                const {name, salary_balance} = response.data['data']
                console.log(name)
                console.log(response.data['data'])
                localStorage.setItem('cashier', 
                    JSON.stringify({
                        'access-token': response.headers['access-token'],
                        'client': response.headers['client'],
                        'uid': response.headers['uid'],
                        'name': name,
                        'salary_balance': salary_balance
                    })
                )

                window.location = '/cashier_dashboard'

            }).catch(err => {
               
              
                setFailed(true)
                setLoading(false)
            })
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                
                    
                        <Box display="flex" alignItems="center" justifyContent="center"  className={classes.root}>

                            <Paper elevation={4} className={classes.formContainer} p={5}>


                            <form  noValidate autoComplete="off" onSubmit={handleSubmit}>

                                <Grid container  >
                                        <Grid item xs={12} className={classes.inputContainer} >
                                            <Box >
                                                <Typography className={classes.headingText} variant="h5">Cashier Login</Typography>
                                            </Box>
                                    </Grid>
                                        <Grid item xs={12} className={classes.inputContainer} >
                                            <Box >
                                                <img src="static/images/cashier.png" alt="admin login logo" className={classes.img}/>
                                            </Box>
                                    </Grid>

                                    <Grid item xs={12} className={classes.inputContainer} >
                                            <TextField  value = {email} onChange ={(e) => setEmail(e.target.value)}  className={classes.input} id="password" label="Email" variant="outlined" />
                                    </Grid>

                                        <Grid item xs={12} className={classes.inputContainer}>
                                                <TextField id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="outlined" />
                                        </Grid>

                                        <Grid item xs={12} className={classes.inputContainer}>
                                           <div className={classes.wrapper}>
                                            <Button
                                            variant="contained"
                                            color="primary"
                                            
                                            disabled={loading}
                                            type="submit"
                                            >
                                            Login
                                            </Button>
                                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                            </div>
                                        </Grid>


                                    
                                </Grid>

                                </form>

                                {

                                    failed &&  
                                    <Box p={2} >
                                        <Box p={2}  style={{backgroundColor: "red"}}>
                                            <Typography> Failed To Login, Try Again! </Typography>

                                        </Box>
                                    
                                    </Box>
                                  
                                }



                            </Paper>
                            



                        </Box>
                        
           
            </ThemeProvider>
        </React.Fragment>

        
      
    )
}

export default CashierLoginForm