
import {Box, Typography} from '@material-ui/core'
import React from 'react'

function NoData(props){

    return (
        <Box minHeight={props.minHeight} alignItems="center" width="100%" display="flex" justifyContent="center">
            <Typography style={{color: "white"}}> No {props.activity} Data   </Typography>
        </Box>
    )
}

export default NoData