import { Box, Typography } from '@material-ui/core'
import React from 'react'

function Item(props){

    const {name} = props
    return (
        <Box>
            <Typography> The same {name} </Typography>K
        </Box>
    )
}

export default Item