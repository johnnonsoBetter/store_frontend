import { Box, ButtonBase, Grid, Typography, Card, CardContent, makeStyles} from '@material-ui/core'
import React, { useContext, useEffect, useRef, useState } from 'react'
import DashboardContext from '../../../../context/cashier/DashboardContext'
import AmountFormater from '../../../../helpers/AmountFormater'
import {List, AutoSizer, CellMeasurer, CellMeasurerCache} from 'react-virtualized'
import QrReader from 'react-qr-scanner'
import Test from './Test'



const useStyles = makeStyles((theme) => ({
    box: {
        
        height: "calc(85vh - 50px)"
    },
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
    const {products} = useContext(DashboardContext)
    const cache = useRef(new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100,
    }))
    function handleScan(data){
        console.log(data)
      }
    function handleError(err){
        console.error(err)
    }
    function cellRenderer({columnIndex, key, rowIndex, style}) {
        return (
          <Box width="100%" p={3} key={key} style={style}>
            {products[rowIndex][columnIndex]}
            <Typography style={{color: "white"}}> HEllo </Typography>
          </Box>
        );
      }
      


    return (
        

       
            
                <Box className={classes.box}>
                    <Test />

                    <AutoSizer> 
                        {
                            ({width, height}) => (
                                <List
                                 width={width}
                                 height={height} 
                                 rowHeight={cache.current.rowHeight} 
                                 defferedMeasurementCache = {cache.current}
                                 rowCount={products.length}
                                 rowRenderer={({key, index, style, parent})=> {
                                    const product = products[index]

                                    return(
                                        <CellMeasurer key={key} cache={cache.current} parent={parent} columnIndex={0} rowIndex={index}>
                                            <Box  style={style}>
                                                    <Card className={classes.itemContainer}>
                                                        <ButtonBase style={{width: "100%"}} onClick={()=> {
                                                            
                                                     }}>
                                                           <CardContent style={{padding: "0" , width: "100%"}}>
                                                                 <Box display="flex" p={1} justifyContent="space-between" style={{backgroundColor: "#002142"}}>
                                                                
                                                                     <Typography  > {product.name} </Typography>
                                                                </Box>

                                                                 <Box p={2} style={{backgroundColor: "#0A0B0C"}} >
                                                                 <Typography variant="h5" style={{color: "#DEC429"}}> ₦{AmountFormater(product.selling_price).amount() } </Typography>
                                                                 </Box>
                                                           </CardContent>
                                                         </ButtonBase>
                                                     </Card> 
                                            </Box>

                                    </CellMeasurer>

                                    ) 
                                    
                                   
                                 }}
                                
                                 /> 
                                
                                // <Grid
                                //     cellRenderer={cellRenderer}
                                //     columnCount={products.length}
                                //     columnWidth={200}
                                //     height={300}
                                //     rowCount={products.length}
                                //     rowHeight={100}
                                //     width={300}
                                // />
                            )
                        }


                    </AutoSizer>

                </Box>
               
               
        
    )
}

export default ItemList