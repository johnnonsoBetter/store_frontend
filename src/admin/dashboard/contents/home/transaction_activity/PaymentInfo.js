import { Box, Grid, Grow, Typography } from '@material-ui/core'
import {React, useContext} from 'react'
import AmountFormater from '../../../../../helpers/AmountFormater'
import TransactionActivityContext from '../../../../../context/admin/transaction_activity/TransactionActivity'


function PaymentInfo(){
    const {total_transfer, total_pos, total_cash_at_hand} = useContext(TransactionActivityContext).transactionActivity

    return (
        <Grow in={true}>
            <Box>
            <Grid container spacing={6}>
                <Grid item xs={6} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Pos
                        </Typography>
                        <Typography> 
                        {`₦ ${AmountFormater(total_pos).amount()}`}
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Transfer
                        </Typography>
                        <Typography> 
                        {`₦ ${AmountFormater(total_transfer).amount()}`}
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={12} >
                    <Box p={5} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Cash At Hand
                        </Typography>
                        <Typography> 
                        {`₦ ${AmountFormater(total_cash_at_hand).amount()}`}
                        </Typography>
                    </Box>

                </Grid>

                

            </Grid>
        </Box>

        </Grow>
        
    )
}


export default PaymentInfo