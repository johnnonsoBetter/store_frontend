import { Box, Button, ButtonBase, Grid, Grow, InputBase, makeStyles, Paper, Typography, withStyles } from '@material-ui/core'
import { AttachMoneyRounded, CreateSharp, PersonRounded, SearchRounded } from '@material-ui/icons'
import React, { useContext, useEffect, useState } from 'react'
import { expensesApi } from '../../../../api/cashier/activity/api';
import DashboardContext from '../../../../context/cashier/DashboardContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import {Input} from '../../CustomInput'

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





// const Input = withStyles((theme) => ({
//     root: {
//       'label + &': {
//         marginTop: theme.spacing(3),
//       },
//     },
//     input: {
//       borderRadius: 4,
//       position: 'relative',
//       backgroundColor: '',
//       border: '1px solid #ced4da',
//       borderColor: '#a0a0a0a1',
//       color: "#e0bb30",
//       fontSize: 16,
//       padding: '7px 10px 5px 7px',
//       borderRadius: 5,
//       transition: theme.transitions.create(['border-color', 'box-shadow']),
//       // Use the system font instead of the default Roboto font.
//       fontFamily: [
//         'Kanit',
//         'cursive',
//       ].join(','),
//       '&:focus': {
//         borderRadius: 5,
        
        
//       },
//     },
//   }))(InputBase);




function CreateItemReturn(props){
    const classes = useStyles()
  
    const {showSnackBar} = useContext(DashboardContext)
    const [loading, setLoading] = useState(false);
    const [receiptId, setReceiptId] = useState('')
    


    useEffect(()=> {
        return ()=> {
            
        }
    }, [])

    const handleChange = (e) => {

        e.preventDefault()
        
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        // expensesApi().createExpense(expense).then(response => {
            
        //     console.log(response)
        //     const {id, cost, detail, created_at} = response.data
        //     const newExpense = {
        //         id: id,
        //         cost: cost,
        //         detail: detail,
        //         created_at: created_at
        //     }
            

        //     console.log(expenses)

        //     const newExpenses = [...expenses, newExpense]

        //     console.log(newExpenses)

        //     setExpenses(newExpenses)
        //     setTotalExpenses((totalExpenses + parseInt(cost)))
        //     showSnackBar('Successfully created new expenses', true)
        //     setLoading(false)
        //     setExpense({
        //         cost: '',
        //         detail: ''
        
        //     })
        //     setCollector('')
        //     setCost('')
        //     setUsage('')

        // }).catch(err => {
        //     showSnackBar('Failed to create Expense', false)
        //     setLoading(false)
            
        // })

    }




    return (
       <Grow in={true}>

       
       <Box className={classes.root} display="flex" justifyContent="center" >
           <Paper elevation={6} className={classes.paper} >
            
           <form onSubmit={handleSubmit}  noValidate autoComplete="off">
              
                <Box display="flex" >
                    <Input placeholder="Receipt Id" value={receiptId}  />
                    
                            <div className={classes.wrapper}>
                                <Button
                                variant="contained"
                                color="primary"
                                
                                disabled={loading}
                                type="submit"
                                >
                                <SearchRounded />
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                       
                </Box>
               

            </form>
        </Paper>

       </Box>
       </Grow>
    )
}

export default CreateItemReturn