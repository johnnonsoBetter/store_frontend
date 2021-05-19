import { Box, Button, CircularProgress, Grid, InputBase, makeStyles, Typography, withStyles } from '@material-ui/core'
import { LocationCity, Phone, Receipt, Store } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react'
import { green } from '@material-ui/core/colors';
import SettingsContext from '../../../../../context/admin/settings/SettingsContext';


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
    const {storeInfo} = useContext(SettingsContext)
    const {address, cashier_sale_limit, change_balance, full_name, max_excess, mini_excess, next_day_change, receipt_remark, telephone} = storeInfo
    const [info, setInfo] = useState({})

    useEffect(() => {

        setInfo({
            next_day_change,
            full_name,
            address,
            telephone,
            max_excess,
            mini_excess,
            receipt_remark,
            change_balance,
            cashier_sale_limit,
        })


    }, [])

    const handleSubmit = (e) => {
        console.log(info)
        e.preventDefault()

        console.log("submitting")
    }

    const handleChange = (e) => {
        e.preventDefault()

        console.log(e.target.name)

        const name = e.target.name
        const value = e.target.vale

        const newInfo = Object.assign({}, info)
        console.log(newInfo)

        switch(name){
            case "full_name" :
                newInfo['full_name'] = `${e.target.value}`
            break;
            case "address" : 
                newInfo['address'] = `${e.target.value}`
            break;
            case "cashier_sale_limit" : 
                newInfo['cashier_sale_limit'] = `${e.target.value}`
            break;
            case "change_balance" : 
                newInfo['change_balance'] = `${e.target.value}`
            break;
            case "max_excess" : 
                newInfo['max_excess'] = `${e.target.value}`
            break;
            case "mini_excess" : 
                newInfo['mini_excess'] = `${e.target.value}`
            break;
            case "next_day_change" : 
                newInfo['next_day_change'] = `${e.target.value}`
            break;
            case "receipt_remark" : 
                newInfo['receipt_remark'] = `${e.target.value}`
            break;
            case "telephone" : 
                newInfo['telephone'] = `${e.target.value}`
            break;

        }
        

        

        setInfo(newInfo)

     

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
                                    <Input onChange = {handleChange} name="full_name" value={info['full_name']} placeholder="Full Name"/>
                                </Box>
                               
                            </Grid>

                            <Grid item sm={12} >
                                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" >
                                    <Phone />
                                    <Input type="number" onChange = {handleChange} name="telephone" value={info['telephone']} placeholder="Telephone"/>
                                </Box>
                               
                            </Grid>

                            <Grid item sm={12} >
                                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" >
                                    <LocationCity />
                                    <Input onChange = {handleChange} name="address" value={info['address']} placeholder="Address"/>
                                </Box>
                               
                            </Grid>

                            <Grid item sm={12} >
                                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" >
                                    <Receipt />
                                    <Input onChange = {handleChange} name="receipt_remark" value={info['receipt_remark']} placeholder="Receipt Remark"/>
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
                                   
                                    <Input type="number" onChange = {handleChange} name="max_excess" value={info['max_excess']} placeholder="Max Excess"/>
                                </Box>
                               
                            </Grid>

                            <Grid item xs={4} >
                                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" >
                                    
                                    <Input type="number" onChange = {handleChange} name="mini_excess" value={info['mini_excess']} placeholder="Mini Excess"/>
                                </Box>
                               
                            </Grid>

                            <Grid item xs={4} >
                                <Box width="100%" onChange = {handleChange} name="cashier_sale_limit"  display="flex" alignItems="center" justifyContent="space-between" >
                                    
                                    <Input type="number" onChange = {handleChange} name="cashier_sale_limit" value={info['cashier_sale_limit']} placeholder="Sale Limit"/>
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
                                   
                                    <Input type="number" onChange = {handleChange} name="next_day_change" value={info['next_day_change']} placeholder="Next Day Change"/>
                                </Box>
                               
                            </Grid>

                            <Grid item xs={6} >
                                <Box width="100%" onChange = {handleChange} name="change_balance" display="flex" alignItems="center" justifyContent="space-between" >
                                    
                                    <Input type="number" value={info['change_balance']} placeholder="Reserve Change"/>
                                </Box>
                               
                            </Grid>

                            

                           
                        </Grid>
                    </Box>


                    <Box p={4} width="100%" display="flex" alignItems="center" justifyContent="center">
                        <div classonChange = {handleChange} name={classes.wrapper}>
                            <Button
                            variant="contained"
                            color="primary"
                            
                            disabled={loading}
                            type="submit"
                            >
                            Update Settings
                            </Button>
                            {loading && <CircularProgress size={24} classonChange = {handleChange} name={classes.buttonProgress} />}
                        </div>
                    </Box>


                

            </form>
          
        </Box>
    )
}

export default UpdateSettingsForm