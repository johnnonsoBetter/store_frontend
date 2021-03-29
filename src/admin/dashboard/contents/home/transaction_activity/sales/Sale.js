import { Typography, Box, IconButton, Avatar, makeStyles, Divider, Badge, Button} from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import SalesContext  from '../../../../../../context/admin/transaction_activity/sales/SalesContext'
import axios from 'axios'
import { ArrowBackOutlined, CloseOutlined } from '@material-ui/icons'
import deepOrange from '@material-ui/core/colors/deepOrange'
import clsx from 'clsx';
import { SaleInfoContextProvider } from '../../../../../../context/admin/transaction_activity/sales/SaleInfoContext'
import SaleInfo from './SaleInfo'
import ItemsSold from './ItemsSold'

function Sale(){
    const {receipt_id, setReceiptId} = useContext(SalesContext)
    const [items_sold, setItemsSold] = useState([])
    const [display, setDisplay] = useState('sale_info')
   
    
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
      
          }).catch(err => {
      
            console.log(err)
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
            
        }
    }, [])

    console.log(items_sold)
    return (
        <Box p={1}>
            <Box display="flex"  width="100%" justifyContent="space-between" >
              { display !== "sale_info" && <Box display="flex">
                <IconButton onClick = {() => setDisplay('sale_info')}> <ArrowBackOutlined />  </IconButton>
              </Box>}


              <Box display="flex">
                <IconButton> <CloseOutlined />  </IconButton>
              </Box>
               
            </Box>

            <SaleInfoContextProvider value={{
              sale,
              setDisplay: (display) => setDisplay(display),
              items_sold,
              display,
            }}>

            {
              display === "sale_info" ? <SaleInfo /> : <ItemsSold />
            }

            </SaleInfoContextProvider>
            
        
        </Box>

    )
}





export default Sale