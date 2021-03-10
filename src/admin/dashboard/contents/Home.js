import React, { useContext, useEffect} from 'react'
import {Typography, Box, Card, CardContent, Grid, Backdrop, CircularProgress, Fab} from '@material-ui/core'
import {Link, Switch, Route} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import AdminDashboardContext from '../../../context/admin/AdminDashboardContext'
import SettingsIcon from '@material-ui/icons/Settings'
import axios from 'axios'

function Home(){
    const [backdropState, setBackdropState] = React.useState(true);
    const {startContainer, infoLinksContainer, infoLinks, backdrop, fab, preference, preferenceLink} = useContext(AdminDashboardContext).styles
    const {storeName, setDashboardData} = useContext(AdminDashboardContext).store

    useEffect(() => {
        
        axios({
            method: 'GET',
            url: `http://localhost:3001/api/v1/admin_dashboard/?store=${storeName}`,
            headers: JSON.parse(localStorage.getItem('admin'))
        }).then(response => {
            const {data} = response
            setDashboardData(data)
            setTimeout(() => {
                setBackdropState(false)
            }, 2000)
            
        }).catch(err => {

            console.log(err)
        })
    }, [])
    
    
    

    return (

        

        <>  
              { backdropState == true ? 
                <Backdrop className={backdrop} open={backdropState} >
                  <CircularProgress color="inherit" />
                </Backdrop>
                :
                
            <div>

            
            <Typography variant="h5"> Wellcome to {storeName.toUpperCase()} Supermarket</Typography>
            <Box className={startContainer}>
                <img src="static/images/favourites.png" alt="star"/> 
                <img src="static/images/favourites.png" alt="star" /> 
                <img src="static/images/favourites.png" alt="star"/> 
                
            </Box>


                <Grid container className={infoLinksContainer}>
                    <Grid item xs={12} md={6} lg={4}>
                    <Link>
                        <Box>
                            <Card className={infoLinks}>
                                <CardContent>
                                <img src="static/images/shopping-bag.png" />
                                <Typography variant="h5"> Transaction Activity </Typography>

                                </CardContent>      
                            </Card>
                        </Box>
                    </Link>
                    
                    </Grid>


                    <Grid item xs={12} md={6} lg={4}>
                        <Link>              
                            <Box>
                                <Card className={infoLinks}>
                                    <CardContent>
                                    <img src="static/images/shopping-bag.png" />
                                    <Typography variant="h5"> Transaction Activity </Typography>

                                    </CardContent>
                                    
                                </Card>
                            </Box>

                        </Link>
                            
                    </Grid>


                    <Grid item xs={12} md={6} lg={4}>
                        <Link> 
                            <Box>
                            <Card className={infoLinks}>
                                <CardContent>
                                <img src="static/images/shopping-bag.png" />
                                <Typography variant="h5"> Transaction Activity </Typography>

                                </CardContent>
                                
                            </Card>
                            </Box>
                        </Link>

                    </Grid>


                    <Grid item xs={12} md={6} lg={4}>
                        <Link> 
                            <Box>
                            <Card className={infoLinks}>
                                <CardContent>
                                <img src="static/images/shopping-bag.png" />
                                <Typography variant="h5"> Transaction Activity </Typography>

                                </CardContent>
                                
                            </Card>
                            </Box>
                        </Link>

                    </Grid>



                    <Grid item xs={12} md={6} lg={4}>
                        <Link> 
                            <Box>
                            <Card className={infoLinks}>
                                <CardContent>
                                <img src="static/images/shopping-bag.png" />
                                <Typography variant="h5"> Transaction Activity </Typography>

                                </CardContent>
                                
                            </Card>
                            </Box>
                        </Link>

                    </Grid>


                    <Grid item xs={12} md={6} lg={4}>
                        <Link> 
                            <Box>
                            <Card className={infoLinks}>
                                <CardContent>
                                <img src="static/images/shopping-bag.png" />
                                <Typography variant="h5"> Transaction Activity </Typography>

                                </CardContent>
                                
                            </Card>
                            </Box>
                        </Link>

                    </Grid>
                </Grid>
                <Box className={preference}>
                    <Typography component={Link} to="/admin_login" className={preferenceLink}> <SettingsIcon /> Preferences </Typography>
                </Box>

                <Fab color="primary"  aria-label="add" className={fab}>
                    <AddIcon/>
                </Fab>
            
            </div>

              }
        </>
    )
}


export default React.memo(Home)