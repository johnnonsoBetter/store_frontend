import React, { useContext, useState } from 'react'
import {Box, Divider, IconButton, makeStyles, Typography} from '@material-ui/core'
import EditOutlined from '@material-ui/icons/Edit'
import AuditModeContext from '../../../../context/audit_item/AuditModeContext'
import { CloseOutlined, DeleteOutline } from '@material-ui/icons'
import CostPriceTrackerChart from './PriceTrackerChart'
import AmountFormatter from '../../../../helpers/AmountFormater'
import axios from 'axios'
import DeleteConfirmation from './DeleteConfirmation'
import UpdateItem from './UpdateItem'
 

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
    },
    deleteConfirmation: {
       
        backgroundColor: "#006d8e",
        borderRadius: "8px",
        color: "white"
    },
    lineHeight: {
        lineHeight: "2.2"
    }

}))

function Item(){
    const classes = useStyles()
    const {itemInfo, items, setItemInfo, toggleItemDrawer, setItems} = useContext(AuditModeContext)
    const {item, cost_price_trackers, selling_price_trackers, category} = itemInfo
    const {name, barcode, cost_price, selling_price} = item
    const [confirmationVisible, setConfirmationVisible] = useState(false)
    const [onUpdate, setOnUpdate] = useState(false)
    
    const deleteItem = ()=> {
            
        axios({
            method: "DELETE",
            url: `http://localhost:3001/api/v1/real_items/name`,
            headers: JSON.parse(localStorage.getItem('admin')),
            params: {item_name: name}
        }).then(response => {
           
            const new_items = items.filter(item => item.name !== name)
            setItems(new_items)
            toggleItemDrawer()
            
        }).catch(err => {
            console.log(err)
        })
    }


    const toggleConfirmationVisible = ()=> {
        setConfirmationVisible(!confirmationVisible)
    }
    
    const toggleUpdate =() => setOnUpdate(!onUpdate)
    return (
        <Box className={classes.root} >
           { confirmationVisible ?
           <DeleteConfirmation 
                name={name} 
                toggleConfirmationVisible={toggleConfirmationVisible}
                confirmationVisible={confirmationVisible}
                deleteConfirmation = {classes.deleteConfirmation}
                deleteItem = {deleteItem}
            
            />

            :  

            onUpdate ? 
            <UpdateItem 
                toggleUpdate={toggleUpdate}
               
            /> :
            <>
            <Box  display="flex" alignItems="center"  justifyContent="space-between" >

                <IconButton onClick={()=> {
                    setItemInfo(null)
                    toggleItemDrawer()
                }}>
                    <CloseOutlined fontSize="small" />
                </IconButton>

                <IconButton onClick={ toggleConfirmationVisible}>
                    <DeleteOutline style={{color: "#ff3f3f"}} fontSize="small"/>
                </IconButton>

                <IconButton onClick={toggleUpdate}>
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
                <CostPriceTrackerChart trackers={cost_price_trackers}/>
            </Box>

            <Box marginTop={2} >
                <Typography> Selling Price Analysis</Typography>
                <CostPriceTrackerChart trackers={selling_price_trackers}/>
            </Box>
            </>

           }
           
        </Box>
    )
}

export default Item