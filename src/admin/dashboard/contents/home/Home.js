import React, { useContext, useEffect, useState} from 'react'
import {Typography, Box, Paper, Card, CardContent, Grid, Backdrop, CircularProgress, Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core'
import {Link} from 'react-router-dom'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AdminDashboardContext from '../../../../context/admin/AdminDashboardContext'
import axios from 'axios'
import StoreInfo from './StoreInfo'

function Home(){
    const [backdropState, setBackdropState] = React.useState(true);
    const {infoLinksContainer, infoLinks, backdrop, storeBaseInfoHeader, storeBaseInfo, storeBaseDetail} = useContext(AdminDashboardContext).styles
    const {storeName} = useContext(AdminDashboardContext).store
    const {dashBoardData, setDashboardData} = useContext(AdminDashboardContext).store
    const data = useContext(AdminDashboardContext).store['dashboardData']
    const [generalStoreInfos, setGeneralStoreInfos] = useState([
        {
            infoName: "Reserve Change",
            amount: `₦ ${0}`
        },
        {
            infoName: "Debt Amount",
            amount: `₦ ${0}`
        }
    ])

    const [todayTransactionInfo, setTodayTransactionInfo] = useState([
        {
            infoName: "Total Sales",
            amount: `₦ ${0}`
        },
        {
            infoName: "Total Expenses",
            amount: `₦ ${0}`
        },
        {
            infoName: "Total Debts",
            amount: `₦ ${0}`
        },
        {
            infoName: "Recovered Debts",
            amount: `₦ ${0}`
        },
        {
            infoName: "Returned Goods",
            amount: `₦ ${0}`
        },
        {
            infoName: "Total Change",
            amount: `₦ ${0}`
        }
        
    ])




  

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

            setGeneralStoreInfos([
                {
                    infoName: "Reserve Change",
                    amount: `₦ ${data['change_balance']}`
                },
                {
                    infoName: "Debt Amount",
                    amount: `₦ ${data['total_debts_amount']}`
                }
            ])
            
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
                                    <Accordion elevation={0} className={storeBaseDetail}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                            <Typography className={storeBaseInfoHeader}>Accordion 1</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails >
                                            <Grid container>
                                                

                                                <Grid item xs={12} md={6}>

                                                    <Typography className={storeBaseInfoHeader}>Transaction Overview</Typography>
                                                    <StoreInfo infos={todayTransactionInfo} paddingColor="" imgUrl="trend.png"/>
                                                </Grid>

                                                <Grid item xs={12} md={6}>

                                                    <Typography className={storeBaseInfoHeader}>Transaction Overview</Typography>
                                                    <StoreInfo infos={todayTransactionInfo} paddingColor="" imgUrl="trend.png"/>
                                                </Grid>

                                                <Grid item xs={12} md={6}>

                                                    <Typography className={storeBaseInfoHeader}>General Info</Typography>
                                                    <StoreInfo infos={generalStoreInfos} paddingColor="#034230" imgUrl="logout.png"/>
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