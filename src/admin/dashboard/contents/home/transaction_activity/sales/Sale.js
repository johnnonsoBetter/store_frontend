import { Typography, Box, IconButton, CircularProgress} from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import SalesContext  from '../../../../../../context/admin/transaction_activity/sales/SalesContext'
import axios from 'axios'
import { ArrowBackOutlined, CloseOutlined } from '@material-ui/icons'
import { SaleInfoContextProvider } from '../../../../../../context/admin/transaction_activity/sales/SaleInfoContext'
import SaleInfo from './SaleInfo'
import ItemsSold from './ItemsSold'

function Sale(props){
    const {receipt_id, setReceiptId, toggleSaleDrawer} = props
    const [items_sold, setItemsSold] = useState([])
    const [display, setDisplay] = useState('sale_info')
    const [loading, setLoading] = useState(true)
    const [failedToLoad, setFailedToLoad] = useState(false)
   
    
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
        cashier_name: ""
    })

    

   

    useEffect(()=> {
        axios({
            method: 'GET',
            url: `http://localhost:3001/api/v1/sales/${receipt_id}`,
            headers: JSON.parse(localStorage.getItem('admin'))
          }).then(response => {
            const {sale, item_solds} = response.data
           
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
              cashier_name: ""
          })
            setItemsSold([])
            setDisplay('sale_info')
            
            
            
        }
    }, [])


    return (
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

    )
}

const SaleComponent = (display) => {

  return (
    
      display === "sale_info" ? <SaleInfo /> : <ItemsSold />
    
  )
}





export default Sale