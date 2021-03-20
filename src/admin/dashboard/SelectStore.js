import React, { useContext } from 'react'
import {Box, Select, MenuItem, CircularProgress, Backdrop} from '@material-ui/core/'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AdminDashboardContext from '../../context/admin/AdminDashboardContext';
import AmountFormater from '../../helpers/AmountFormater'
import axios from 'axios'


function SelectStore(){
  const [store, setStore] = React.useState('upright');
  const {selectStore, storeIcon, backdrop} = useContext(AdminDashboardContext).styles
  const {changeStoreName, setDashboardData, setGeneralStoreInfos, setTransactionReviewInfos} = useContext(AdminDashboardContext).store
  const [backdropState, setBackdropState] = React.useState(false);

  

    const handleChange = (event) => {
      setBackdropState(true)
      axios({
        method: "GET",
        url: `http://localhost:3001/api/v1/admin_dashboard/?store=${event.target.value}`,
        headers: JSON.parse(localStorage.getItem('admin'))
      }).then(response => {
          const {data} = response
          const {change_balance, next_day_change, transaction_activity, inventory_manager} = data
      
          
            setDashboardData(data)
            changeStoreName(event.target.value)
            setStore(event.target.value);
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