import { Typography, Grid, Box, Card, CardContent, makeStyles, CardHeader, ButtonBase} from "@material-ui/core";
import React from "react";
import AmountFormatter from '../../../../../helpers/AmountFormater'

const useStyles = makeStyles((theme) => ({
    itemContainer: {
        minWidth: 290,
        margin: theme.spacing(1),
        backgroundColor: "blue",
        padding: theme.spacing(0),
        color: "white",
        fontSize: theme.typography.pxToRem(1),
        fontWeight: theme.typography.fontWeightRegular,
        textTransform: "capitalize"
    }
}))

function Item(props){

    const {name, id, cost_price, selling_price} = props
    const classes = useStyles()
    

    return (
        <Grid xs={12} sm={6} md={4} >
            
            <Card className={classes.itemContainer}>
                <CardContent style={{padding: "0"}}>

                    <Box display="flex" p={1} justifyContent="space-between" style={{backgroundColor: "#002142"}}>
                        <Typography style={{color: "#DEC429"}}> ₦{AmountFormatter(cost_price).amount() } </Typography>
                        <Typography style={{color: "#17B80A"}}> ₦{AmountFormatter(selling_price).amount()} </Typography>
                    </Box>

                    <Box p={2} style={{backgroundColor: "#0A0B0C"}} >
                        <Typography > {name} </Typography>
                    </Box>
                    

                </CardContent>      
            </Card>
        

          
        </Grid>
    )
}

export default Item