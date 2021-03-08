import React from 'react'
import {TextField, Container, Grid, CssBaseline, Button, Box, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
   root: {
       backgroundColor: "white",
       borderRadius: "10px",
       width: '29ch'
       
   },
   inputContainer: {
       margin: theme.spacing(3),
       
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

// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//         width: '25ch',
//       },
//     },
//   }));

function LoginForm(){
    const classes = useStyles()
    return (

        // <Container maxWidth="xs" className={classes.root}>
        
        //       <form  noValidate autoComplete="off">

        //           <Grid container>
        //               <Grid item xs={12} className={classes.inputContainer}>
        //                     <TextField id="password" label="Email" variant="outlined" />
        //               </Grid>

        //               <Grid item xs={12} className={classes.inputContainer}>
        //                     <TextField id="password" label="Password" variant="outlined" />
        //               </Grid>
        //           </Grid>
                
        //     </form>

        // </Container>

        <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.root }>
        <form  noValidate autoComplete="off">

                   <Grid container  >
                        <Grid item xs={12} className={classes.inputContainer} >
                             <Box >
                                 <Typography className={classes.headingText} variant="h5">Admin Login</Typography>
                             </Box>
                       </Grid>
                        <Grid item xs={12} className={classes.inputContainer} >
                             <Box >
                                 <img src="static/images/admin.png" className={classes.img}/>
                             </Box>
                       </Grid>

                       <Grid item xs={12} className={classes.inputContainer} >
                             <TextField   className={classes.input} id="password" label="Email" variant="outlined" />
                       </Grid>

                        <Grid item xs={12} className={classes.inputContainer}>
                                <TextField id="password" label="Password" variant="outlined" />
                        </Grid>

                        <Grid item xs={12} className={classes.inputContainer}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                href="#text-buttons"
         
                            >
                                Login
                            </Button>
                       </Grid>


                       
                  </Grid>
                
             </form>
      </Container>
    </React.Fragment>

        
      
    )
}

export default LoginForm