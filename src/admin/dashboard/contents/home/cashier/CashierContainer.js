import { Avatar, Box, Button, CircularProgress, Container, Divider, Drawer, Grid, IconButton, Typography, useMediaQuery } from '@material-ui/core'
import { Cancel, Close, Edit, Star, ViewAgenda, Visibility } from '@material-ui/icons'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { cashier } from '../../../../../api/api';
import { CashierContextProvider } from '../../../../../context/admin/CashierContext';
import AmountFormater from '../../../../../helpers/AmountFormater';
import CashierInfo from './CashierInfo';
import CreateCashier from './CreateCashier';
import EditCashier from './EditCashier';


function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }


function CashierContainer(){

    const [drawerOpened, setDrawerOpened] = useState(false)
    const [width] = useWindowSize()
    const matches = useMediaQuery('(max-width:600px)')
    const [type, setType] = useState('')
    const {storeName} = useParams()
    const [store_id, setStoreId] = useState('')
    const [cashiers, setCashiers] = useState([])
    const [loading, setLoading] = useState(false)
    const [failed, setFailed] = useState(false)



    const toggleDrawer = () => {

        setDrawerOpened(!drawerOpened)
    }

    useEffect(() => {
        
        loadResources()
        return () => {
            setStoreId('')
        }
    }, [])

    const loadResources = () => {
        setLoading(true)
        cashier().loadCashiers(storeName).then((response) => {
            const {store_id, cashiers} = response.data
            console.log(store_id)
            setStoreId(store_id)
            setCashiers(cashiers)
            setLoading(false)
            setFailed(false)

        }).catch(err => {
            setFailed(true)
            setLoading(false)
           
        })

    }

    const handleRetrys = () => {


        setLoading(true)
        loadResources()

    }


    return (
        <Container>
            <CashierContextProvider
                value={{
                    cashiers,
                    setCashiers,
                    store_id,

                }}
            >

            
            <Drawer onClose={() => {
                setType('')
                setDrawerOpened(false)
            }} anchor="right" open={drawerOpened} >
                <Box  width={matches ? width : 320 }>
                    <Box p={1}  display="flex" justifyContent="flex-end">
                        <IconButton onClick={() => {
                            setType('')
                            toggleDrawer()
                        }
                        }> 
                            <Close />
                        </IconButton>

                    </Box>
                    
                    {
                        type === "create" ? 
                        <CreateCashier />
                        : type === "edit" ?
                        <EditCashier />
                        : type === "show" ?
                        <CashierInfo /> : null
                    }
                </Box>
            </Drawer>
            <Box p={2} display="flex" marginTop={3} alignItems="center" justifyContent="space-between" >
                <Typography variant="h6"> Store Cashiers</Typography>
                <Button onClick={() => {
                    setType('create')
                    toggleDrawer()
                }
                
                } style={{backgroundColor: "dodgerblue", color: "white"}}>
                    Create
                    
                </Button>
            </Box>
            
            <Divider />


            {

                loading ? 
                <Box style={{height: "calc(90vh - 200px)"}} display="flex" alignItems="center" justifyContent="center" >
                    <CircularProgress size={26} />
                </Box> : 
                failed ?
                <Box style={{height: "calc(90vh - 200px)"}} display="flex" alignItems="center" justifyContent="center">
                    <Box>
                        <Typography> Opps Something Went wrong !!!</Typography>
                            <Box p={2}>
                                <Button style={{backgroundColor: "orange"}} onClick={handleRetrys}>
                                    Retry
                                </Button>
                            </Box>
                        </Box>
                        
                    </Box>  :

                        <Box p={2} marginTop={3} >
                        <Grid  spacing={3} container>
                            {

                                cashiers.map((cashier) => {
                                    const {id, name, salary_balance} = cashier

                                    return (
                                        <Grid key={id} item xs={12} sm={6} md={4} lg={3} >
                                            <Box width="100%" display="flex" justifyContent="center" >
                                                
                                                <Box width="100%" borderRadius={10}   style={{backgroundColor: "#010b22"}} height={300} >
                                                    
                                                    <Box  display="flex" justifyContent="center"  marginTop={-2} > 
                                                        <Avatar style={{backgroundColor: "black", fontWeight: "bolder"}}> {name.toUpperCase().charAt(0)} </Avatar>
                                                    </Box>

                                                    <Box marginTop={2} >
                                                        <IconButton >
                                                            <Star  style={{color: "green"}}/>
                                                        </IconButton>
                                                    </Box>

                                                    <Box marginTop={2} p={3}>
                                                        <Typography> {name}</Typography>
                                                    </Box>

                                                    <Box  p={1}>
                                                            <Typography> ₦ {AmountFormater(salary_balance).amount()} </Typography>
                                                    </Box>

                                                    <Box display="flex" justifyContent="space-around">
                                                        <IconButton  onClick={() => {
                                                            setType('edit')
                                                            toggleDrawer()
                                                        }}>
                                                            <Edit style={{color: "orange"}} />
                                                        </IconButton>

                                                        <IconButton  onClick={() => {
                                                            setType('show')
                                                            toggleDrawer()
                                                        }}>
                                                            <Visibility style={{color: "#4ab2d3"}} />
                                                        </IconButton>

                                                    </Box>

                                                    
                                                </Box>
                                                
                                            </Box>
                                        </Grid>
                                    )
                                })



                            }
                            

                        
                        </Grid>
                    </Box>

            }
        </CashierContextProvider>
        </Container>
    )
}

export default CashierContainer