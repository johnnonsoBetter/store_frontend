import { Box, Button, Grid, Grow, InputBase, makeStyles, Paper, Typography, withStyles } from '@material-ui/core'
import { MonetizationOnRounded } from '@material-ui/icons'
import React, { useContext, useEffect, useState } from 'react'
import { changeApi } from '../../../../api/cashier/activity/api';
import DashboardContext from '../../../../context/cashier/DashboardContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import ChangeContext from '../../../../context/cashier/ChangeContext';

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




function CreateChange(){
    const classes = useStyles()
   
    const {changes,  setChanges, totalChangeBalance, setTotalChangeBalance} = useContext(ChangeContext)

    
    const {showSnackBar} = useContext(DashboardContext)
    const [loading, setLoading] = React.useState(false);
    const [change, setChange] = useState({
        amount: ''

    })

   
    
    const [amount, setAmount] = useState('')
    


    useEffect(()=> {
        return ()=> {
            setChange({
                amount: ''
            })

            setAmount('')
         
        }
    }, [])

    const handleChange = (e) => {

        e.preventDefault()
        const new_change = Object.assign({}, change)
        console.log(new_change)

        const field_name = e.target.name

        new_change['amount'] = e.target.value
        
        setChange(new_change)
        setAmount(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(change)
        changeApi().createChange(change).then(response => {
            
            console.log(response)
            const {id, amount, created_at} = response.data
            const newChange = {
                id: id,
                amount: amount,
                created_at: created_at
            }
            

            

            const newChanges = [...changes, newChange]

            console.log(newChanges)

            setChanges(newChanges)
            setTotalChangeBalance((totalChangeBalance + parseInt(amount)))
            showSnackBar('Successfully Created New Change', true)
            setLoading(false)
            setChange({
                amount: ''
        
            })
            setAmount('')

        }).catch(err => {
            showSnackBar('Failed to create Change', false)
            setLoading(false)
            
        })

    }




    return (
       <Grow in={true}>

       
       <Box className={classes.root} display="flex" justifyContent="center" alignItems="center">
           <Paper elevation={6} className={classes.paper} >
               
           <form onSubmit={handleSubmit}  noValidate autoComplete="off">
              

               

                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-start">
                            <Box boxShadow={30} width={200} borderRadius={6} p={2} className={classes.inputContainer}>
                                <Box textAlign="center">
                                    <Typography variant="h5"> Change </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Typography variant="h5"> <MonetizationOnRounded /> </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Input name="collector" type="number" value={amount} onChange={handleChange} />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                   
                    <Grid item xs={12}>
                        <Box  display="flex" justifyContent="flex-start">
                            {/* <Button type="submit" style={{width: "100%", backgroundColor: "#3f51b5", color: "white"}} > Add </Button> */}
                            <div className={classes.wrapper}>
                                <Button
                                variant="contained"
                                color="primary"
                                
                                disabled={loading}
                                type="submit"
                                >
                                Add Change
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

export default CreateChange