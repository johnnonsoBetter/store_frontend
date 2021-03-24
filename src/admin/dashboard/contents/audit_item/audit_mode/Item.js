import { Typography, Grid, Box, Card, makeStyles, CardContent, ButtonBase} from "@material-ui/core";
import axios from "axios";
import React, { useContext } from "react";
import AmountFormatter from '../../../../../helpers/AmountFormater'
import AuditModeContext from '../../../../../context/audit_item/AuditModeContext'

const useStyles = makeStyles((theme) => ({
    itemContainer: {
        minWidth: 270,
       
       
        backgroundColor: "blue",
        color: "white",
        fontSize: theme.typography.pxToRem(1),
        fontWeight: theme.typography.fontWeightRegular,
        textTransform: "capitalize"
    },
    control:{
        
        margin: theme.spacing(1)
    },
    paper: {
        height: 140,
    
    }
}))

function Item(props){

    const {name, cost_price, selling_price} = props
    const {setItemInfo, toggleItemDrawer} = useContext(AuditModeContext)
    const classes = useStyles()

    const handleShowItemFullDetail = () => {

        
        axios({
            method: "GET",
            headers: JSON.parse(localStorage.getItem('admin')),
            url: `http://localhost:3001/api/v1/real_items/name`,
            
            params: {
                item_name: name
            }

        }).then(response => {

            const {item, cost_price_trackers, selling_price_trackers, category} = response.data
            
            
            
           // setItemName()
           setItemInfo({
               item,
               cost_price_trackers,
               selling_price_trackers,
               category,
               
           })
            
        }).catch(err => {
            console.log("there was an issue with this request", err)
        })
    }
    

    return (
        <Grid item  xs={12} sm={6} md={4}  >
            <Card className={classes.itemContainer}>
                <ButtonBase style={{width: "100%"}} onClick={()=> {
                    handleShowItemFullDetail()
                    toggleItemDrawer()
                }}>
                    <CardContent style={{padding: "0" , width: "100%"}}>
                        <Box display="flex" p={1} justifyContent="space-between" style={{backgroundColor: "#002142"}}>
                            <Typography style={{color: "#DEC429"}}> ₦{AmountFormatter(cost_price).amount() } </Typography>
                            <Typography style={{color: "#17B80A"}}> ₦{AmountFormatter(selling_price).amount()} </Typography>
                        </Box>

                        <Box p={2} style={{backgroundColor: "#0A0B0C"}} >
                            <Typography > {name} </Typography>
                        </Box>
                    </CardContent>
                </ButtonBase>
            </Card>          
        </Grid>
    )
}

export default Item
