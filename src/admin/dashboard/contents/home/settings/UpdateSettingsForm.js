import { Box, Button, CircularProgress, Grid, InputBase, makeStyles, Typography, withStyles } from '@material-ui/core'
import { LocationCity, Phone, Store } from '@material-ui/icons';
import React, { useState } from 'react'
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({

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



const Input = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: '',
      border: '1px solid #ced4da',
      borderColor: '',
      color: "black",
      
      fontSize: 16,
      padding: '7px 10px 5px 7px',
      borderRadius: 5,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        'Kanit',
        'cursive',
      ].join(','),
      '&:focus': {
        borderRadius: 5,
        
        
      },
    },
  }))(InputBase);

function UpdateSettingsForm(){

    const classes = useStyles()
    const [loading, setLoading] = useState(false)


    const handleSubmit = (e) => {

        e.preventDefault()

        console.log("submitting")
    }

 

    return (
        <Box p={2} width="100%" >
            <form onSubmit={handleSubmit}>

                <Box>
                    <Box>
                        <Typography> General Settings </Typography>
                    </Box>
                    <Box marginTop={3}>
                    
                        <Grid container spacing={2} justify="center">
                            <Grid item sm={12} >
                                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" >
                                    <Store />
                                    <Input placeholder="Full Name"/>
                                </Box>
                               
                            </Grid>

                            <Grid item sm={12} >
                                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" >
                                    <Phone />
                                    <Input placeholder="Telephone"/>
                                </Box>
                               
                            </Grid>

                            <Grid item sm={12} >
                                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" >
                                    <LocationCity />
                                    <Input placeholder="Address"/>
                                </Box>
                               
                            </Grid>
                        </Grid>
                    </Box>


                    
                </Box>

                


                <Box marginTop={3}>
                        <Box marginBottom={2}>
                            <Typography> Cashier Settings </Typography>
                        </Box>

                        <Grid container spacing={1} justify="center">
                            <Grid item xs={4} >
                                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" >
                                   
                                    <Input placeholder="Max Excess"/>
                                </Box>
                               
                            </Grid>

                            <Grid item xs={4} >
                                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" >
                                    
                                    <Input placeholder="Mini Excess"/>
                                </Box>
                               
                            </Grid>

                            <Grid item xs={4} >
                                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" >
                                    
                                    <Input placeholder="Sale Limit"/>
                                </Box>
                               
                            </Grid>

                           
                        </Grid>
                    </Box>


                    <Box marginTop={3}>
                        <Box marginBottom={2}>
                            <Typography> Internal Info Settings </Typography>
                        </Box>

                        <Grid container spacing={1} justify="center">
                            <Grid item xs={6} >
                                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" >
                                   
                                    <Input placeholder="Next Day Change"/>
                                </Box>
                               
                            </Grid>

                            <Grid item xs={6} >
                                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" >
                                    
                                    <Input placeholder="Reserve Change"/>
                                </Box>
                               
                            </Grid>

                            

                           
                        </Grid>
                    </Box>


                    <Box p={4} width="100%" display="flex" alignItems="center" justifyContent="center">
                        <div className={classes.wrapper}>
                            <Button
                            variant="contained"
                            color="primary"
                            
                            disabled={loading}
                            type="submit"
                            >
                            Update Settings
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </Box>


                

            </form>
          
        </Box>
    )
}

export default UpdateSettingsForm