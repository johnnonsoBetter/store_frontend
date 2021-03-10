import React, { useContext } from 'react'
import {Typography, Box, Card, CardContent, Grid} from '@material-ui/core'
import {Link, Switch, Route} from 'react-router-dom'
import AdminDashboardStyleContext from '../../../context/admin/AdminDashboardStyleContext'


function Home(){

    const {startContainer, infoLinksContainer, infoLinks} = useContext(AdminDashboardStyleContext).styles
    const {storeName} = useContext(AdminDashboardStyleContext).store

    return (

        <>  
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
            

        </>
    )
}


export default Home