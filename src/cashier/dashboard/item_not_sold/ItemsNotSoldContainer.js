import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import React, { useContext, useEffect, useState } from 'react'
import DashboardContext from '../../../context/cashier/DashboardContext'
import AmountFormater from '../../../helpers/AmountFormater'
import { green } from '@material-ui/core/colors';
import { cashierSalesApi } from '../../../api/cashier/activity/api'
import Dexie from 'dexie'


const useStyles = makeStyles((theme) => ({
    saleContainer: {
        borderRadius: 5,
        color: "white",
        backgroundColor: "#18710e"
    },
    container: {
        height: "calc(100vh - 200px)",
        overflowY: "auto"
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


const actualPayment = (sale) => {
    if (sale['transaction_type'] === "pos_cashback"){
        return sale['pos_amount']
    }else if(sale['transaction_type'] === "transfer_cashback"){
        return sale['transfer_amount']
    }
        
    return sale['total_amount_paid']
}

function ItemsNotSoldContainer(){

    const {setUnSoldSales, unSoldSales, launchSnackBar} = useContext(DashboardContext)
    const [loading, setLoading] =  useState(false)

    
    const classes = useStyles()

    const resale =(sale)=> {
        setLoading(true)
        const {receipt_id, total_amount_paid,  total_items_amount, transaction_type, transfer_amount, cash_amount, cashback_profit, discount, issue, pos_amount, receipt_was_issued, items} = sale

        console.log(sale)
        const the_id = sale.id

        var db = new Dexie('storeDb')

        db.version(1).stores({
            salesNotSold: '++id, receipt_id, issue, receipt_was_issued, total_items_amount, total_amount_paid, discount, transaction_type, cash_amount, cashback_profit, pos_amount, transfer_amount, items'
        })

        const filteredUnSoldSales = unSoldSales.filter((the_sale) => the_sale.id != the_id)

        console.log(filteredUnSoldSales)

        const real_sale = {
            receipt_id,
            total_amount_paid,
            total_items_amount,
            transaction_type,
            transfer_amount,
            cash_amount,
            cashback_profit,
            discount,
            issue,
            pos_amount,
            receipt_was_issued,
            items,
        }

        cashierSalesApi().performTransaction(real_sale).then((response) => {
            
        
            db.salesNotSold.delete(the_id).then((res) => {
                setLoading(false)
                setUnSoldSales(filteredUnSoldSales)
                launchSnackBar(`Thanks, Your Transaction Is Being Processed!`,'success')
                setLoading(false)
            })


        }).catch(err => {
            launchSnackBar(`Oopss Something went wrong!`,'warning')
            setLoading(false)
        })
    }
 
    
    return (
        <Box className={classes.container}>

        {
            unSoldSales.map(sale => {
                const {receipt_id, total_amount_paid,  total_items_amount, transaction_type, transfer_amount, cash_amount, cashback_profit, discount, issue, pos_amount, receipt_was_issued, items} = sale


                return (
                    <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography className={classes.heading}>₦{AmountFormater(total_items_amount).amount()}</Typography>
                
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        <Grid item xs={6} >
                            <Box width="100%">
                                <Typography> Transaction Info</Typography> 
                                <Box  width="100%"  >
                                    <Box p={1} display="flex" justifyContent="space-between">

                                        <Box>
                                            <Typography variant="h6"> Total Amount:</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="h6">  ₦{AmountFormater(total_items_amount).amount()}</Typography>
                                        </Box>

                                    </Box>

                                    <Box p={1} display="flex" justifyContent="space-between">

                                        <Box>
                                            <Typography variant="h6"> Items Payment:</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="h6" > ₦{AmountFormater(total_amount_paid).amount()}</Typography>
                                        </Box>

                                    </Box>

                                    {
                                        parseInt(discount) !== 0 && 
                                

                                        <Box p={1} display="flex" justifyContent="space-between">

                                            <Box>
                                                <Typography variant="h6"> Discount:</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h6" className={classes.infoText}>  ₦{AmountFormater(discount).amount()}</Typography>
                                            </Box>

                                        </Box>
                                    }

                                    <Box p={1} display="flex" justifyContent="space-between">

                                        <Box>
                                            <Typography variant="h6"> Transaction:</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="h6">  {transaction_type} </Typography>
                                        </Box>

                                    </Box>

                                    {
                                        transaction_type === "cash" ?
                                        <Box p={1} display="flex" justifyContent="space-between">

                                            <Box>
                                                <Typography variant="h6"> Cash:</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h6"> ₦{AmountFormater(cash_amount).amount()} </Typography>
                                            </Box>
                
                                        </Box>

                                        : transaction_type === "pos" ? 
                                            <Box p={1} display="flex" justifyContent="space-between">

                                                <Box>
                                                    <Typography variant="h6"> Pos:</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6">  ₦{AmountFormater(pos_amount).amount()} </Typography>
                                                </Box>

                                            </Box>

                                        : transaction_type === "transfer" ? 
                                            <Box p={1} display="flex" justifyContent="space-between">

                                                <Box>
                                                    <Typography variant="h6"> Transfer:</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6">  ₦{AmountFormater(transfer_amount).amount()} </Typography>
                                                </Box>

                                            </Box>
                                        
                                        : transaction_type === "pos_cashback" ? 
                                            <>
                                            <Box p={1} display="flex" justifyContent="space-between">

                                                <Box>
                                                    <Typography variant="h6"> Pos:</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6">  ₦{AmountFormater(pos_amount).amount()} </Typography>
                                                </Box>

                                            </Box>

                                            <Box p={1} display="flex" justifyContent="space-between">

                                                <Box>
                                                    <Typography variant="h6"> Cash Payout:</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6">  ₦{AmountFormater(cash_amount).amount()} </Typography>
                                                </Box>

                                            </Box>

                                            <Box p={1} display="flex" justifyContent="space-between">

                                                <Box>
                                                    <Typography variant="h6"> Charges:</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6">  ₦{AmountFormater(cashback_profit).amount()} </Typography>
                                                </Box>

                                            </Box>
                                            </>

                                        : transaction_type === "transfer_cashback" ? 
                                        <>
                                        <Box p={1} display="flex" justifyContent="space-between">

                                            <Box>
                                                <Typography variant="h6"> Transfer:</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h6">  ₦{AmountFormater(transfer_amount).amount()} </Typography>
                                            </Box>

                                        </Box>

                                        <Box p={1} display="flex" justifyContent="space-between">

                                            <Box>
                                                <Typography variant="h6"> Cash Payout:</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h6">  ₦{AmountFormater(cash_amount).amount()} </Typography>
                                            </Box>

                                        </Box>

                                        <Box p={1} display="flex" justifyContent="space-between">

                                            <Box>
                                                <Typography variant="h6"> Charges:</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h6">  ₦{AmountFormater(cashback_profit).amount()} </Typography>
                                            </Box>

                                        </Box>
                                        </>

                                        : transaction_type === "transfer_cash" ? 
                                        <>
                                        <Box p={1} display="flex" justifyContent="space-between">

                                            <Box>
                                                <Typography variant="h6"> Transfer:</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h6">  ₦{AmountFormater(transfer_amount).amount()} </Typography>
                                            </Box>

                                        </Box>

                                        <Box p={1} display="flex" justifyContent="space-between">

                                            <Box>
                                                <Typography variant="h6"> Cash:</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h6">  ₦{AmountFormater(cash_amount).amount()} </Typography>
                                            </Box>

                                        </Box>
                                        </>

                                        : transaction_type === "pos_cash" ? 
                                        <>
                                        <Box p={1} display="flex" justifyContent="space-between">

                                            <Box>
                                                <Typography variant="h6"> Pos:</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h6">  ₦{AmountFormater(pos_amount).amount()} </Typography>
                                            </Box>

                                        </Box>

                                        <Box p={1} display="flex" justifyContent="space-between">

                                            <Box>
                                                <Typography variant="h6"> Cash:</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h6">  ₦{AmountFormater(cash_amount).amount()} </Typography>
                                            </Box>

                                        </Box>
                                        </>

                                        : transaction_type === "pos_transfer" ? 
                                        <>
                                        <Box p={1} display="flex" justifyContent="space-between">

                                            <Box>
                                                <Typography variant="h6"> Pos:</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h6">  ₦{AmountFormater(pos_amount).amount()} </Typography>
                                            </Box>

                                        </Box>

                                        <Box p={1} display="flex" justifyContent="space-between">

                                            <Box>
                                                <Typography variant="h6"> Transfer:</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h6">  ₦{AmountFormater(transfer_amount).amount()} </Typography>
                                            </Box>

                                        </Box>
                                        </>
                                        : null
                                        
                
                                        
                                    }

                                    <Box p={1} display="flex" alignItems="center" justifyContent="space-between">

                                    <Box>
                                        <Typography variant="h6" > Actual Payment:</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" className={classes.infoText}>  ₦{AmountFormater(actualPayment(sale)).amount()}</Typography>
                                    </Box>
                                    

                                    </Box>
                                    <Box>
                                       <div className={classes.wrapper}>
                                            <Button
                                            variant="contained"
                                            color="primary"
                                            
                                            disabled={loading}
                                            onClick={()=> {
                                                resale(sale)
                                            }}

                                            >
                                            Resale
                                            </Button>
                                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                        </div>
                                    </Box>
                                </Box>

               
                            </Box>
                        </Grid>

                        <Grid item xs={6} >
                        <Typography> Items</Typography> 
                        <Box className={classes.itemList}>

                            {
                                items.map((item, index) => {
                                const {name, price_sold_per_unit, quantity_sold} = item
                                    return (
                                        <Box display="flex" className={classes.itemSold} key={index} justifyContent="space-around" alignItems="center">
                                            <Box p={1}  display="flex" justifyContent="center" width="35%">
                                                <Typography  className={classes.infoText} > {name} </Typography>
                                            </Box>
                                            <Box p={1}  display="flex" justifyContent="center" width="35%">
                                                <Typography  className={classes.infoText} > {quantity_sold} </Typography>
                                            </Box>
                                            <Box p={1}  display="flex" justifyContent="center" width="35%">
                                                <Typography  className={classes.infoText} > ₦{AmountFormater(price_sold_per_unit).amount()} </Typography>
                                            </Box>
                                            
                                        </Box>


                                    )
                                })
                            }
        
                        </Box>


                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

                )
            })
        }
            

            
         
        </Box>
    )
}

export default ItemsNotSoldContainer