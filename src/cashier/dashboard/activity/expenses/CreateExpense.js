import { Box, Button, Grid, Grow, InputBase, makeStyles, Paper, Typography, withStyles } from '@material-ui/core'
import { AttachMoneyRounded, CreateSharp, PersonRounded } from '@material-ui/icons'
import React, { useContext, useEffect, useState } from 'react'
import { expensesApi } from '../../../../api/cashier/activity/api';
import DashboardContext from '../../../../context/cashier/DashboardContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import ExpensesContext from '../../../../context/cashier/ExpensesContext';

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




function CreateExpense(props){
    const classes = useStyles()

    const {expenses,  setTotalExpenses, setExpenses, totalExpenses} = useContext(ExpensesContext)

    console.log("this is the whole xpe" , props.createExpenseProps)
    const {showSnackBar} = useContext(DashboardContext)
    const [loading, setLoading] = React.useState(false);
    const [expense, setExpense] = useState({
        cost: '',
        detail: ''

    })

   
    
    const [cost, setCost] = useState('')
    const [collector, setCollector] = useState('')
    const [usage, setUsage] = useState('')


    useEffect(()=> {
        return ()=> {
            setExpense({
                cost: '',
                detail: ''
        
            })
            setCollector('')
            setCost('')
            setUsage('')
        }
    }, [])

    const handleChange = (e) => {

        e.preventDefault()
        const new_expense = Object.assign({}, expense)
        console.log(new_expense)

        const field_name = e.target.name

        if (field_name === "cost"){
            setCost(e.target.value)
            new_expense['cost'] = e.target.value
            const detail = `${collector} Collected ₦${e.target.value} for ${usage}`
            new_expense['detail'] = detail
            
        }else if(field_name === "collector"){
            setCollector(e.target.value)
            const detail = `${e.target.value} Collected ₦${cost} for ${usage}`
            new_expense['detail'] = detail
            
        }else {
            setUsage(e.target.value)
            const detail = `${collector} Collected ₦${cost} for ${e.target.value}`
            new_expense['detail'] = detail
        }
        
        
        console.log(expense)
        setExpense(new_expense)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        expensesApi().createExpense(expense).then(response => {
            
            console.log(response)
            const {id, cost, detail, created_at} = response.data
            const newExpense = {
                id: id,
                cost: cost,
                detail: detail,
                created_at: created_at
            }
            

            console.log(expenses)

            const newExpenses = [...expenses, newExpense]

            console.log(newExpenses)

            setExpenses(newExpenses)
            setTotalExpenses((totalExpenses + parseInt(cost)))
            showSnackBar('Successfully created new expenses', true)
            setLoading(false)
            setExpense({
                cost: '',
                detail: ''
        
            })
            setCollector('')
            setCost('')
            setUsage('')

        }).catch(err => {
            showSnackBar('Failed to create Expense', false)
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
                                    <Typography variant="h5"> Collector </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Typography variant="h5"> <PersonRounded /> </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Input name="collector" value={collector} onChange={handleChange} />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end">
                            <Box boxShadow={30} width={200} borderRadius={6} p={2} className={classes.inputContainer}>
                                <Box textAlign="center">
                                    <Typography variant="h5"> Cost </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Typography variant="h5"> <AttachMoneyRounded /> </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Input name="cost" type="number" value={cost} onChange={handleChange}  />
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
                                    <Input name="usage" value={usage} onChange={handleChange} />
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
                                Create Expense
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

export default CreateExpense