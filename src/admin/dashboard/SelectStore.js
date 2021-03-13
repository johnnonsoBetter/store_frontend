import React, { useContext } from 'react'
import {Box, Select, MenuItem, CircularProgress, Backdrop} from '@material-ui/core/'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AdminDashboardContext from '../../context/admin/AdminDashboardContext';
import axios from 'axios'


function SelectStore(){
  const [store, setStore] = React.useState('upright');
  const {selectStore, storeIcon, backdrop} = useContext(AdminDashboardContext).styles
  const {changeStoreName, setDashboardData, setGeneralStoreInfos, setTransactionReviewInfos, setInventoryManagerInfos} = useContext(AdminDashboardContext).store
  const [backdropState, setBackdropState] = React.useState(false);
  

    const handleChange = (event) => {
      setBackdropState(true)
      axios({
        method: "GET",
        url: `http://localhost:3001/api/v1/admin_dashboard/?store=${event.target.value}`,
        headers: JSON.parse(localStorage.getItem('admin'))
      }).then(response => {
          const {data} = response
          const {change_balance, next_day_change, total_debts_amount, transaction_activity, inventory_manager} = data
      
          
            setDashboardData(data)
            changeStoreName(event.target.value)
            setStore(event.target.value);
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
    };

   



    return (
          
          <div>
            { backdropState === true ? 
                <Backdrop className={backdrop} open={backdropState} >
                  <CircularProgress color="inherit" />
                </Backdrop>
                :
            <Box display="flex"  justifycontent="center" alignItems="center" color="white" className={selectStore} >
                    
              <ShoppingCartIcon className={storeIcon}/>
              <Select
                labelId="demo-simple-select-label"
               
                value={store}
                style={{color: "whitesmoke"}}
                onChange={handleChange}
              >
                <MenuItem  value={"upright"}>Upright</MenuItem>
                <MenuItem value={"dechoice"}>Dechoice</MenuItem>
                
              </Select>
            </Box>
            }
           
            
            </div>
    )
    
}

export default SelectStore