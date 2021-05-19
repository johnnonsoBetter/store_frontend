import { Box, Button, CircularProgress, Container, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { store } from '../../../../../api/admin/item/api'
import { SettingsContextProvider } from '../../../../../context/admin/settings/SettingsContext'
import CashierSettings from './CashierSettings'
import GeneralSetting from './GeneralSetting'
import InternalInfoSettings from './InternalInfoSettings'

function Settings(){

    const [drawerOpened, setDrawerOpened] = useState(false)
    const [loading, setLoading] = useState(false)
    const [failed, setFailed] = useState(false)
    

    const [storeInfo, setStoreInfo] = useState({})
    const {storeName} = useParams()

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