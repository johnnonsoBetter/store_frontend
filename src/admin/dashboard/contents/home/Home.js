import React, { useContext, useEffect} from 'react'
import {Typography, Box, Paper, Card, CardContent, Grid, Backdrop, CircularProgress, Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core'
import {Link} from 'react-router-dom'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AdminDashboardContext from '../../../../context/admin/AdminDashboardContext'
import axios from 'axios'

function Home(){
    const [backdropState, setBackdropState] = React.useState(true);
    const {infoLinksContainer, infoLinks, backdrop, storeBaseInfoHeader, storeBaseInfo, storeBaseDetail} = useContext(AdminDashboardContext).styles
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

                <Grid container className={infoLinksContainer}>

                    <Grid item xs={12} >
            
                        <Box>
                            <Card className={storeBaseInfo}>
                                <CardContent>
                                    <Accordion className={storeBaseDetail}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                            <Typography className={storeBaseInfoHeader}>Accordion 1</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails >
                                            <Grid container>
                                                <Grid item xs={6}>

                                                    
                                                    <Paper>
                                                        d
                                                    </Paper>
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Paper>
                                                        d
                                                    </Paper>
                                                </Grid>


                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>

                                </CardContent>      
                            </Card>
                        </Box>
                        
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
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


                    <Grid item xs={12} sm={6} lg={4}>
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


                    <Grid item xs={12} sm={6} lg={4}>
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


                    <Grid item xs={12} sm={6} lg={4}>
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



                    <Grid item xs={12} sm={6} lg={4}>
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


                    <Grid item xs={12} sm={6} lg={4}>
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
              
            </div>

              }
        </>
    )
}


export default React.memo(Home)