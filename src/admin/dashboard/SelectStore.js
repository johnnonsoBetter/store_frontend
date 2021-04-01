import React, { useContext } from 'react'
import {Box, MenuItem, CircularProgress, Backdrop, Menu} from '@material-ui/core/'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AdminDashboardContext, { AdminDashboardContextProvider } from '../../context/admin/AdminDashboardContext';
import AmountFormater from '../../helpers/AmountFormater'

import AdminDashboardStyleContext from '../../context/admin/AdminDashboardContext';
import { dashboardApi } from '../../api/admin/dashboard/api';


function SelectStore(){
  const [setStore] = React.useState('upright');
  const {selectStore, storeIcon, backdrop} = useContext(AdminDashboardContext).styles
  const {changeStoreName, setDashboardData, setGeneralStoreInfos, staticDate, setTransactionReviewInfos} = useContext(AdminDashboardStyleContext).store
  const [backdropState, setBackdropState] = React.useState(false);

  

    const handleChange = (store) => {
      setBackdropState(true)
        dashboardApi(store).load().then(response => {
          const {data} = response
          const {change_balance, next_day_change, transaction_activity, inventory_manager} = data
      
          
            setDashboardData(data)
            changeStoreName(store)
            
           

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

        setTimeout(() => {
          setBackdropState(false)
        }, 200)

        

      }).catch(err => {
        console.log(err)
      })
    };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

   



    return (
          
          <div>
            { backdropState === true ? 
                <Backdrop className={backdrop} open={backdropState} >
                  <CircularProgress color="inherit" />
                </Backdrop>
                :
            <Box display="flex"  justifycontent="center" alignItems="center" color="white" className={selectStore} >
                    
                <ShoppingCartIcon  aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={storeIcon}/>
              
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  
                  <MenuItem onClick={()=> {
                    handleClose()
                    handleChange("upright")
                  }}>Upright</MenuItem>
                  <MenuItem onClick={()=> {
                    handleClose()
                    handleChange("dechoice")
                  }}>Dechoice</MenuItem>
                </Menu>
            </Box>
            }
            
           
            
            </div>
    )
    
}

export default SelectStore

