import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import { Settings } from '@material-ui/icons'
import React from 'react'

function GeneralSetting(){

    const base_imageUrl = 'static/images/' 


    return (
        <Box>
               <Box display="flex" alignItems="center" justifyContent="space-between" p={1}>
                    <Typography> General Settings</Typography>
                    <IconButton >
                        <Settings style={{color: "white"}} />
                    </IconButton>
                    
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