import { Box, Button, Card, CardContent, CardHeader, Grid, Grow, InputBase, makeStyles, Paper, TextField, Typography, withStyles } from '@material-ui/core'
import { AttachMoneyRounded, CreateSharp, MonetizationOnRounded, MoneyRounded, Person, PersonRounded } from '@material-ui/icons'
import React from 'react'

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
        height: "calc(80vh - 50px)"
       
    }, 
    paper: {
        flexGrow: 1,
        padding: theme.spacing(2),
        backgroundColor: "rgb(11 18 37)"
    },
    inputContainer: {
        backgroundColor: "black",
        color: "white"
    }
  
}))



const Input = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '0px solid #ced4da',
      fontSize: 16,
      padding: '5px 10px 5px 7px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        'Kanit',
        'cursive',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);




function CreateExpense(){
    const classes = useStyles()

    return (
       <Grow in={true}>

       
       <Box className={classes.root} display="flex" justifyContent="center" alignItems="center">
           <Paper elevation={6} className={classes.paper} >
               
           <form  noValidate autoComplete="off">
              

               

                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-start">
                            <Box boxShadow={30} width={200} borderRadius={6} p={2} className={classes.inputContainer}>
                                <Box textAlign="center">
                                    <Typography variant="h5"> Collector </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Typography variant="h5"> <PersonRounded /> </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Input />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end">
                            <Box boxShadow={30} width={200} borderRadius={6} p={2} className={classes.inputContainer}>
                                <Box textAlign="center">
                                    <Typography variant="h5"> Amount </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Typography variant="h5"> <AttachMoneyRounded /> </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Input />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-start">
                            <Box boxShadow={30} width={200} borderRadius={6} p={2} className={classes.inputContainer}>
                                <Box textAlign="center">
                                    <Typography variant="h5"> Usage </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Typography variant="h5"> <CreateSharp /> </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Input />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-start">
                            <Button  style={{width: "100%", backgroundColor: "#3f51b5", color: "white"}} > Add </Button>
                        </Box>
                    </Grid>
                </Grid>
                
            </form>
        </Paper>

       </Box>
       </Grow>
    )
}

export default CreateExpense