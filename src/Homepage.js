import { Grid, Paper, Box, Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import React from 'react'




const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      minHeight: "100vh"
    },
    miniContaner: {
       
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
    },
    title: {
       margin: "15px",
      
       
    },
    button: {
        width: "100%",
        
        
    },
    paper: {
       padding: theme.spacing(4)
    },
    item: {
        margin: "1em"
    },
    img: {
        maxWidth: "48%",
        height: "auto"
    }
  }));


const Homepage = ()=> {

    const classes = useStyles()
    return (
        <Grid container className={classes.root} >
            <Grid item xs={11}>
                <Box component="span" >
                    Wellcome To Software
                </Box>
            </Grid>
            <Grid item xs={11} sm={5} md={4} className={classes.item}>
                
            
                <Paper>
                
                
                    <Box m={3}>
                        <Grid container className={classes.miniContaner}>
                            <Grid item xs={12} >
                                <Box className={classes.title}> Admin </Box>
                            </Grid>

                            <Grid item xs={12} >
                                <img src='static/images/admin.png' alt="admin_image" className={classes.img}/>
                            </Grid>

                            <Grid item xs={12} >
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                               
                            >
                                Login
                            </Button>
                            </Grid>
                        </Grid>
                       
                        
                       

                    </Box>
                    
               

                    
                </Paper>

            </Grid>

            <Grid item xs={11} sm={5} md={4} className={classes.item}>
                
            <Paper>
                
                
                <Box m={3}>
                    <Grid container>
                        <Grid item xs={12} >
                            <Box className={classes.title}> Cashier </Box>
                        </Grid>

                        <Grid item xs={12} >
                            <img src='static/images/cashbox.png' alt="cashier_image" className={classes.img}/>
                        </Grid>

                        <Grid item xs={12} >
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                           
                        >
                            Login
                        </Button>
                        </Grid>
                    </Grid>
                   
                    
                   

                </Box>
                
           

                
            </Paper>

            </Grid>

        </Grid>
    )
}

export default Homepage