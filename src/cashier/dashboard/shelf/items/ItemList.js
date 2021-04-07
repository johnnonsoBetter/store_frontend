import { Box, ButtonBase, Grid, Typography, Card, CardContent, makeStyles} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AmountFormater from '../../../../helpers/AmountFormater'


const useStyles = makeStyles((theme) => ({
    light: {
        backgroundColor: "#9a9a9a8f"
    },
    itemContainer: {
        
       
       
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

function ItemList(){

    const [items, setItems] = useState([])
    const classes = useStyles()

    useEffect(()=> {

        setItems(
            [{
                name: "milo 1kg ref",
                selling_price: 5000,
                barcode: "9794893478"
            },
            {
                name: "Rambo flit",
                selling_price: 400,
                barcode: "348797434"
            },
            {
                name: "Morning fresh",
                selling_price: 700,
                barcode: "348797434"
            }]
        )


    }, [])


    return (
        <Grid container spacing={3}>

            {
                items.map(shelf_item => {
                    const {name, selling_price} = shelf_item

                    return (
                        <Grid item  md={6} lg={4} xl={4}  >
                            <Box width="100%">
                                <Card className={classes.itemContainer}>
                                    <ButtonBase style={{width: "100%"}} onClick={()=> {
                                        
                                    }}>
                                        <CardContent style={{padding: "0" , width: "100%"}}>
                                            <Box display="flex" p={1} justifyContent="space-between" style={{backgroundColor: "#002142"}}>
                                               
                                                <Typography  > {name} </Typography>
                                            </Box>

                                            <Box p={2} style={{backgroundColor: "#0A0B0C"}} >
                                            <Typography variant="h5" style={{color: "#DEC429"}}> ₦{AmountFormater(selling_price).amount() } </Typography>
                                            </Box>
                                        </CardContent>
                                    </ButtonBase>
                                </Card> 


                            </Box>
                            
                        </Grid>
                    )
                })
            }
            
        </Grid>
    )
}

export default ItemList