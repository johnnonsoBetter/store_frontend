import { Box, Grid, Grow, Typography } from '@material-ui/core'
import React from 'react'


function InternalInfo(){

    return (

        <Grow in={true}>
            <Box>
            <Grid container spacing={6}>
                <Grid item xs={6} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Total Sales Cost
                        </Typography>
                        <Typography> 
                            ₦5,800
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Total Sales Profit
                        </Typography>
                        <Typography> 
                            ₦5,800
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} >
                    <Box p={5} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Cash Back Profit
                        </Typography>
                        <Typography> 
                            ₦5,800
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} >
                    <Box p={5} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Total Net Profit
                        </Typography>
                        <Typography> 
                            ₦5,800
                        </Typography>
                    </Box>

                </Grid>

                

            </Grid>
        </Box>

        </Grow>
        
    )
}

export default InternalInfo