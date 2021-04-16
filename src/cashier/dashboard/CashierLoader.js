import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import '../../App.css'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
    }
}))

function CashierLoader(){

    const classes = useStyles()

    return (
        <Box className={classes.root} >
            <Typography variant="h6"> Loading...</Typography>
        <Box >

            <div class="loadingio-spinner-pulse-qf8nweo5jxm"><div class="ldio-cyw5oa7niwb">
            <div></div><div></div><div></div>
            </div></div>
        </Box>
        

        </Box>

    )
}

export default CashierLoader