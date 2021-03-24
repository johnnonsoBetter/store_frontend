import { Box, Grid, Grow, Typography } from '@material-ui/core'
import React from 'react'

function MainInfo(){

    return (
        <Grow in={true}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} >
                    <Box p={2} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Total Sales
                        </Typography>
                        <Typography> 
                            ₦5,800
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} sm={4} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Total Sales
                        </Typography>
                        <Typography> 
                            ₦5,800
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} sm={4} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Total Sales
                        </Typography>
                        <Typography> 
                            ₦5,800
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} sm={4} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Total Sales
                        </Typography>
                        <Typography> 
                            ₦5,800
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} sm={4} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Total Sales
                        </Typography>
                        <Typography> 
                            ₦5,800
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} sm={4} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Total Sales
                        </Typography>
                        <Typography> 
                            ₦5,800
                        </Typography>
                    </Box>

                </Grid>

                <Grid item xs={6} sm={4} >
                    <Box p={3} boxShadow={2} borderRadius={5}> 
                        <Typography variant="h6"> 
                            Total Sales
                        </Typography>
                        <Typography> 
                            ₦5,800
                        </Typography>
                    </Box>

                </Grid>
            </Grid>

        </Grow>
        
    )
}

export default MainInfo