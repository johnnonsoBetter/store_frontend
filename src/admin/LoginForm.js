import React, { useState } from 'react'
import {TextField, Container, Grid, CssBaseline, Button, Box, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios'
import {API_ROOT} from '../apiRoot'

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
       backgroundColor: "white",
       borderRadius: "15px",
       width: '29ch'
       
   },

   formContainer: {

        display: "flex",
        alignContent: "center",
        justifyContent: "center"
   },
   inputContainer: {
       margin: theme.spacing(3),
       fontFamily: font
       
   },
   button: {
    width: "40%",
   },
   img: {
       maxWidth: "15%",
       height: "auto"
   },
   headingText: {
       color: "black"
   }
}))


function LoginForm(){
    const classes = useStyles()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // handles form submit
    const handleSubmit = (e)=>{
        e.preventDefault()
            axios({
                method: 'POST',
                url: `${API_ROOT}api/v1/auth_admin/sign_in`,
                data: {
                    email: email,
                    password: password
                }
            }).then(response => {
                
                localStorage.setItem('admin', 
                    JSON.stringify({
                        'access-token': response.headers['access-token'],
                        'client': response.headers['client'],
                        'uid': response.headers['uid']
                    })
                )

                window.location = '/admin_dashboard'

            }).catch(err => {
               
                setEmail("")
                setPassword("")
            })
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className={classes.formContainer}>
                    <Container maxWidth="sm" className={classes.root }>
                        <form  noValidate autoComplete="off" onSubmit={handleSubmit}>

                                <Grid container  >
                                        <Grid item xs={12} className={classes.inputContainer} >
                                            <Box >
                                                <Typography className={classes.headingText} variant="h5">Admin Login</Typography>
                                            </Box>
                                    </Grid>
                                        <Grid item xs={12} className={classes.inputContainer} >
                                            <Box >
                                                <img src="static/images/admin.png" alt="admin login logo" className={classes.img}/>
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
                    </Container>
                </div>
            </ThemeProvider>
        </React.Fragment>

        
      
    )
}

export default LoginForm