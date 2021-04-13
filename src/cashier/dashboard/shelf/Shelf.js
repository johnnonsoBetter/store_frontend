import { Box, Divider, makeStyles } from '@material-ui/core'
import React from 'react'
import ItemList from '../shelf/items/ItemList'
import ItemSearchInput from './ItemSearchInput'
import ShelfContentNav from './ShelfContentNav'

const useStyles = makeStyles((theme) => ({
    light: {
        backgroundColor: "#9a9a9a8f"
    }
 }))


function Shelf(){

    const classes = useStyles()

    return (
       <Box>
           <Box p={1}>
                <Box width="100%" display="flex" justifyContent="space-between" alignContent="center">
                        <ShelfContentNav />
                </Box>
           </Box>
           
       </Box>
    )
}

export default Shelf