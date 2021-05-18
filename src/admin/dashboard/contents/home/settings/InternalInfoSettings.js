import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'


function InternalInfoSettings(){

    const base_imageUrl = 'static/images/' 


    return (
        <Box>
               <Box textAlign="left" p={2}>
                    <Typography> Cashier Settings</Typography>
               </Box>
               <Box borderRadius={5} style={{backgroundColor: "black"}}>
                    
                    <Grid container justify="center">
                        <Grid item xs={12} sm={6}>
                            <Box p={2} >
                                <Box p={2} textAlign="center">
                                    <Typography variant="h5"> Next Day Change</Typography>
                                </Box>
                                <Box p={1}>
                                <Typography variant="h6"> ₦15,000 </Typography>
                                </Box>
                            </Box>

                        </Grid>

                       
                        <Grid item xs={12} sm={6} >
                            <Box p={2} >
                                <Box p={2} textAlign="center">
                                    <Typography variant="h5"> Reserve Change</Typography>
                                </Box>
                                <Box p={1}>
                                <Typography variant="h6"> ₦24,000 </Typography>
                                </Box>
                            </Box>

                        </Grid>

                        
                    </Grid>
               </Box>
               
           </Box>
    )
}

export default InternalInfoSettings