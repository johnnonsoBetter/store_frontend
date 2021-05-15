import React, { useContext, useEffect, useState} from 'react'
import {Typography, Box, Container, Card, CardContent, Grid, Backdrop, CircularProgress, Accordion, AccordionSummary, AccordionDetails, useMediaQuery, Avatar} from '@material-ui/core'
import {Link, useRouteMatch} from 'react-router-dom'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AdminDashboardContext from '../../../../context/admin/AdminDashboardContext'
import StoreInfo from './StoreInfo'
import AmountFormater from '../../../../helpers/AmountFormater'
import { dashboardApi } from '../../../../api/admin/dashboard/api'
import { Beenhere } from '@material-ui/icons'

function Home(){
    const [backdropState, setBackdropState] = React.useState(false);
    const {infoLinksContainer, infoLinks, theLink, backdrop, storeBaseInfoHeader, storeBaseInfo, textHeight, storeBaseDetail} = useContext(AdminDashboardContext).styles
    const {storeName} = useContext(AdminDashboardContext).store
    const {setDashboardData, generalStoreInfos, setGeneralStoreInfos, transactionReviewInfos, setTransactionReviewInfos} = useContext(AdminDashboardContext).store
    const [isExpanded, setIsExpanded] = useState(true)
    const [storeInfo, setStoreInfo] = useState({
        change_balance: 0,
        next_day_change: 0
    }) 

    useEffect(() => {

        document.title = "Admin Dashboard"

        return ()=> {

            document.title = "Supermarket App"
        }
    })


    useEffect(() => {
        setBackdropState(true)
        dashboardApi(storeName).load().then(response => {
            const {data} = response
            const {change_balance, transaction_activity, next_day_change, inventory_manager} = data
            setDashboardData(data)
         
            setBackdropState(false)
        
            
            setStoreInfo({
                change_balance,
                next_day_change,
            })

            setTransactionReviewInfos([
                {
                    infoName: "Sales",
                    amount: `₦ ${AmountFormater(transaction_activity['total_sales']).amount()}`
                },
                {
                    infoName: "Expenses",
                    amount: `₦ ${AmountFormater(transaction_activity['total_expenses']).amount()}`
                },
                {
                    infoName: "Today Debts",
                    amount: `₦ ${ AmountFormater(transaction_activity['total_debts']).amount()}`
                },
                {
                    infoName: "Recovered",
                    amount: `₦ ${AmountFormater(transaction_activity['total_recovered']).amount()}`
                },
                {
                    infoName: "Returned Goods",
                    amount: `₦ ${AmountFormater(transaction_activity['total_goods_returned_cost']).amount()}`
                },
                {
                    infoName: "Change",
                    amount: `₦ ${AmountFormater(transaction_activity['total_change']).amount()}`
                }
                
            ])

            

           

        }).catch(err => {

            console.log(err)
        })


        return ()=> {

          
            setDashboardData({})
            setGeneralStoreInfos([])
            setTransactionReviewInfos([])
            setBackdropState(false)
            setStoreInfo({change_balance: 0, next_day_change: 0})
            
            
        }
    }, [storeName])
    

    const routes = useRouteMatch()

    const url = routes['url']
    const matches = useMediaQuery('(min-width:1280px)');

    console.log(generalStoreInfos)
    console.log(generalStoreInfos[1])
  
    
    

    return (

        

        <>  
              { backdropState === true ? 
                <Backdrop className={backdrop} open={backdropState} >
                  <CircularProgress color="inherit" />
                </Backdrop>
                :
                
            <Container > 
                <Box display="flex" alignItems="center" width="100%"   >

                
                <Grid container justify="center" alignItems="center">

                    <Grid item xs={12} >
            
                        <Box>
                            <Card className={storeBaseInfo}>
                                <CardContent>
                                    <Accordion expanded={isExpanded} elevation={0} className={storeBaseDetail}>
                                        <AccordionSummary 
                                        expandIcon={<ExpandMoreIcon style={{color: "white"}} />}
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                            <Typography className={storeBaseInfoHeader}>{storeName} Real Time Info</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails >
                                            <Grid container spacing={2}>
                                                

                                                <Grid item xs={12} md={12}>

                                                    <Typography className={storeBaseInfoHeader}>Current Transaction Info</Typography>
                                                    <StoreInfo infos={transactionReviewInfos} textColor="#27ffcef2" imgUrl="trend.png"/>
                                                </Grid>

                                                <Grid item xs={12} md={6}>

                                                    <Box p={2}>
                                                        < Typography className={storeBaseInfoHeader}>Resumption Change</Typography>
                                                    </Box>
                                                        
                                                    <Box p={2} style={{backgroundColor: "black"}} borderRadius={5} display="flex" alignItems="center" justifyContent="space-between">
                                                      
                                                        <Typography variant="h5"> ₦ {storeInfo['next_day_change']}</Typography>
                                                        <Avatar style={{backgroundColor: "rgb(51 122 216 / 39%)"}} > <Beenhere style={{color: "#28b4ff"}} /></Avatar>
                                                     </Box>
                                                </Grid>

                                                <Grid item xs={12} md={6}>

                                                    
                                                    <Box p={2}>
                                                        < Typography className={storeBaseInfoHeader}>Change Balance</Typography>
                                                    </Box>
                                                        
                                                    <Box p={2} style={{backgroundColor: "black"}} borderRadius={5} display="flex" alignItems="center" justifyContent="space-between">
                                                      
                                                        <Typography variant="h5"> ₦ {storeInfo['change_balance']}</Typography>
                                                        <Avatar style={{backgroundColor: "rgb(219 217 57 / 39%)"}} > <Beenhere style={{color: "#dbbc06fa"}} /></Avatar>
                                                     </Box>
                                                   
                                                     
                                                </Grid>

                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>

                                </CardContent>      
                            </Card>
                        </Box>
                        
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <Link className={theLink} to={`${url}/${storeName}/transaction_activity/`}>
                            <Box>
                                <Card className={infoLinks}>
                                    <CardContent>
                                    <img src="static/images/transaction_activity.png" alt="transaction activity"/>
                                    <Typography className={textHeight}> Transaction Activity </Typography>

                                    </CardContent>      
                                </Card>
                            </Box>
                        </Link>
                    
                    </Grid>


                    <Grid item xs={12} sm={6} lg={4}>
                        <Link className={theLink} to={`${url}/${storeName}/inventory_activity`}>              
                            <Box>
                                <Card className={infoLinks}>
                                    <CardContent>
                                    <img src="static/images/storage.png" alt="inventory activity" />
                                    <Typography className={textHeight}> Inventory Activity </Typography>

                                    </CardContent>
                                    
                                </Card>
                            </Box>

                        </Link>
                            
                    </Grid>


                    <Grid item xs={12} sm={6} lg={4} >
                        <Link className={theLink} to={`${url}/${storeName}/statistics_report`}> 
                            <Box>
                            <Card className={infoLinks}>
                                <CardContent>
                                <img src="static/images/statistics.png" />
                                <Typography className={textHeight} > Statistics Report </Typography>

                                </CardContent>
                                
                            </Card>
                            </Box>
                        </Link>

                    </Grid>


                    <Grid item xs={12} sm={6} lg={4}>
                        <Link className={theLink} to={`${url}/${storeName}/items`}> 
                            <Box>
                            <Card className={infoLinks}>
                                <CardContent>
                                <img src="static/images/shelves.png" />
                                <Typography className={textHeight}> Shelf Items </Typography>

                                </CardContent>
                                
                            </Card>
                            </Box>
                        </Link>

                    </Grid>



                    <Grid item xs={12} sm={6} lg={4}>
                        <Link className={theLink} to={`${url}/${storeName}/cashiers`}> 
                            <Box>
                            <Card className={infoLinks} >
                                <CardContent>
                                <img src="static/images/cashier-machine.png" />
                                <Typography className={textHeight} > Cashiers </Typography>

                                </CardContent>
                                
                            </Card>
                            </Box>
                        </Link>

                    </Grid>


                    <Grid item xs={12} sm={6} lg={4}>
                        <Link className={theLink} to={`${url}/${storeName}/settings`}> 
                            <Box>
                            <Card className={infoLinks}>
                                <CardContent>
                                <img src="static/images/settings.png" />
                                <Typography className={textHeight} > Settings </Typography>

                                </CardContent>
                                
                            </Card>
                            </Box>
                        </Link>

                    </Grid>
                </Grid>
                </Box>
                </Container>

              }
        </>
    )
}


export default React.memo(Home)