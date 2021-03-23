import React, { useContext, useEffect, useState} from 'react'
import {Typography, Box, Container, Card, CardContent, Grid, Backdrop, CircularProgress, Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core'
import {Link, useRouteMatch} from 'react-router-dom'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AdminDashboardContext from '../../../../context/admin/AdminDashboardContext'
import axios from 'axios'
import StoreInfo from './StoreInfo'
import AmountFormater from '../../../../helpers/AmountFormater'

function Home(){
    const [backdropState, setBackdropState] = React.useState(true);
    const {infoLinksContainer, infoLinks, theLink, backdrop, storeBaseInfoHeader, storeBaseInfo, textHeight, storeBaseDetail} = useContext(AdminDashboardContext).styles
    const {storeName} = useContext(AdminDashboardContext).store
    const {setDashboardData, generalStoreInfos, changeStoreName, setGeneralStoreInfos, transactionReviewInfos, setTransactionReviewInfos} = useContext(AdminDashboardContext).store
    const [isExpanded, setIsExpanded] = useState(true)
    useEffect(() => {
        
        axios({
            method: 'GET',
            url: `http://localhost:3001/api/v1/admin_dashboard/?store=${storeName}`,
            headers: JSON.parse(localStorage.getItem('admin'))
        }).then(response => {
            const {data} = response
            const {change_balance, transaction_activity, next_day_change, inventory_manager} = data
            setDashboardData(data)
            setTimeout(() => {
                setBackdropState(false)
            }, 2000)

            setGeneralStoreInfos([
                {
                    infoName: "Reserve Change",
                    amount: `₦ ${AmountFormater(change_balance).amount()}`
                },
                {
                    infoName: "Resumption Change",
                    amount: `₦ ${AmountFormater(next_day_change).amount()}`
                },
                {
                    infoName: "All Items Worth",
                    amount: `₦ ${AmountFormater(inventory_manager['total_goods_worth']).amount()}`
                },
                {
                    infoName: "All Items Cost",
                    amount: `₦ ${AmountFormater(inventory_manager['total_goods_cost']).amount()}`
                },
                {
                    infoName: "All Items Quantity",
                    amount: `${inventory_manager['total_goods_quantity']}`
                },
                {
                    infoName: "Expected Items Profit",
                    amount: `₦ ${AmountFormater(inventory_manager['expected_profit']).amount() }`
                },
            ])

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
            changeStoreName("upright")
        }
    }, [])
    

    const routes = useRouteMatch()
    console.log(routes)

    const url = routes['url']
  
    
    

    return (

        

        <>  
              { backdropState === true ? 
                <Backdrop className={backdrop} open={backdropState} >
                  <CircularProgress color="inherit" />
                </Backdrop>
                :
                
            <Container> 

                <Grid container className={infoLinksContainer}>

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
                                            <Grid container>
                                                

                                                <Grid item xs={12} md={6}>

                                                    <Typography className={storeBaseInfoHeader}>Current Transaction Info</Typography>
                                                    <StoreInfo infos={transactionReviewInfos} textColor="#27ffcef2" imgUrl="trend.png"/>
                                                </Grid>

                                                <Grid item xs={12} md={6}>

                                                    <Typography className={storeBaseInfoHeader}>General Info</Typography>
                                                    <StoreInfo infos={generalStoreInfos} textColor="#ffef18" imgUrl="logout.png"/>
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
              
                </Container>

              }
        </>
    )
}


export default React.memo(Home)