import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'

function GeneralSetting(){

    const base_imageUrl = 'static/images/' 


    return (
        <Box>
               <Box textAlign="left" p={1}>
                    <Typography> General Settings</Typography>
               </Box>
               <Box borderRadius={5} style={{backgroundColor: "black"}}>
                    
                    <Grid container justify="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Box p={2} >
                                <Box p={2} textAlign="center">
                                    <Typography variant="h5"> Upright Supermarket Ltd</Typography>
                                </Box>
                                <Box p={1}>
                                    <img src={`/${base_imageUrl}medal.png`} alt="items"/>
                                </Box>
                            </Box>

                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Box p={2}>
                                <Box p={2} textAlign="center">
                                    <Typography variant="h5"> 09039691334</Typography>
                                </Box>
                                <Box p={1}>
                                    <img src={`/${base_imageUrl}phone.png`} alt="items"/>
                                </Box>
                            </Box>

                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Box p={2}>
                                <Box p={2} textAlign="center">
                                    <Typography variant="h5"> 14 Salami Afromedia Ojo Lagos, Nigeria</Typography>
                                </Box>
                                <Box p={1}>
                                    <img src={`/${base_imageUrl}pin.png`} alt="items"/>
                                </Box>
                            </Box>

                        </Grid>

                        <Grid item xs={12} >
                            <Box p={2}>
                                <Typography variant="h6"> Thanks For Your Patronage </Typography>
                            </Box>

                        </Grid>
                    </Grid>
               </Box>
               
           </Box>

    )
}

export default GeneralSetting