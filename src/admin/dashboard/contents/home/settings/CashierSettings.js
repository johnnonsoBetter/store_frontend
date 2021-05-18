import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'

function CashierSettings(){

    const base_imageUrl = 'static/images/' 

    return (
        <Box>
        <Box textAlign="left" p={2}>
             <Typography> Cashier Settings</Typography>
        </Box>
        <Box borderRadius={5} style={{backgroundColor: "black"}}>
             
             <Grid container justify="center">
                 <Grid item xs={12} sm={6} md={4}>
                     <Box p={2} >
                         <Box p={2} textAlign="center">
                             <Typography variant="h5"> Mini Excess</Typography>
                         </Box>
                         <Box p={1}>
                         <Typography variant="h6"> 100 </Typography>
                         </Box>
                     </Box>

                 </Grid>

                 <Grid item xs={12} sm={6} md={4}>
                     <Box p={2} >
                         <Box p={2} textAlign="center">
                             <Typography variant="h5"> Max Excess</Typography>
                         </Box>
                         <Box p={1}>
                         <Typography variant="h6"> 200 </Typography>
                         </Box>
                     </Box>

                 </Grid>

                 <Grid item xs={12} sm={6} md={4}>
                     <Box p={2} >
                         <Box p={2} textAlign="center">
                             <Typography variant="h5"> Recent Sales Limit</Typography>
                         </Box>
                         <Box p={1}>
                         <Typography variant="h6"> 6 </Typography>
                         </Box>
                     </Box>

                 </Grid>

                 
             </Grid>
        </Box>
        
    </Box>
    )
}

export default CashierSettings