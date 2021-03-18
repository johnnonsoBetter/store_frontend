import React, { useContext } from 'react'
import {Box, Divider, IconButton, makeStyles, Typography} from '@material-ui/core'
import EditOutlined from '@material-ui/icons/Edit'
import AuditModeContext from '../../../../context/audit_item/AuditModeContext'
import { CloseOutlined, DeleteOutline } from '@material-ui/icons'


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
        lineHeight: "1.9",
        letterSpacing: "2px"
    }

}))

function Item(){
    const classes = useStyles()
    const {itemInfo} = useContext(AuditModeContext)
    const {item, cost_price_trackers, selling_price_trackers} = itemInfo
    const {name, barcode, cost_price, selling_price} = item

    console.log(item)
    return (
        <Box className={classes.root} >

            <Box  display="flex" alignItems="center"  justifyContent="space-between" >

                <IconButton >
                    <CloseOutlined fontSize="small"/>
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
                    <Typography> {cost_price} </Typography>

                </Box>
                <Divider orientation="vertical" flexItem />
                <Box textAlign="center">   
                    <Typography> Selling Price </Typography>
                    <Typography> {selling_price} </Typography>

                </Box>
               
            </Box>
            <Divider />
            <Box textAlign="center" p={2}>
                <Typography>Barcode</Typography>
                <Typography className={classes.barcode}>{barcode}</Typography>
            </Box>
          
           
        </Box>
    )
}

export default Item