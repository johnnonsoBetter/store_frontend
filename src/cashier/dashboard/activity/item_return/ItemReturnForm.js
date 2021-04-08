import { Box, Grid, IconButton, makeStyles, Button, CircularProgress, Slide, Typography } from '@material-ui/core'
import { ArrowBack, CreateSharp } from '@material-ui/icons'
import React, { useContext, useEffect, useState } from 'react'
import CreateItemReturnContext from '../../../../context/cashier/CreateItemReturnContext'
import AmountFormater from '../../../../helpers/AmountFormater'
import {Input} from '../../CustomInput'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    backButton: {
        color: "white"
    },
    itemName: {
        color: "white"
    },
    greenText: {
        color: "#7cdaff",
        borderRadius: 10,
        boxShadow: "1px"

    },
    inputContainer: {
        backgroundColor: "black",
        color: "white"
    }
}))

function ItemReturnForm(){

    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const {itemSoldData, setFormDisplayed, receiptId} = useContext(CreateItemReturnContext)
    const {name, quantity_sold, price_sold_per_unit} = itemSoldData
    const [quantity, setQuantity] = useState('')
    const [reason, setReason] = useState('')
    const [itemReturn, setItemReturn] = useState({})

    useEffect(()=> {
        setItemReturn({
            sale_receipt_id: receiptId,
            item_name: '',
            quantity: '',
            cost: '',
            reason_for_return: ''
        })
        return ()=> {
            setItemReturn(null)
        }
    }, [])

    const handleSubmit =() => {

    }

    const handleChange = (e) => {
        e.preventDefault()

        const fieldName = e.target.name
        const newItemReturn = Object.assign({}, itemReturn)


        if(fieldName === "reason"){
            
            newItemReturn['reason_for_return'] = e.target.value
            setReason(e.target.value)
            setItemReturn(newItemReturn)
        }else {
            newItemReturn['quantity'] = e.target.value
            const cost = (parseInt(e.target.value) * price_sold_per_unit)
            newItemReturn['cost'] = cost
            setQuantity(e.target.value)
            setItemReturn(newItemReturn)
        }



    }
    return (
        <Slide direction="left" in={true}>
            <Box>
                <Box>
                    <IconButton onClick={()=> {setFormDisplayed(false)}} className={classes.backButton} > <ArrowBack> </ArrowBack></IconButton>
                </Box>
                <Box >
                    <Box textAlign="center"> <Typography variant="h6" className={classes.itemName}> {name} </Typography></Box>
                </Box>

                
                    <Box  textAlign="center" className={classes.greenText}  justifyContent="space-around" >
                        <Box p={3}>
                            <Typography variant="h3"> ₦{AmountFormater(price_sold_per_unit).amount()}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h3">{quantity_sold}</Typography>
                        </Box>
                    </Box>

                    <Box p={2}>

                    <form onSubmit={handleSubmit}  noValidate autoComplete="off">
 
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="flex-start">
                                        <Box boxShadow={30} width={100} borderRadius={6} p={1} className={classes.inputContainer}>
                                            <Box textAlign="center">
                                                <Typography variant="h5"> ? </Typography>
                                            </Box>
                                            <Box textAlign="center" >
                                                <Typography variant="h5"> <CreateSharp /> </Typography>
                                            </Box>
                                            <Box textAlign="center" >
                                                <Input placeholder="quantity?" type="number" name="quantity" value={quantity}  onChange={handleChange} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="flex-end">
                                        <Box boxShadow={30} width={200} borderRadius={6} p={2} className={classes.inputContainer}>
                                            <Box textAlign="center">
                                                <Typography variant="h5"> Reason </Typography>
                                            </Box>
                                            <Box textAlign="center" >
                                                <Typography variant="h5"> <CreateSharp /> </Typography>
                                            </Box>
                                            <Box textAlign="center" >
                                                <Input placeholder="reason?" name="reason" value={reason} type="text"  onChange={handleChange} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box   display="flex" justifyContent="flex-start">
                                       
                                        <div className={classes.wrapper}>
                                            <Button
                                            variant="contained"
                                            color="primary"
                                            
                                            disabled={loading}
                                            type="submit"
                                            >
                                            Return Item
                                            </Button>
                                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                        </div>
                                    </Box>
                                </Grid>
                            </Grid>
                            
                        </form>
                    </Box>
               
            </Box>

        </Slide>
        
    )
}

export default ItemReturnForm