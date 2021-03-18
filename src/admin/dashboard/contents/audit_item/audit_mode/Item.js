import { Typography, Grid, Box, Card, Paper, makeStyles, CardContent, CardHeader, ButtonBase} from "@material-ui/core";
import axios from "axios";
import React from "react";
import AmountFormatter from '../../../../../helpers/AmountFormater'

const useStyles = makeStyles((theme) => ({
    itemContainer: {
        minWidth: 270,
       
        margin: theme.spacing(2),
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

    const {name, id, cost_price, selling_price} = props
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
            console.log(response.data)
            
        }).catch(err => {
            console.log("there was an issue with this request", err)
        })
    }
    

    return (
        <Grid item  xs={12} sm={6} md={4}  >
            <Card className={classes.itemContainer}>
                <ButtonBase style={{width: "100%"}} onClick={handleShowItemFullDetail}>
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