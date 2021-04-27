import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso'

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
    </Box>
  )
}


function ListContainer(){

  return (
    <Box style={{display: "flex", flexWrap: "wrap"}}> 
      Please let me and you to know the most important and the same time and the whole things which could reall
    </Box>
  )
}



function StoreItemList() {
    
    return (
      <Box p={9}  style={{backgroundColor: "green" }}>
         <VirtuosoGrid
        totalCount={10000}
        overscan={200}
      
        components={{
          Item: ItemContainer,
          List: ListContainer,
          ScrollSeekPlaceholder: ({ height, index }) => (
            <ItemContainer height={height}>
              <ItemWrapper index={index}>{index}</ItemWrapper>
            </ItemContainer>
          ),
        }}

        scrollSeekConfiguration={{
          enter: velocity => Math.abs(velocity) > 200,
          exit: velocity => Math.abs(velocity) < 30,
          change: (_, range) => console.log({ range }),
        }}
        

        itemContent={index => <Typography  style={{width: "300px"}}>Item Please lt {index}</Typography>}
      />
   
     
      </Box>
     
    )
  }

  export default StoreItemList