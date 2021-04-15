import { Avatar, Box, IconButton, makeStyles, Slide, Typography } from '@material-ui/core'
import { Print } from '@material-ui/icons'
import React, { useContext } from 'react'
import DashboardContext from '../../context/cashier/DashboardContext'
import AmountFormater from '../../helpers/AmountFormater'

const useStyles = makeStyles((theme) => ({

    infoContainer: {
        backgroundImage: "linear-gradient(to right, rgb(0 0 0), rgb(23 13 74))",
        color: "white"
    },
    square: {
        width: theme.spacing(7),
        backgroundColor: 'green'
    },
}))


const actualPayment = (transaction_type) => {
    
}

function SaleInfoBoard(){

    const classes = useStyles()
    const {sale, counterInfo} = useContext(DashboardContext)
    
    
    const {receipt_id, receipt_was_issued, total_amount_paid, total_items_amount, transaction_type, transfer_amount, cash_amount, cashback_profit, discount, issue, pos_amount} = sale

    return (
        <Slide direction="up" in={true} > 
        <Box className={classes.infoContainer} borderRadius={10} style={{}} width={450} bottom={20} p={2} position="absolute">
            <Box display="flex" alignItems="center">

                <Box  width="100%" >
                    <Box p={1} display="flex" justifyContent="space-between">

                        <Box>
                            <Typography variant="h5"> Total Amount:</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5">  ₦{AmountFormater(total_items_amount).amount()}</Typography>
                        </Box>

                    </Box>

                    <Box p={1} display="flex" justifyContent="space-between">

                        <Box>
                            <Typography variant="h5"> To Pay:</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5" style={{color: "gold"}}> ₦{AmountFormater(total_amount_paid).amount()}</Typography>
                        </Box>

                    </Box>

                    <Box p={1} display="flex" justifyContent="space-between">

                        <Box>
                            <Typography variant="h6"> Discount:</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" style={{color: "red"}}>  ₦{AmountFormater(discount).amount()}</Typography>
                        </Box>

                    </Box>

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
                                <Typography variant="h6"> Cash Received:</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6"> ₦{AmountFormater(cash_amount).amount()} </Typography>
                            </Box>
 
                        </Box>

                        : transaction_type === "pos" ? 
                            <Box p={1} display="flex" justifyContent="space-between">

                                <Box>
                                    <Typography variant="h6"> Pos Received:</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6">  ₦{AmountFormater(pos_amount).amount()} </Typography>
                                </Box>

                            </Box>

                        : transaction_type === "transfer" ? 
                            <Box p={1} display="flex" justifyContent="space-between">

                                <Box>
                                    <Typography variant="h6"> Transfer Received:</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6">  ₦{AmountFormater(transfer_amount).amount()} </Typography>
                                </Box>

                            </Box>
                        
                        : transaction_type === "pos_cashback" ? 
                            <>
                            <Box p={1} display="flex" justifyContent="space-between">

                                <Box>
                                    <Typography variant="h6"> Pos Received:</Typography>
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
                             </>

                        : transaction_type === "transfer_cashback" ? 
                        <>
                        <Box p={1} display="flex" justifyContent="space-between">

                            <Box>
                                <Typography variant="h6"> Transfer Received:</Typography>
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
                        </>

                        : transaction_type === "transfer_cash" ? 
                        <>
                        <Box p={1} display="flex" justifyContent="space-between">

                            <Box>
                                <Typography variant="h6"> Transfer Received:</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6">  ₦{AmountFormater(transfer_amount).amount()} </Typography>
                            </Box>

                        </Box>

                        <Box p={1} display="flex" justifyContent="space-between">

                            <Box>
                                <Typography variant="h6"> Cash Received:</Typography>
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
                                <Typography variant="h6"> Pos Received:</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6">  ₦{AmountFormater(pos_amount).amount()} </Typography>
                            </Box>

                        </Box>

                        <Box p={1} display="flex" justifyContent="space-between">

                            <Box>
                                <Typography variant="h6"> Cash Received:</Typography>
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
                                <Typography variant="h6"> Pos Received:</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6">  ₦{AmountFormater(pos_amount).amount()} </Typography>
                            </Box>

                        </Box>

                        <Box p={1} display="flex" justifyContent="space-between">

                            <Box>
                                <Typography variant="h6"> Transfer Received:</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6">  ₦{AmountFormater(transfer_amount).amount()} </Typography>
                            </Box>

                        </Box>
                        </>
                        : null
                        
 
                        
                    }

                    
                    

                </Box>



                <Box p={2} display="flex" justifyItems="center" flexDirection="column">
                    <Box>
                        <Typography > Products </Typography>
                        <Typography variant="h4"> {counterInfo['productCount']} </Typography>
                    </Box>

                    <Box m={2}>
                         <Typography > Items </Typography>
                        <Typography variant="h4"> {counterInfo['itemsSoldCount']} </Typography>
                    </Box>

                    <Box >
                        <IconButton>
                            <Avatar className={classes.square}  variant="rounded">
                                <Print />
                            </Avatar>
                        </IconButton>
                    </Box>
                </Box>







            </Box>
            

            <Box>

            </Box>

        </Box>
    </Slide>
    )
}


export default SaleInfoBoard