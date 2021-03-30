import { Box, Typography } from '@material-ui/core'
import React from 'react'

function NoActivity(props){

    const {activity, date} =  props

    return (
        <Box minHeight={500} alignItems="center" width="100%" display="flex" justifyContent="center">
            <Typography style={{color: "white"}}> No {activity} Activity Was Made on {new Date(date).toDateString()}  </Typography>
        </Box>
    )
}

export default NoActivity