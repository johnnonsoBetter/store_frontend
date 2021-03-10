import React, { useContext, useEffect, useState} from 'react'
import {Typography, Box, Card, CardContent, Grid} from '@material-ui/core'
import {Link, Switch, Route} from 'react-router-dom'
import AdminDashboardContext from '../../../context/admin/AdminDashboardContext'
import axios from 'axios'


function Home(){

    const {startContainer, infoLinksContainer, infoLinks} = useContext(AdminDashboardContext).styles
    const {storeName, setDashboardData} = useContext(AdminDashboardContext).store
    console.log("this is the storeName", storeName)
    useEffect(() => {
        
        axios({
            method: 'GET',
            url: `http://localhost:3001/api/v1/admin_dashboard/?store=${storeName}`,
            headers: JSON.parse(localStorage.getItem('admin'))
        }).then(response => {
            const {data} = response
            setDashboardData(data)
            console.log(data)
        }).catch(err => {

            console.log(err)
        })
    }, [])
    
    
    

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


export default React.memo(Home)