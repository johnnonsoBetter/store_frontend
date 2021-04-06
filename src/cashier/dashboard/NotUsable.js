import React from 'react'
import { Box, Container, makeStyles, Typography, useMediaQuery } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
        
    },
    notUsableContainer: {
        height: "calc(100vh - 10px)"
    }
 }))




const NotUsable = ()=> {
    const classes = useStyles()

    return (
        <Container className={classes.root}>
            <Box  width="100%"> 
                <Typography> This </Typography>
            </Box>
        </Container>
    )
}


export default NotUsable