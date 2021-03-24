import { Box, Grid, Grow, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import AmountFormater from '../../../../../helpers/AmountFormater'
import TransactionActivityContext from '../../../../../context/admin/transaction_activity/TransactionActivity'

function MainInfo(){
    const {total_sales, total_expenses, total_debts, total_change, total_recovered, total_goods_returned_cost} = useContext(TransactionActivityContext).transactionActivity

    return (
        <Grow in={true}>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={4} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Total Sales
                        </Typography>
                        <Typography> 
                        {`₦ ${AmountFormater(total_sales).amount()}`}
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} sm={4} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Total Expenses
                        </Typography>
                        <Typography> 
                        {`₦ ${AmountFormater(total_expenses).amount()}`}
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} sm={4} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Total Debts
                        </Typography>
                        <Typography> 
                        {`₦ ${AmountFormater(total_debts).amount()}`}
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} sm={4} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Total Recovered
                        </Typography>
                        <Typography> 
                            {`₦ ${AmountFormater(total_recovered).amount()}`}
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} sm={4} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                           Total Goods Returned
                        </Typography>
                        <Typography> 
                        {`₦ ${AmountFormater(total_goods_returned_cost).amount()}`}
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} sm={4} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Total Change
                        </Typography>
                        <Typography> 
                        {`₦ ${AmountFormater(total_change).amount()}`}
                        </Typography>
                    </Box>

                </Grid>

                
            </Grid>

        </Grow>
        
    )
}

export default MainInfo