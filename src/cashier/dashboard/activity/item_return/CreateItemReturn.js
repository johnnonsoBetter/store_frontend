import { Box, Button, ButtonBase, Divider, Grid, Grow, IconButton, InputBase, List, ListItem, ListItemText, makeStyles, Paper, Typography, withStyles } from '@material-ui/core'
import { AttachMoneyRounded, CreateSharp, Launch, PersonRounded, SearchRounded } from '@material-ui/icons'
import React, { useContext, useEffect, useState } from 'react'
import { cashierSalesApi, expensesApi } from '../../../../api/cashier/activity/api';
import DashboardContext from '../../../../context/cashier/DashboardContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import {Input} from '../../CustomInput'
import { salesApi } from '../../../../api/shared/sale/api';
import { CreateItemReturnContextProvider } from '../../../../context/cashier/CreateItemReturnContext';
import ItemsSold from './ItemsSold';
import ItemReturnForm from './ItemReturnForm';

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





function CreateItemReturn(props){
    const classes = useStyles()
  
    const {showSnackBar} = useContext(DashboardContext)
    const [loading, setLoading] = useState(false);
    const [receiptId, setReceiptId] = useState('')
    const [itemsSoldListDisplayed, setItemSoldListDisplayed] = useState(false)
    const [itemsSold, setItemsSold] = useState([])
    const [notFound, setNotFound] = useState(false)
    const [itemReturn, setItemReturn] = useState(null)

    const [itemSoldData, setItemSoldData] = useState(null)
    const [formDisplayed, setFormDisplayed] = useState(false)

    useEffect(()=> {

        setItemSoldData({
            name: '',
            quantitySold: '',
            priceSoldPerUnit: ''
        })

        setItemReturn({
            item_name: '',
            cost: '',
            sale_receipt_id: '',
            quantity: '',
            reason_for_return: ''
        })

        return ()=> {
            setReceiptId('')
            setLoading(true)
            setItemsSold([])
            setItemSoldListDisplayed(false)
            setItemSoldData(null)
            setItemReturn(null)

        }
    }, [])


    const handleChange = (e) => {

        e.preventDefault()

        setReceiptId(e.target.value)
        
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (receiptId === '')
            return

        setNotFound(false)
        setLoading(true)
        setItemSoldListDisplayed(false)
        
        

        cashierSalesApi().fetchByReceiptId(receiptId).then((response) => {

        
            const {item_solds} = response.data
            console.log(item_solds)
            setItemsSold(item_solds)
            setItemSoldListDisplayed(true)
            setLoading(false)
            
        }).catch((err) => {

           
            setLoading(false)

            console.log(err)
            setNotFound(true)

            
        })
    }

    return (
        <CreateItemReturnContextProvider
            value={{
                itemsSold,
                setItemReturn,
                itemReturn,
                setFormDisplayed,
                setItemSoldData,
                itemSoldData,
                receiptId,
            
            }}
        >
       <Grow in={true}>
        <Box className={classes.root} display="flex" justifyContent="center" >
            <Paper elevation={6} className={classes.paper} >

                { 

                    formDisplayed ? <ItemReturnForm /> :


                   <Box> 
                    <form onSubmit={handleSubmit}  noValidate autoComplete="off">
                        
                        <Box display="flex" >
                            <Input disabled={loading} placeholder="Receipt Id" value={receiptId} onChange={handleChange}  />
                            
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
                    {
                        itemsSoldListDisplayed ?
                        
                        <ItemsSold /> : notFound ? 
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight={600}>

                            <Typography style={{color: "white"}}> Sale Not Found </Typography>

                        </Box>
                        : null
                    }
                    </Box>
                    
                }
                
            </Paper>

        </Box>
       </Grow>
       </CreateItemReturnContextProvider>
    )
}

export default CreateItemReturn