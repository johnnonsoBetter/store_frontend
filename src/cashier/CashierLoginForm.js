import React, { useState } from 'react'
import {TextField, Container, Grid, CssBaseline, Button, Box, Typography, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios'

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
   }
}))


function CashierLoginForm(){
    const classes = useStyles()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // handles form submit
    const handleSubmit = (e)=>{
        e.preventDefault()
            axios({
                method: 'POST',
                url: 'http://localhost:3001/api/v1/auth/sign_in',
                data: {
                    email: email,
                    password: password
                }
            }).then(response => {
                
                localStorage.setItem('cashier', 
                    JSON.stringify({
                        'access-token': response.headers['access-token'],
                        'client': response.headers['client'],
                        'uid': response.headers['uid']
                    })
                )

                window.location = '/cashier_dashboard'

            }).catch(err => {
               
                setEmail("")
                setPassword("")
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
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                type="submit"
                                            
                                            >
                                                Login
                                            </Button>
                                    </Grid>


                                    
                                </Grid>

                                </form>


                            </Paper>
                            



                        </Box>
                        
           
            </ThemeProvider>
        </React.Fragment>

        
      
    )
}

export default CashierLoginForm