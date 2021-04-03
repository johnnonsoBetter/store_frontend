import { Typography, makeStyles, Box, Avatar, IconButton, Button} from '@material-ui/core'
import React, { useContext } from 'react'
import DebtContext from '../../../../../../context/admin/transaction_activity/debts/DebtContext'
import clsx from 'clsx';
import deepOrange from '@material-ui/core/colors/deepOrange'
import { CloseOutlined, DateRange, LocationCity, MonetizationOn, Person, Phone } from '@material-ui/icons';
import AmountFormater from '../../../../../../helpers/AmountFormater';
import { DateTime } from 'luxon';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }, 

    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      fontSize: "2em"
      
      
    },

    boldText: {
        textTransform: "capitalize"
    }
  }));

function DebtInfo(){
    const {debtInfo, setDebtInfoOpened, setReceiptId, toggleDrawerOpened} = useContext(DebtContext)
    const {debtor_name, cashier_name, receipt_id, debtor_address, debtor_telephone, cost, created_at} = debtInfo
    console.log(debtInfo)
    const debtDate = new Date(created_at).toDateString()
    const debtIsToday = new Date(created_at).toDateString() === new Date().toDateString()
    console.log(debtIsToday)
    const classes = useStyles()
    let shortName = cashier_name.toString().toUpperCase().charAt(0)
   
    const setUpSale = ()=> {
        setReceiptId(receipt_id)
        setDebtInfoOpened(false)
    }


    console.log(debtInfo)

    return (
        <Box className={classes.root}>
            <Box display="flex" p={2}>
                <IconButton onClick={()=>  toggleDrawerOpened(false)} > <CloseOutlined />  </IconButton>
            </Box>

            <Box display="flex"  justifyContent="center"  marginTop={1} width="100%">
            
            <Box> <Avatar className={classes.large}> {shortName}  </Avatar> </Box>
            </Box>
    
            <Box display="flex"  justifyContent="center" marginTop={1} width="100%"> 
                <Typography variant="h6" className={classes.boldText} > Cashier:  {cashier_name} </Typography> 
            </Box>

            <Box display="flex"  justifyContent="center" marginTop={1} width="100%"> 
                <Typography  className={classes.boldText} > Receipt Id:  {receipt_id} </Typography> 
            </Box>

            <Box marginTop={1} p={1}>
                <Box display="flex" p={1} justifyContent="space-between"> 
                    <Box>
                        <Typography className={classes.boldText}><Person /></Typography>
                    </Box>
                    <Box>
                        <Typography className={classes.boldText}>{debtor_name}</Typography>
                    </Box>
                </Box>

                <Box display="flex" p={1} justifyContent="space-between"> 
                    <Box>
                        <Typography className={classes.boldText}> <LocationCity /> </Typography>
                    </Box>
                    <Box>
                        <Typography className={classes.boldText}>{debtor_address}</Typography>
                    </Box>
                </Box>

                <Box display="flex" p={1} justifyContent="space-between"> 
                    <Box>
                        <Typography className={classes.boldText}><Phone /> </Typography>
                    </Box>
                    <Box>
                        <Typography className={classes.boldText}>{debtor_telephone}</Typography>
                    </Box>
                </Box>

                <Box display="flex" p={1} justifyContent="space-between"> 
                    <Box>
                        <Typography className={classes.boldText}><MonetizationOn /> </Typography>
                    </Box>
                    <Box>
                        <Typography className={classes.boldText}>₦{AmountFormater(cost).amount()}</Typography>
                    </Box>
                </Box>

                <Box display="flex" p={1} justifyContent="space-between"> 
                    <Box>
                        <Typography className={classes.boldText}><DateRange /> </Typography>
                    </Box>
                    <Box>
                        <Typography className={classes.boldText}>{

                            debtIsToday ? "Today" : debtDate

                        } </Typography>
                    </Box>
                </Box>

                <Box display="flex" p={1} marginTop={2} width="100%">
                    <Button onClick={()=> setUpSale()}  style={{width: "100%", color: "white", backgroundColor: "#654ab9"}} > View Sales </Button>
                </Box>
            </Box>



        </Box>
        
    )
}

export default DebtInfo