import React, { useContext } from 'react'
import {TableBody, TableCell, TableRow, Box, Badge, Typography, IconButton, Avatar, makeStyles} from '@material-ui/core'
import clsx from 'clsx';
import {DateTime} from 'luxon'
import ArrowForward from '@material-ui/icons/ArrowForward'
import SalesContext from '../../../../../../context/admin/transaction_activity/sales/SalesContext';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import AmountFormater from '../../../../../../helpers/AmountFormater'

const useStyles = makeStyles((theme) => ({
  table: {
      minWidth: 650,
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],

  },

  whiteText:  { 
    color: "white",
    textTransform: "capitalize"
  },

  noBottom: {
    borderBottom: "none"
  },
 
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));



function SalesList(){

    const classes = useStyles()
    const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;
    const {filteredSales, toggleSaleDrawer} = useContext(SalesContext)

    const setupSale = () => {

      toggleSaleDrawer(true)
    }
   

    return (
        <TableBody style={{backgroundColor: "#040715"}}>

        {
          filteredSales.map((sale) => {
            const {cashier_name, total_items_amount, transaction_type, created_at, issue} = sale

          
            let shortName = cashier_name.toString().toUpperCase().charAt(0)
            const time =  DateTime.fromISO(created_at).toLocaleString(DateTime.TIME_SIMPLE)
            

            return (
              <TableRow key={sale.id} style={{borderBottom: "none"}}>
                <TableCell align="center" className={classes.noBottom}> <Box display="flex" justifyContent="center">  <Avatar sizes="small" style={{color: "white"}} className={classes.small}> <Typography > {shortName} </Typography>  </Avatar>    </Box></TableCell>
                <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText} >  {`₦ ${AmountFormater(total_items_amount).amount()}`} </Typography>   </Box></TableCell>
                <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText} > {transaction_type} </Typography>   </Box></TableCell>
                <TableCell align="center" className={classes.noBottom}>
                  <Box display="flex" justifyContent="center"> 
                    {
                      issue ? <Badge color="secondary" overlap="circle" badgeContent=" " variant="dot"> {circle}</Badge>
                      : <Badge color="primary" overlap="circle" badgeContent=" " variant="dot"> {circle}</Badge>
                    }
                    
                  </Box>
                </TableCell>
                <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText}> {time} </Typography>   </Box></TableCell>
                <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <IconButton onClick = {setupSale}> <ArrowForward style={{color: "#1f87f5"}} /> </IconButton>  </Box></TableCell>
              </TableRow>

            )
          })
        }

      
    </TableBody>

    )
}



export default SalesList