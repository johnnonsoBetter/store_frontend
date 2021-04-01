import React, { useContext } from 'react'
import { Box, ButtonBase, CircularProgress, makeStyles, Typography} from '@material-ui/core'
import TransactionActivityContext from '../../../../../context/admin/transaction_activity/TransactionActivity'
import AmountFormater from '../../../../../helpers/AmountFormater'

const useStyles = makeStyles((theme) => ({
    contItem: {
       
       width: 220,
       minWidth: 220,
       minHeight: 135,
       borderRadius: "9px",
       display: "inline-block",
       marginRight: theme.spacing(2),
       marginLeft: theme.spacing(2),

       
    }, 
    link: {
       
       
       padding: theme.spacing(0),
       textDecoration: "none",
       color: "white"
    }
}))


function ContentNav(){

    const classes = useStyles()
    const {total_sales, total_expenses, total_debts, total_change, total_recovered, total_goods_returned_cost} = useContext(TransactionActivityContext).transactionActivity
    const {setTableType, setShow} = useContext(TransactionActivityContext)
    

    function handleTableType(type){
        setTableType(type)
        setShow(true)
    }

    return (

        <>
            <ButtonBase onClick={()=> handleTableType("sales") }
              style={{backgroundImage: "linear-gradient(to right, rgb(0 0 0 / 67%), rgb(20 173 17 / 68%))"}} borderRadius={6} className={classes.contItem}   marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Sales</Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                        <Typography variant="h6"> {`₦ ${AmountFormater(total_sales).amount()}`} </Typography>
                    </Box>

                </Box>
                
            </ButtonBase>      

                            
            
        
            <ButtonBase onClick={()=> handleTableType("expenses") }  style={{backgroundImage: "linear-gradient(to right, rgb(0 0 0 / 67%), rgb(41 138 175 / 68%))"}}  borderRadius={6} className={classes.contItem}  p={2} marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Expenses</Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                        <Typography variant="h6"> {`₦ ${AmountFormater(total_expenses).amount()}`}</Typography>
                    </Box>

                </Box>
                
            </ButtonBase>      
        
            
        
            <ButtonBase onClick={()=> handleTableType("debts") } style={{backgroundImage: "linear-gradient(to right, rgb(0 0 0 / 67%), #922721)"}}  borderRadius={6} className={classes.contItem}  p={2} marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Debts</Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                        <Typography variant="h6">{`₦ ${AmountFormater(total_debts).amount()}`}</Typography>
                    </Box>

                </Box>
                
            </ButtonBase>      
        
            
            <ButtonBase onClick={()=> handleTableType("item_returns") } style={{backgroundImage: "linear-gradient(to right, rgb(0 0 0 / 67%), #dabe8a94)"}}  borderRadius={6} className={classes.contItem}  p={2} marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Returns </Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                      
                         <Typography variant="h6"> {`₦ ${AmountFormater(total_goods_returned_cost).amount()}`}</Typography>
                    </Box>

                </Box>
                
            </ButtonBase>   
            
            <ButtonBase  style={{backgroundImage: "linear-gradient(to right, rgb(0 0 0 / 67%), rgb(0 0 0 / 73%))"}}  borderRadius={6} className={classes.contItem}  p={2} marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Recovered </Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                        <Typography variant="h6"> {`₦ ${AmountFormater(total_recovered).amount()}`}</Typography>
                    </Box>

                </Box>
                
            </ButtonBase>  
        
            
        
            <ButtonBase onClick={()=> handleTableType("changes") } style={{backgroundImage: " linear-gradient(to right, rgb(0 0 0 / 67%), rgb(137 78 255 / 73%))"}}  borderRadius={6} className={classes.contItem}  p={2} marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Changes</Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                        <Typography variant="h6"> {`₦ ${AmountFormater(total_change).amount()}`}</Typography>
                    </Box>

                </Box>
                
            </ButtonBase>      
        
           
        
            <ButtonBase style={{backgroundImage: "linear-gradient(to right, rgb(0 0 0 / 67%), rgb(175 146 41 / 68%))"}} borderRadius={6} className={classes.contItem}  p={2} marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Cashier Report</Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                        <Typography variant="h6"> ₦8,000</Typography>
                    </Box>

                </Box>
                
            </ButtonBase>      
        </>

    )
}


export default ContentNav