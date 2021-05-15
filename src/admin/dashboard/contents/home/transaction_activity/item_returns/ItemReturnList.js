import React, { useContext } from 'react'
import {Avatar, TableBody, TableCell, TableRow, Typography, Box, IconButton, makeStyles, Hidden} from '@material-ui/core'
import AmountFormater from '../../../../../../helpers/AmountFormater'
import { DateTime } from 'luxon'
import ArrowForward from '@material-ui/icons/ArrowForward'
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import ItemReturnContext from '../../../../../../context/admin/transaction_activity/item_returns/ItemReturnContext'


const useStyles = makeStyles((theme) => ({
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



function ItemReturnList(props){

    const {itemReturns} = props
    const classes = useStyles()
    const { setSaleReceiptId, toggleItemReturnDrawer} = useContext(ItemReturnContext)

    return (
        <TableBody style={{backgroundColor: "#040715"}}>

            {
                itemReturns.map(itemReturn => {

                    const {id, item_name, cashier_name, cost, created_at, sale_receipt_id} = itemReturn
                    let shortName = cashier_name.toString().toUpperCase().charAt(0)
                    const time =  DateTime.fromISO(created_at).toLocaleString(DateTime.TIME_SIMPLE)

                    return (
                        <TableRow key={id} style={{borderBottom: "none"}}>

                            <Hidden mdUp>
                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText} > {item_name} </Typography>   </Box></TableCell>
                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <IconButton onClick={()=> {
                                  setSaleReceiptId(sale_receipt_id)
                                  toggleItemReturnDrawer(true)}} > <ArrowForward style={{color: "#1f87f5"}} /> </IconButton>  </Box></TableCell>
                            
                            </Hidden>

                            <Hidden smDown>
                              <TableCell align="center" className={classes.noBottom}> <Box display="flex" justifyContent="center">  <Avatar sizes="small" style={{color: "white"}} className={classes.small}> <Typography > {shortName} </Typography>  </Avatar>    </Box></TableCell>
                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText} > {item_name} </Typography>   </Box></TableCell>
                      
                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText} >  {`₦ ${AmountFormater(cost).amount()}`} </Typography>   </Box></TableCell>
                              
                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText}> {time} </Typography>   </Box></TableCell>
                              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <IconButton onClick={()=> {
                                setSaleReceiptId(sale_receipt_id)
                                toggleItemReturnDrawer(true)}} > <ArrowForward style={{color: "#1f87f5"}} /> </IconButton>  </Box></TableCell>
                          

                            </Hidden>
                            
                        
                        </TableRow>
                    )
                })
            }

      
    </TableBody>

    )
}

export default ItemReturnList