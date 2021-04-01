import { Box, Typography } from '@material-ui/core'
import React from 'react'

function FailedActivityLoader (props){

    const {activity} = props
    return (
        <Box width="100%" minHeight={300} display="flex" alignItems="center" justifyContent="center">
            <Typography style={{color: "white"}}> Failed To Load {activity}</Typography>
        </Box>
    )
}

export default FailedActivityLoader