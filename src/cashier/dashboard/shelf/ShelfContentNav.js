
import React from 'react';
import { Box, Container, Button, ThemeProvider, Grid, makeStyles, Paper, Typography, useMediaQuery, ButtonGroup } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      
        flexGrow: 1,
        padding: theme.spacing(1)
    },
    toolbar: theme.mixins.toolbar,

    paper: {
        height: "calc(95vh - 50px)",
        backgroundColor: "#050310"
    }
 }))



 function ShelfContentNav(){


    return (
        <Box display="flex" p={1}>
            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                <Button>Shelf</Button>
                <Button>Recent</Button>
                <Button>Issue</Button>
                <Button>Transfer</Button>
            </ButtonGroup>
             
        </Box>
    )
 }

 export default ShelfContentNav