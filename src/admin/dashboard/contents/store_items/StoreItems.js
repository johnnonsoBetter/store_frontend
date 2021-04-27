
import { Box, Container, FormControl, FormControlLabel, FormLabel, List, makeStyles, Radio, RadioGroup, Typography } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import { AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import { Virtuoso } from 'react-virtuoso'
import ItemList from '../audit_item/audit_mode/ItemList'
import FixedBar from './FixedBar'
import StoreItemList from './StoreItemList'

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
      },
}))

function StoreItems(){
    const classes = useStyles()
    const [items, setItems] = useState(["boy", "girl", "people"])
   
   
   
    const cache = useRef(new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100,
    }))
  
    

    return (
       <>
     
       <Box height="calc(100vh - 200px)" className={classes.box}>
            <StoreItemList />  
        </Box>
            
     

       </>
       
        
    )
}

export default StoreItems
