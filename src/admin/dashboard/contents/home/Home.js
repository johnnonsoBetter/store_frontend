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
    const {setDashboardData, generalStoreInfos, setGeneralStoreInfos, transactionReviewInfos, setTransactionReviewInfos, setInventoryManagerInfos, inventoryManagerInfos} = useContext(AdminDashboardContext).store
   
    

    



  

    useEffect(() => {
        
        axios({
            method: 'GET',
            url: `http://localhost:3001/api/v1/admin_dashboard/?store=${storeName}`,
            headers: JSON.parse(localStorage.getItem('admin'))
        }).then(response => {
            const {data} = response
            const {change_balance, total_debts_amount, transaction_activity, next_day_change, inventory_manager} = data
            setDashboardData(data)
            setTimeout(() => {
                setBackdropState(false)
            }, 2000)

            setGeneralStoreInfos([
                {
                    infoName: "Reserve Change",
                    amount: `₦ ${change_balance}`
                },
                {
                    infoName: "Resumption Change",
                    amount: `₦ ${next_day_change}`
                },
                {
                    infoName: "All Items Worth",
                    amount: `₦ ${inventory_manager['total_goods_worth']}`
                },
                {
                    infoName: "All Items Cost",
                    amount: `₦ ${inventory_manager['total_goods_cost']}`
                },
                {
                    infoName: "All Items Quantity",
                    amount: `${inventory_manager['total_goods_quantity']}`
                },
                {
                    infoName: "Expected Items Profit",
                    amount: `₦ ${inventory_manager['expected_profit']}`
                },
            ])

            setTransactionReviewInfos([
                {
                    infoName: "Sales",
                    amount: `₦ ${transaction_activity['total_sales']}`
                },
                {
                    infoName: "Expenses",
                    amount: `₦ ${transaction_activity['total_expenses']}`
                },
                {
                    infoName: "Today Debts",
                    amount: `₦ ${transaction_activity['total_debts']}`
                },
                {
                    infoName: "Recovered",
                    amount: `₦ ${transaction_activity['total_recovered']}`
                },
                {
                    infoName: "Returned Goods",
                    amount: `₦ ${transaction_activity['total_goods_returned_cost']}`
                },
                {
                    infoName: "Change",
                    amount: `₦ ${transaction_activity['total_change']}`
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
                    <Link>
                        <Box>
                            <Card className={infoLinks}>
                                <CardContent>
                                <img src="static/images/shopping-bag.png" />
                                <Typography > Transaction Activity </Typography>

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
                                    <Typography > Inventory Activity </Typography>

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
                                <Typography > Transaction Activity </Typography>

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
                                <Typography > Transaction Activity </Typography>

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
                                <Typography > Transaction Activity </Typography>

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
                                <Typography > Transaction Activity </Typography>

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