import { Box, Grid, Grow, Typography } from '@material-ui/core'
import {React, useContext} from 'react'
import AmountFormater from '../../../../../helpers/AmountFormater'
import TransactionActivityContext from '../../../../../context/admin/transaction_activity/TransactionActivity'


function InternalInfo(){
    const {total_sales_profit, total_sales_cost, total_cashback_profit, total_net_profit} = useContext(TransactionActivityContext).transactionActivity

    return (

        <Grow in={true}>
            <Box>
            <Grid container spacing={6}>
                <Grid item xs={6} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Sales Cost
                        </Typography>
                        <Typography> 
                            {`₦ ${AmountFormater(total_sales_cost).amount()}`}
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                           Sales Profit
                        </Typography>
                        <Typography> 
                        {`₦ ${AmountFormater(total_sales_profit).amount()}`}
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} >
                    <Box p={5} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Cash Back Profit
                        </Typography>
                        <Typography> 
                        {`₦ ${AmountFormater(total_cashback_profit).amount()}`}
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} >
                    <Box p={5} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Net Profit
                        </Typography>
                        <Typography> 
                        {`₦ ${AmountFormater(total_net_profit).amount()}`}
                        </Typography>
                    </Box>

                </Grid>

                

            </Grid>
        </Box>

        </Grow>
        
    )
}

export default InternalInfo