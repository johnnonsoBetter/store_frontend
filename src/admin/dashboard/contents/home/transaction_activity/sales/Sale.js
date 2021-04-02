import { Typography, Box, IconButton, CircularProgress, createMuiTheme} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ArrowBackOutlined, CloseOutlined } from '@material-ui/icons'
import { SaleInfoContextProvider } from '../../../../../../context/admin/transaction_activity/sales/SaleInfoContext'
import SaleInfo from './SaleInfo'
import ItemsSold from './ItemsSold'
import {ThemeProvider} from '@material-ui/styles'
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red'
import grey from '@material-ui/core/colors/grey'
import { salesApi } from '../../../../../../api/shared/sale/api'

const theme = createMuiTheme({

  palette: {
    primary: {
      main: green[600]
    },
    secondary: {
      main: red[600]
    },
    success: {
      main: grey[100]
    }
  },
  typography: {
    fontFamily: [
      'Kanit',
      'cursive',
    ].join(','),
   
}
})

function Sale(props){
    const {receipt_id, setReceiptId, toggleSaleDrawer} = props
    const [items_sold, setItemsSold] = useState([])
    const [display, setDisplay] = useState('sale_info')
    const [loading, setLoading] = useState(true)
    const [failedToLoad, setFailedToLoad] = useState(false)
    const saleApi = salesApi()
   
    
    const [sale, setSale] = useState({
        total_items_amount: 0,
        discount: 0,
        cashback_profit: 0,
        transfer_amount: 0,
        pos_amount: 0,
        cash_amount: 0,
        transaction_type: 0,
        total_amount_paid: 0,
        issue: false,
        receipt_was_issued: false,
        cashier_name: "",
        created_at: ''
    })

    

   

    useEffect(()=> {
       salesApi().fetchByReceiptId(receipt_id).then(response => {
            const {sale, item_solds} = response.data
            console.log(sale)
            setSale(sale)
            setItemsSold(item_solds)
            setDisplay('sale_info')
            setLoading(false)
      
          }).catch(err => {
      
            console.log(err)
            setFailedToLoad(true)
           
          })
        return ()=>{
            setReceiptId('')
            setSale({
              total_items_amount: 0,
              discount: 0,
              cashback_profit: 0,
              transfer_amount: 0,
              pos_amount: 0,
              cash_amount: 0,
              transaction_type: 0,
              total_amount_paid: 0,
              issue: false,
              receipt_was_issued: false,
              cashier_name: "",
              created_at: ''
          })
            setItemsSold([])
            setDisplay('sale_info')
            
            
            
        }
    }, [])


    return (
      <ThemeProvider theme={theme}>
        <Box p={1}>
            <Box display="flex"  width="100%" justifyContent="space-between" >
              { display !== "sale_info" && <Box display="flex">
                <IconButton onClick = {() => setDisplay('sale_info')}> <ArrowBackOutlined />  </IconButton>
              </Box>}


              <Box display="flex">
                <IconButton onClick={() => toggleSaleDrawer(false)}> <CloseOutlined />  </IconButton>
              </Box>
               
            </Box>

            <SaleInfoContextProvider value={{
              sale,
              setDisplay: (display) => setDisplay(display),
              items_sold,
              display,
            }}>

              {
                loading ? 
                <Box height={450} alignItems="center" display="flex" justifyContent="center">
                   
                      {failedToLoad ? <Typography> Failed to load </Typography> :  <CircularProgress /> }
                    
                </Box>
               
                
                : SaleComponent(display)


              }

            

            </SaleInfoContextProvider>
            
        
        </Box>
        </ThemeProvider>

    )
}

const SaleComponent = (display) => {

  return (
    
      display === "sale_info" ? <SaleInfo /> : <ItemsSold />
    
  )
}





export default Sale