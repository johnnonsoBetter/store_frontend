import { Box, CircularProgress } from '@material-ui/core'
import React from 'react'

function Loader(){

    return (
        <Box width="100%" height={props.heigh} >
            <CircularProgress> </CircularProgress>
        </Box>
       
    )
}


export default Loader