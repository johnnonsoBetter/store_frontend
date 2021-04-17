import { Box, ButtonBase, Typography, Card, CardContent, makeStyles} from '@material-ui/core'
import React, { useContext, useLayoutEffect, useRef, useState } from 'react'
import DashboardContext from '../../../../context/cashier/DashboardContext'
import AmountFormater from '../../../../helpers/AmountFormater'
import {List, AutoSizer, CellMeasurer, CellMeasurerCache} from 'react-virtualized'


function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }
  


const useStyles = makeStyles((theme) => ({
    box: {
        
       height: "75vh"
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

    const [ height] = useWindowSize()
    
    const classes = useStyles()
    const {filteredProducts, addItemToTable} = useContext(DashboardContext)

    const cache = useRef(new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100,
    }))
  
    


    return (
        

       
            
            <Box height={height} className={classes.box}>
                

                <AutoSizer> 
                    {
                        ({width, height}) => (
                            <List
                                width={width}
                                height={height} 
                                rowHeight={cache.current.rowHeight} 
                                defferedMeasurementCache = {cache.current}
                                rowCount={filteredProducts.length}
                                rowRenderer={({key, index, style, parent})=> {
                                const product = filteredProducts[index]

                                return(
                                    <CellMeasurer key={key} cache={cache.current} parent={parent} columnIndex={0} rowIndex={index}>
                                        <Box  style={style}>
                                                <Card className={classes.itemContainer}>
                                                    <ButtonBase style={{width: "100%"}} onClick={()=> {
                                                        addItemToTable(product)
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
                
                        )
                    }


                </AutoSizer>

            </Box>
            
               
        
    )
}

export default ItemList