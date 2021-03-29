import { Typography, Box, IconButton, Avatar, makeStyles, Divider, Badge, Button} from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import deepOrange from '@material-ui/core/colors/deepOrange'
import clsx from 'clsx';
import SaleInfoContext from '../../../../../../context/admin/transaction_activity/sales/SaleInfoContext'

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      fontSize: "2em"
      
      
    },
  }));

function SaleInfo(){

    const classes = useStyles()

    const {receipt_id, total_items_amount, discount, cashback_profit, pos_amount, cash_amount, transfer_amount, transaction_type, total_amount_paid, issue, receipt_was_issued, cashier_name} = useContext(SaleInfoContext).sale
    const {setDisplay} = useContext(SaleInfoContext)
    let shortName = cashier_name.toString().toUpperCase().charAt(0)
    const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

    return (
       <>   

            <Box display="flex"  justifyContent="center"  marginTop={1} width="100%">
                
                <Box> <Avatar className={classes.large}> {shortName}  </Avatar> </Box>
            </Box>
            <Box display="flex"  justifyContent="center" marginTop={1} width="100%"> 
              <Typography variant="h6" > {cashier_name} </Typography> 
            </Box>

            <Box display="flex" textAlign="center" justifyContent="center"  marginTop={1} width="100%"> 
              <Typography variant="h6" > Receipt ID: {receipt_id} </Typography> 
            </Box>

            <Box p={1} >
                <Divider />
            </Box>

            <Box p={1} marginTop={1}>
              <Box display="flex" p={1} justifyContent="space-between">
                <Box> <Typography> Printout:</Typography> </Box>
                <Box> <Typography> {
                      receipt_was_issued ? <Badge color="primary" overlap="circle" badgeContent=" " variant="dot"> {circle}</Badge>
                      : <Badge color="secondary" overlap="circle" badgeContent=" " variant="dot"> {circle}</Badge>
                    } </Typography> </Box>
              </Box>
              <Box display="flex" p={1} justifyContent="space-between">
                <Box> <Typography> Issue:</Typography> </Box>
                <Box> <Typography> {
                      issue ? <Badge color="secondary" overlap="circle" badgeContent=" " variant="dot"> {circle}</Badge>
                      : <Badge color="primary" overlap="circle" badgeContent=" " variant="dot"> {circle}</Badge>
                    } </Typography> </Box>
              </Box>

            </Box>
            <Box p={1} >
                <Divider />
            </Box>



            

            <Box p={1} marginTop={1}> 
              <Box display="flex" p={1} justifyContent="space-between">
                <Box> <Typography> Total Items Amount:</Typography> </Box>
                <Box> <Typography> ₦{total_items_amount} </Typography> </Box>
              </Box>

              
              <Box display="flex" p={1} justifyContent="space-between">
                <Box> <Typography> Total Amount Paid:</Typography> </Box>
                <Box> <Typography> ₦{total_amount_paid} </Typography> </Box>
              </Box>
              {
                discount > 0 &&
                <Box display="flex" p={1} justifyContent="space-between">
                  <Box> <Typography> Discount:</Typography> </Box>
                  <Box> <Typography style={{color: "red"}}> ₦{discount} </Typography> </Box>
                </Box>

              }
              
              <Box display="flex" p={1} justifyContent="space-between">
                <Box> <Typography> Transaction Type:</Typography> </Box>
                <Box> <Typography> {transaction_type} </Typography> </Box>
              </Box>
              <Box>
                {
                  cash_amount > 0 && 
                  <Box display="flex" p={1} justifyContent="space-between">
                    <Box> <Typography> Cash: </Typography> </Box>
                    <Box> <Typography> {cash_amount} </Typography> </Box>
                  </Box>
                }
                
                {
                  transfer_amount > 0 &&
                  <Box display="flex" p={1} justifyContent="space-between">
                    <Box> <Typography> Transfer: </Typography> </Box>
                    <Box> <Typography> {transfer_amount} </Typography> </Box>
                  </Box>
                }

                {
                  pos_amount > 0 &&
                  <Box display="flex" p={1} justifyContent="space-between">
                    <Box> <Typography> Pos:</Typography> </Box>
                    <Box> <Typography> {pos_amount} </Typography> </Box>
                  </Box>
                }

                {
                  cashback_profit > 0 &&
                  <Box display="flex" p={1} justifyContent="space-between">
                    <Box> <Typography> Cashback Profit:</Typography> </Box>
                    <Box> <Typography> {cashback_profit} </Typography> </Box>
                  </Box>
                }

              </Box>

            <Box display="flex" p={1} marginTop={2} width="100%">
              <Button onClick={() => setDisplay("items_sold")} style={{width: "100%", color: "white", backgroundColor: "#654ab9"}} > View Items Sold</Button>
            </Box>
            </Box>

       </>
    )
}


export default SaleInfo