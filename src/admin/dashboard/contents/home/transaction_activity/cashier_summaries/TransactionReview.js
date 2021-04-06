import { Box, Paper, Slide, Typography, Badge} from '@material-ui/core'
import React from 'react'
import clsx from 'clsx';
import deepOrange from '@material-ui/core/colors/deepOrange'
import AmountFormater from '../../../../../../helpers/AmountFormater'
import { Check, Remove } from '@material-ui/icons';

function TransactionReview(props){
    const {setView, transactionReviewInfo} = props
    const circle = <div className={clsx()} />;

    
    return (   
        <Slide in={true} direction="left">
            <Box width="100%" >
                <Box textAlign="center"> 
                    <Typography variant="h6"> Review </Typography>
                </Box>

                <Paper >

                    <Box p={2}>
                        <Box  marginTop={2} display="flex"  justifyContent="space-between">
                            <Box>  <Typography> System Total </Typography>    </Box>
                            <Box>  <Typography> ₦{ AmountFormater(transactionReviewInfo['system_total_amount']).amount() } </Typography>    </Box>
                        </Box>

                        <Box  marginTop={2} display="flex"  justifyContent="space-between">
                            <Box>  <Typography> Cashier Total </Typography>    </Box>
                            <Box>  <Typography> ₦{ AmountFormater(transactionReviewInfo['cashier_total_amount']).amount() } </Typography>    </Box>
                        </Box>
                        

                    </Box>
                    

                </Paper>
                
                <Box marginTop={2}>
                    <Paper >
                        
                        
                        <Box p={2}>
                            <Box textAlign="center" variant="h6"> <Typography> Transaction Differences  </Typography></Box>
                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Pos </Typography>    </Box>
                                <Box>  <Typography> ₦{ AmountFormater(transactionReviewInfo['pos_differences']).amount() } </Typography>    </Box>
                            </Box>

                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Transfer </Typography>    </Box>
                                <Box>  <Typography> ₦{ AmountFormater(transactionReviewInfo['transfer_differences']).amount() } </Typography>    </Box>
                            </Box>

                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Cash </Typography>    </Box>
                                <Box>  <Typography> ₦{ AmountFormater(transactionReviewInfo['cash_at_hand_differences']).amount() } </Typography>    </Box>
                            </Box>

                            

                        </Box>
                        

                    </Paper>


                </Box>


                 
                <Box marginTop={2}>
                    <Paper >
                        
                        
                        <Box p={2}>
                            <Box textAlign="center" variant="h6"> <Typography> Final Outcome  </Typography></Box>
                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Differences </Typography>    </Box>
                                <Box>  <Typography> ₦{ AmountFormater(transactionReviewInfo['total_amount_difference']).amount() } </Typography>    </Box>
                            </Box>

                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Outcome </Typography>    </Box>
                                <Box>
                                       <Typography style={{textTransform: "capitalize"}}> {transactionReviewInfo['final_outcome']} </Typography>    
                                </Box>
                            </Box>

                            

                        </Box>
                        

                    </Paper>


                </Box>


                <Box marginTop={2}>
                    <Paper >
                        
                        
                        <Box p={2}>
                            <Box textAlign="center" variant="h6"> <Typography> Reconcilation  </Typography></Box>
                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Reconciled ? </Typography>    </Box>
                                <Box>  
                                    <Typography> 
                                    
                                    {transactionReviewInfo['reconciled'] ?
                                        <Check  /> : <Remove  />
                                    } 
                                    
                                    </Typography>    
                                </Box>
                                
                            </Box>

                            <Box  marginTop={2} display="flex"  justifyContent="space-between">
                                <Box>  <Typography> Reconciled Outcome </Typography>    </Box>
                                <Box>
                                    
                                    {transactionReviewInfo['reconciled_outcome'] === null && <Typography> {transactionReviewInfo['reconciled_outcome'] }  </Typography> }
                                   
                                </Box>
                            </Box>

                        </Box>
                        

                    </Paper>


                </Box>

                <Box p={2}  marginTop={2} display="flex"  justifyContent="space-between">
                    <Box>  <Typography> Money Remitted </Typography>    </Box>
                    <Box>
                    <Typography> ₦{ AmountFormater(transactionReviewInfo['money_remitted']).amount() } </Typography>
                    </Box>
                </Box>          
               
            </Box>
        </Slide>
        
    )
}

export default TransactionReview