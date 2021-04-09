import { Box, Button, Grid, Grow, makeStyles, Paper, Typography } from '@material-ui/core'
import { AttachMoneyRounded, BookOutlined, CreateSharp, LocationCity, Person, PersonRounded, Phone } from '@material-ui/icons'
import React, { useContext, useEffect, useState } from 'react'
import { cashierDebtApi, expensesApi } from '../../../../api/cashier/activity/api';
import DashboardContext from '../../../../context/cashier/DashboardContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import ExpensesContext from '../../../../context/cashier/ExpensesContext';
import {Input} from '../../CustomInput'
import DebtContext from '../../../../context/cashier/DebtContext';

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




function CreateDebtContainer(){
    const classes = useStyles()

    const {showSnackBar} = useContext(DashboardContext)
    const [loading, setLoading] = React.useState(false);
    const {currentDebts, setCurrentDebts, setTodayTotal, todayTotal} = useContext(DebtContext)
    const [debt, setDebt] = useState({
        sale_receipt_id: '',
        debtor_name: '',
        debtor_address: '',
        debtor_telephone: ''

    })

    
    const [saleReceiptId, setSaleReceiptId] = useState('')
    const [debtorName, setDebtorName] = useState('')
    const [debtorAddress, setDebtorAddress] = useState('')
    const [debtorTelephone, setDebtorTelephone] = useState('')


    useEffect(()=> {
        return ()=> {
            setDebt({
                receipt_id: '',
                debtor_name: '',
                debtor_address: '',
                debtor_telephone: ''
        
            })
            setSaleReceiptId('')
            setDebtorName('')
            setDebtorTelephone('')
            setDebtorAddress('')
        }
    }, [])

    const handleChange = (e) => {

        e.preventDefault()
        const new_debt = Object.assign({}, debt)
     

        const field_name = e.target.name

        if (field_name === "saleReceiptId"){
            setSaleReceiptId(e.target.value)
            new_debt['receipt_id'] = e.target.value
            
            
        }else if(field_name === "debtorName"){
            setDebtorName(e.target.value)
            new_debt['debtor_name'] = e.target.value
            
        }else if(field_name === "debtorAddress"){
            setDebtorAddress(e.target.value)
            new_debt['debtor_address'] = e.target.value

        }else  {
            setDebtorTelephone(e.target.value)
            new_debt['debtor_telephone'] = e.target.value
        }
        
        
       
         setDebt(new_debt)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        cashierDebtApi().createDebt(debt).then(response => {
            
            const newDebt = response.data
            const newCurrentDebts = [...currentDebts, newDebt]

            showSnackBar('Successfully Created Debt', true)
            setLoading(false)
            setCurrentDebts(newCurrentDebts)
            setTodayTotal((parseInt(todayTotal) + parseInt(newDebt['cost'])))
            setDebt({
                receipt_id: '',
                debtor_name: '',
                debtor_address: '',
                debtor_telephone: ''
        
            })
            setSaleReceiptId('')
            setDebtorName('')
            setDebtorTelephone('')
            setDebtorAddress('')

            

        }).catch(err => {
            console.log(debt)
            showSnackBar('Failed to create Debt', false)
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
                            <Box boxShadow={30} width={200} borderRadius={6} p={1} className={classes.inputContainer}>
                                <Box textAlign="center">
                                    <Typography variant="h5"> Receipt Id </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Typography variant="h5"> <BookOutlined /> </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Input placeholder="receipt id?" name="saleReceiptId" value={saleReceiptId} onChange={handleChange} />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end">
                            <Box boxShadow={30} width={200} borderRadius={6} p={1} className={classes.inputContainer}>
                                <Box textAlign="center">
                                    <Typography variant="h5"> Debtor Name </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Typography variant="h5"> <Person /> </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Input placeholder="name?" name="debtorName"  value={debtorName} onChange={handleChange}  />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-start">
                            <Box boxShadow={30} width={200} borderRadius={6} p={1} className={classes.inputContainer}>
                                <Box textAlign="center">
                                    <Typography variant="h5"> Debtor Telephone </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Typography variant="h5"> <Phone /> </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Input placeholder="phone" name="debtorTelephone" type="number" value={debtorTelephone} onChange={handleChange} />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end">
                            <Box boxShadow={30} width={200} borderRadius={6} p={1} className={classes.inputContainer}>
                                <Box textAlign="center">
                                    <Typography variant="h5"> Debtor Address </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Typography variant="h5"> <LocationCity /> </Typography>
                                </Box>
                                <Box textAlign="center" >
                                    <Input placeholder="address" name="debtorAddress" value={debtorAddress} onChange={handleChange} />
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
                                Create Debt
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

export default CreateDebtContainer