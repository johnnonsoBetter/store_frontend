import { Box, Button, CircularProgress, Container, Drawer, Grid, IconButton, Typography, useMediaQuery } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { store } from '../../../../../api/admin/item/api'
import { SettingsContextProvider } from '../../../../../context/admin/settings/SettingsContext'
import CashierSettings from './CashierSettings'
import GeneralSetting from './GeneralSetting'
import InternalInfoSettings from './InternalInfoSettings'
import UpdateSettingsForm from './UpdateSettingsForm'


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

function Settings(){

    const [drawerOpened, setDrawerOpened] = useState(true)
    const [loading, setLoading] = useState(false)
    const [failed, setFailed] = useState(false)
    const [width] = useWindowSize()

    const [storeInfo, setStoreInfo] = useState({})
    const {storeName} = useParams()
    const matches = useMediaQuery('(max-width:600px)')



  
    


    useEffect(()=> {
        setLoading(true)
        setStoreInfo({
            name: '',
            next_day_change: 0,
            full_name: '',
            address: '',
            telephone: '',
            max_excess: 0,
            mini_excess: 0,
            receipt_remark: '',
            change_balance: 0,
            cashier_sale_limit: 0
        })

        store(storeName).getInfo().then((response) => {

            console.log(response)
            const {name, full_name, address, telephone, next_day_change, max_excess, mini_excess, receipt_remark, change_balance, cashier_sale_limit} = response.data
            setLoading(false)
            setStoreInfo({
                name,
                next_day_change,
                full_name,
                address,
                telephone,
                max_excess,
                mini_excess,
                receipt_remark,
                change_balance,
                cashier_sale_limit,
            })
            
        }).catch(err => {
            console.log(err)
            setLoading(false)
            setFailed(true)
        })

        return () => {

            setDrawerOpened(false)
            setFailed(false)
            setLoading(false)
            setStoreInfo({})
        }


    }, [])


    return (
        <Container>

            {
                loading ? 
                <Box style={{height: "calc(100vh - 200px)"}} display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress size={29} />
                </Box> :
                failed ? 
                <Box style={{height: "calc(100vh - 200px)"}} display="flex" alignItems="center" justifyContent="center">
                    <Box>
                        <Typography> Opps Something Went Wrong !!</Typography>
                        <Box p={2}>
                            <Button> Retry </Button>
                        </Box>
                    </Box>
                </Box> :
        
                <>
                <Drawer anchor="right" open={drawerOpened}  onClose={()=> setDrawerOpened(false)} >
                    <Box width={matches ? width : 350 }>
                        <Box display="flex" justifyContent="flex-end">
                            <IconButton onClick={() => setDrawerOpened(false)}>
                                <Close />
                            </IconButton>
                        </Box>
                        <Box p={1} textAlign="center">
                            <Typography style={{textTransform: "capitalize"}} variant="h6"> Update {storeName} Settings </Typography>
                        </Box>
                        <UpdateSettingsForm />
                    </Box>
                </Drawer>
                <SettingsContextProvider
                    value={{
                        drawerOpened,
                        setDrawerOpened,
                        storeInfo
                    }}
                >

                    <GeneralSetting />

                    <CashierSettings />

                    <InternalInfoSettings />

                </SettingsContextProvider>
                </>



            }


            
           

           
        </Container>
    )
}

export default Settings