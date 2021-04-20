

import React, { useContext, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactToPrint from 'react-to-print';
import DashboardContext from '../../context/cashier/DashboardContext';
import { Box, makeStyles, Typography } from '@material-ui/core';
import AmountFormater from '../../helpers/AmountFormater';
import { cashierSalesApi } from '../../api/cashier/activity/api';
import Dexie from 'dexie'

const useStyles = makeStyles((theme) => ({

    infoText: {
        textTransform: "capitalize",
        color: "black"
    },
    itemList: {
        border: "1px solid grey",
        marginTop: theme.spacing(3),
        padding: theme.spacing(1)
    },
    itemSold: {
        marginTop: theme.spacing(1)
    }
}))



export default function SaleReceipt() {

  const [scroll, setScroll] = React.useState('paper');
  const receiptRef = useRef()
  const {receiptOpened, launchSnackBar, storedSaleId, setStoredSaleId, actualPayment, clearAllItemsOnCounter, setReceiptOpened, storeInfo, sale} = useContext(DashboardContext)
  const {receipt_id, total_amount_paid,  total_items_amount, transaction_type, transfer_amount, cash_amount, cashback_profit, discount, issue, pos_amount, receipt_was_issued, items} = sale
  const seller = JSON.parse(localStorage.cashier)['name']

  const {name, telephone, address, receipt_remark} = storeInfo
  const classes = useStyles()
  let db = new Dexie('storeDb')
  let the_id = -1


  db.version(1).stores({
    salesNotSold: '++id, receipt_id, issue, receipt_was_issued, total_items_amount, total_amount_paid, discount, transaction_type, cash_amount, cashback_profit, pos_amount, transfer_amount, items'
  })



  const handleClose = () => {
    setReceiptOpened(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (receiptOpened) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [receiptOpened]);

  return (
    <div>
    
      <Dialog
        open={receiptOpened}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Receipt Info </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
           <Box ref={receiptRef} p={4}>
               <Box p={1} textAlign="center" >
                   <Typography variant="h5" className={classes.infoText} > {name} Supermarket </Typography>
               </Box>
               <Box p={1} textAlign="center" >
                   <Typography variant="h6" className={classes.infoText} > {address} </Typography>
               </Box>
               <Box p={1} textAlign="center" >
                   <Typography variant="h6" className={classes.infoText} > {telephone} </Typography>
               </Box>

               <Box textAlign="center" display="flex" justifyContent="space-between" >
                    <Box p={1} textAlign="center" >
                        <Typography variant="h6" className={classes.infoText} > Date: </Typography>
                    </Box>
                    <Box p={1} textAlign="center" >
                        <Typography variant="h6" className={classes.infoText} > {new Date().toDateString()} </Typography>
                    </Box>
               </Box>

               <Box  textAlign="center" display="flex" justifyContent="space-between" >
                    <Box p={1} textAlign="center" >
                        <Typography variant="h6" className={classes.infoText} > Time: </Typography>
                    </Box>
                    <Box p={1} textAlign="center" >
                        <Typography variant="h6" className={classes.infoText} > {new Date().toLocaleTimeString()} </Typography>
                    </Box>
               </Box>

               <Box  textAlign="center" display="flex" justifyContent="space-between" >
                    <Box p={1} textAlign="center" >
                        <Typography variant="h6" className={classes.infoText} > Receipt Id </Typography>
                    </Box>
                    <Box p={1} textAlign="center" >
                        <Typography variant="h6" style={{color: "black"}} > {receipt_id} </Typography>
                    </Box>
               </Box>

               <Box  textAlign="center" display="flex" justifyContent="space-between" >
                    <Box p={1} textAlign="center" >
                        <Typography variant="h6" className={classes.infoText} > Seller </Typography>
                    </Box>
                    <Box p={1} textAlign="center" >
                        <Typography variant="h6" className={classes.infoText} > {seller} </Typography>
                    </Box>
               </Box>


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



               <Box  width="100%" marginTop={4} >
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
                        <Typography variant="h6" className={classes.infoText}>  ₦{AmountFormater(actualPayment()).amount()}</Typography>
                    </Box>

                    </Box>
                </Box>

               
           </Box>
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        
          <ReactToPrint 
          
            trigger ={() => (
                <Button  color="primary">
                    Sell
                </Button>
            )}

            onBeforeGetContent={() => {

               

           
    
    
                db.salesNotSold.add(
                    {
                        receipt_id,
                        issue,
                        receipt_was_issued,
                        total_items_amount,
                        discount,
                        total_amount_paid,
                        transaction_type,
                        cash_amount,
                        transfer_amount,
                        pos_amount,
                        cashback_profit,
                        items,
                
                
                    }
                ).then((id)=> {
                   the_id = id
                   //  setStoredSaleId(id)
                    console.log("succesfully stored sale id of ", the_id)
                   
                }).catch(()=> {
                    console.log("failed to add ")
                })
    
            }}

            onAfterPrint = {() => {

               clearAllItemsOnCounter()

               cashierSalesApi().performTransaction(sale).then(response => {

                    db.salesNotSold.delete(the_id).then((res) => {

                        launchSnackBar(`Thanks, Your Transaction Is Being Processed!`,'success')

                        
                    }).catch((err) => {
                        console.log("failed to delete stored sale")
                    })
                    
        
               }).catch(err => {
                    launchSnackBar(`Oopss Something went wrong! But Sales Being Saved`,'warning')
          
               })

               console.log("task completed")

            }}    

            content={()=> receiptRef.current}
          
          />
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
