import { Paper, Typography, Grid, Box, Avatar} from '@material-ui/core'
import React, { useContext } from 'react'
import AdminDashboardContext from './../../../../context/admin/AdminDashboardContext'



function StoreInfo(props){

    const classes = useContext(AdminDashboardContext).styles
    const baseImgUrl = 'static/images/'
    const {infos, imgUrl, textColor} = props

    return (
        <Paper className={classes.storeInfoContainer} elevation={0}>
            <Grid container>
                

                {infos.map((info, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                            <Box display="flex" p={1} alignItems="center" justifyContent="space-between"  className={classes.infoContainer}>
        
                                <Typography style={{fontSize: "1rem" }} className={classes.storeBaseInfoHeader}> {info.infoName}</Typography>
                                <Typography  className={classes.infoText} style={{color: textColor}} > {info.amount} </Typography>
                                <Avatar alt="Total Items" src={`/${baseImgUrl}${imgUrl}`} className={classes.small} />
                            
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>

        </Paper>
        
    )
}

export default StoreInfo