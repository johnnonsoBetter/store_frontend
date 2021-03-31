import { Box, CircularProgress } from '@material-ui/core'
import React from 'react'

function Loader(props){

    return (
        <Box width="100%" display="flex" alignItems="center" justifyContent="center" minHeight={props.minHeight} >
            
            <Box display="flex" width="100%" justifyContent="center">
                <CircularProgress> </CircularProgress>
            </Box>
        </Box>
       
    )
}


export default Loader