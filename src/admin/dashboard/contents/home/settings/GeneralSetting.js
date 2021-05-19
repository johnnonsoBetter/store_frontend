import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import { Settings } from '@material-ui/icons'
import React, { useContext } from 'react'
import SettingsContext from '../../../../../context/admin/settings/SettingsContext'

function GeneralSetting(){

    const base_imageUrl = 'static/images/' 
    const {storeInfo, setDrawerOpened} = useContext(SettingsContext)
    const {full_name, telephone, address, receipt_remark} = storeInfo

    return (
        <Box>
               <Box display="flex" alignItems="center" justifyContent="space-between" p={1}>
                    <Typography> General Settings</Typography>
                    <IconButton onClick={()=> setDrawerOpened(true)} >
                        <Settings style={{color: "white"}} />
                    </IconButton>
                    
               </Box>
               <Box borderRadius={5} style={{backgroundColor: "black"}}>
                    
                    <Grid container justify="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Box p={2} >
                                <Box p={2} textAlign="center">
                                    <Typography  style={{textTransform: "capitalize"}} variant="h5"> {full_name} </Typography>
                                </Box>
                                <Box p={1}>
                                    <img src={`/${base_imageUrl}medal.png`} alt="items"/>
                                </Box>
                            </Box>

                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Box p={2} >
                                <Box p={2} textAlign="center">
                                    <Typography variant="h5"> {telephone}</Typography>
                                </Box>
                                <Box p={1}>
                                    <img src={`/${base_imageUrl}phone.png`} alt="items"/>
                                </Box>
                            </Box>

                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Box p={2}>
                                <Box p={2} textAlign="center">
                                    <Typography  style={{textTransform: "capitalize"}} variant="h5">  {address} </Typography>
                                </Box>
                                <Box p={1}>
                                    <img src={`/${base_imageUrl}pin.png`} alt="items"/>
                                </Box>
                            </Box>

                        </Grid>

                        <Grid item xs={12} >
                            <Box p={2}>
                                <Typography  style={{textTransform: "capitalize"}} variant="h6"> {receipt_remark} </Typography>
                            </Box>

                        </Grid>
                    </Grid>
               </Box>
               
           </Box>

    )
}

export default GeneralSetting