
import { Box, ButtonBase, Card, CardContent, Container, FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup, styled, Typography } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized'
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso'
import ItemList from '../audit_item/audit_mode/ItemList'
import FixedBar from './FixedBar'


const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
      },
      list: {
        display: "flex",
        flexWrap: "wrap",        
      },

      itemContainer: {
        padding: theme.spacing(3)
      }
}))

function StoreItems(){
    const classes = useStyles()
    const [items, setItems] = useState(["boy", "girl", "people"])
    const filteredProducts = [{name: "chicken"}, {name: "noodles"}]
   
   
   
    const cache = useRef(new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100,
    }))

   
    

    return (

        <Container >
           
                <Box  height="calc(100vh - 100px)" width="100%" className={classes.box}>
                <FixedBar />
                <VirtuosoGrid
                    totalCount={filteredProducts.length}
                    overscan={2}
                   
                    listClassName={classes.list}
                    itemClassName={classes.itemContainer}
                    itemContent={index => <Box   className={classes.itemContainer} >Item {filteredProducts[index].name}</Box>}
                
                    />
           
                </Box>
        </Container>
       
        
    )
}



function ItemContainer(props){

    return (
      <Box style={{display: "flex", width: "33%", flex: "none", alignContent: "stretch", padding: "0.5rem"}} height={props.height}> 
        Please let me and you to know the most important and the same time and the whole things which could reall
      </Box>
    )
  }
  
  function ItemWrapper(props){
  
    return (
      <Box> 
        {props.index}
        Please sr
      </Box>
    )
  }
  
  
  function ListContainer(){
  
    return (
      <Box style={{display: "flex", flexWrap: "wrap"}}> 
        tim
      </Box>
    )
  }
  
  

export default StoreItems
