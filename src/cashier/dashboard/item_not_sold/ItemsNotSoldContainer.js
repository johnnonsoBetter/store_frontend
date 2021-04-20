import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, makeStyles, Typography } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import React, { useContext, useEffect } from 'react'
import DashboardContext from '../../../context/cashier/DashboardContext'
import AmountFormater from '../../../helpers/AmountFormater'



const useStyles = makeStyles((theme) => ({
    saleContainer: {
        borderRadius: 5,
        color: "white",
        backgroundColor: "#18710e"
    },
    container: {
        height: "calc(100vh - 200px)",
        overflowY: "auto"
    }
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

    const {setUnSoldSales, unSoldSales} = useContext(DashboardContext)
    
    const classes = useStyles()

    
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
                                        <Button > Resale </Button>
                                    </Box>
                                </Box>

               
                            </Box>
                        </Grid>

                        <Grid item xs={6} >
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