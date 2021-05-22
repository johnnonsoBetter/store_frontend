import { Box, Button, CircularProgress, InputBase, makeStyles, Typography, withStyles } from '@material-ui/core'
import { Email, Person, PersonOutline, VpnKey } from '@material-ui/icons';
import React, { useContext, useState } from 'react'
import { green } from '@material-ui/core/colors';
import { cashier } from '../../../../../api/api';
import CashierContext from '../../../../../context/admin/CashierContext';

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
      borderColor: '#a0a0a0a1',
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

 

function CreateCashier(){

    const [loading, setLoading] = useState(false)
    const classes = useStyles()
    const {store_id, cashiers, setCashiers, setDrawerOpened, setType} = useContext(CashierContext)
    const [failed, setFailed] = useState(false)
    

    const [cashierValue, setCashierValue] = useState({
        name: "",
        email: "",
        password: "",
        salary_balance: "",
        default_salary: "",
        store_id,
    })

    useState(()=> {

        setCashierValue({
            name: "",
            email: "",
            password: "",
            salary_balance: "",
            default_salary: "",
            store_id,
        })

        return ()=>{
            setCashierValue({
                name: "",
                email: "",
                password: "",
                salary_balance: "",
                default_salary: "",
                store_id: ''
            })

            setLoading(false)
            setFailed(false)
        }
    })


    const handleChange = (e) => {

        e.preventDefault()
        const name = e.target.name

        const newValue = Object.assign({}, cashierValue)

        switch(name){
            case "name": 
                newValue['name'] = `${e.target.value}`
            break;
            case "email":
                newValue['email'] = `${e.target.value}`
            break;
            case "password":
                newValue['password'] = `${e.target.value}`
            break;
            case "salary_balance":
                newValue['salary_balance'] = `${e.target.value}`
            break;
            case "default_salary":
                newValue['default_salary'] = `${e.target.value}`
            break;
            default:
            break
        }

        setCashierValue(newValue)

    }



    const handleSubmit = (e) => {

        
        e.preventDefault()
        setLoading(true)

        cashier().signup(cashierValue).then((response) => {

            const {id, name, salary_balance } = response.data['data']
            const newCashiers = [...cashiers, {id, name, salary_balance,}]
            
            setLoading(false)
            setType('')
            setCashiers(newCashiers)
            setDrawerOpened(false)
        }).catch((err) => {
            
            setLoading(false)
            setFailed(true)
            
        })






    }


    return (
        <Box p={2}>
             
            <form onSubmit={handleSubmit}>
                <Box p={1} display="flex" justifyContent="space-between" alignItems="center">
                    <Person />
                    <Input onChange={handleChange} name="name"  placeholder="Name" value={cashierValue['name']}  />
                </Box>
                <Box  p={1} display="flex" justifyContent="space-between" alignItems="center">
                    <Email  />
                    <Input onChange={handleChange} name="email" placeholder="Email"  type="email" value={cashierValue['email']} />
                </Box>
                <Box  p={1} display="flex" justifyContent="space-between" alignItems="center">
                    <VpnKey />
                    <Input onChange={handleChange} name="password" value={cashierValue['password']} placeholder="Password" type="password" />
                </Box>

                <Box marginTop={2} display="flex" >
                    <Box p={1} >
                        <Input onChange={handleChange} name="salary_balance" type="number" placeholder="Salary" value={cashierValue['salary_balance']} />
                        
                    </Box>
                    <Box p={1}>
                        <Input onChange={handleChange} name="default_salary" type="number" placeholder="Default" value={cashierValue['default_salary']}/>
                    </Box>


                </Box>


                <Box display="flex" justifyContent="center" p={2}>
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
            </form>

            {
                failed && 
                <Box display="flex" borderRadius={5} justifyContent="center" p={2} style={{backgroundColor: "red", color: "white"}} >
                <Typography> Failed To Create Cashier </Typography>
                </Box>
            }

            
        </Box>
    )
}

export default CreateCashier