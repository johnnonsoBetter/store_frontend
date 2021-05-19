import { Box, Grid, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import SettingsContext from '../../../../../context/admin/settings/SettingsContext'
import AmountFormater from '../../../../../helpers/AmountFormater'

function CashierSettings(){

    const base_imageUrl = 'static/images/' 

    const {mini_excess, max_excess, cashier_sale_limit} = useContext(SettingsContext).storeInfo

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
                         <Typography variant="h6"> ₦ {AmountFormater(mini_excess).amount()} </Typography>
                         </Box>
                     </Box>

                 </Grid>

                 <Grid item xs={12} sm={6} md={4}>
                     <Box p={2} >
                         <Box p={2} textAlign="center">
                             <Typography variant="h5"> Max Excess</Typography>
                         </Box>
                         <Box p={1}>
                         <Typography variant="h6">  ₦ {AmountFormater(max_excess).amount()} </Typography>
                         </Box>
                     </Box>

                 </Grid>

                 <Grid item xs={12} sm={6} md={4}>
                     <Box p={2} >
                         <Box p={2} textAlign="center">
                             <Typography variant="h5"> Recent Sales Limit</Typography>
                         </Box>
                         <Box p={1}>
                         <Typography variant="h6"> {cashier_sale_limit} </Typography>
                         </Box>
                     </Box>

                 </Grid>

                 
             </Grid>
        </Box>
        
    </Box>
    )
}

export default CashierSettings