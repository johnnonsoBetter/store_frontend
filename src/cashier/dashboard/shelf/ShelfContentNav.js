
import React from 'react';
import { Box, Button, ButtonGroup } from '@material-ui/core';



 function ShelfContentNav(){


    return (
        <Box display="flex" p={1}>
            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                <Button>Shelf</Button>
                <Button>Recent</Button>
                <Button>Issue</Button>
               
            </ButtonGroup>
             
        </Box>
    )
 }

 export default ShelfContentNav