import React, { useContext } from 'react'
import {Box, Divider, IconButton, makeStyles, Typography} from '@material-ui/core'
import EditOutlined from '@material-ui/icons/Edit'
import AuditModeContext from '../../../../context/audit_item/AuditModeContext'
import { CloseOutlined, DeleteOutline } from '@material-ui/icons'
import CostPriceTrackerChart from './CostPriceTrackerChart'
import AmountFormatter from '../../../../helpers/AmountFormater'
 

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2)
    },
    itemName: {
        textTransform: "capitalize",
        textAlign: "center",
        letterSpacing: "0.4px",
        color: "#6626fd",
        marginTop: theme.spacing(2)
         
    },
    barcode: {
        letterSpacing: "2px"
    },
    category: {
        textTransform: "capitalize"
    }

}))

function Item(){
    const classes = useStyles()
    const {itemInfo} = useContext(AuditModeContext)
    const {item, cost_price_trackers, selling_price_trackers, category} = itemInfo
    const {name, barcode, cost_price, selling_price} = item
    const {setItemInfo, toggleItemDrawer} = useContext(AuditModeContext)
    
    return (
        <Box className={classes.root} >

            <Box  display="flex" alignItems="center"  justifyContent="space-between" >

                <IconButton onClick={()=> {
                    setItemInfo(null)
                    toggleItemDrawer()
                }}>
                    <CloseOutlined fontSize="small" />
                </IconButton>

                <IconButton>
                    <DeleteOutline style={{color: "#ff3f3f"}} fontSize="small"/>
                </IconButton>

                <IconButton>
                    <EditOutlined style={{color: "#d69500eb"}} fontSize="small"/>
                </IconButton>
                
            </Box>
            
            <Box  className={classes.itemName} >
                <Typography variant="h6"> {name} </Typography>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="space-around" p={2}>
                <Box textAlign="center">   
                    <Typography> Cost Price </Typography>
                    <Typography> ₦{AmountFormatter(cost_price).amount()} </Typography>

                </Box>
                <Divider orientation="vertical" flexItem />
                <Box textAlign="center">   
                    <Typography> Selling Price </Typography>
                    <Typography> ₦{AmountFormatter(selling_price).amount()} </Typography>

                </Box>
               
            </Box>
            <Divider />
            <Box textAlign="center" display="flex" justifyContent="space-between" m={2}>
                <Typography>Barcode:</Typography>
                <Typography className={classes.barcode}>{barcode}</Typography>
            </Box>
           
            <Box textAlign="center"  display="flex" justifyContent="space-between" p={2}>
                <Typography>Category:</Typography>
                <Typography className={classes.category} >{category['name']}</Typography>
            </Box>

            <Box marginTop={2} >
                <Typography> Cost Price Analysis</Typography>
                <CostPriceTrackerChart />
            </Box>

            <Box marginTop={2} >
                <Typography> Cost Price Analysis</Typography>
                <CostPriceTrackerChart />
            </Box>

          
           
        </Box>
    )
}

export default Item