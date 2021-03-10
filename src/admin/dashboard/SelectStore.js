import React, { useContext } from 'react'
import {Box, Select, MenuItem} from '@material-ui/core/'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AdminDashboardContext from '../../context/admin/AdminDashboardContext';
import axios from 'axios'


function SelectStore(){
  const [store, setStore] = React.useState('upright');
  const {selectStore, storeIcon} = useContext(AdminDashboardContext).styles
  const {changeStoreName, setDashboardData, storeName} = useContext(AdminDashboardContext).store
  

    const handleChange = (event) => {
      
      
      axios({
        method: 'GET',
        url: `http://localhost:3001/api/v1/admin_dashboard/?store=${event.target.value}`,
        headers: JSON.parse(localStorage.getItem('admin'))
      }).then(response => {
          
    
          const {data} = response
    
          //setData(data)
          setDashboardData(data)
          changeStoreName(event.target.value)
          setStore(event.target.value);
          console.log(data)

      }).catch(err => {
    
          console.log(err)
      })
    };



    return (
        
          <div>
            <Box display="flex"  justifyContent="center" alignItems="center" color="white" className={selectStore} >
                    
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
           
            
            </div>
    )
    
}

export default SelectStore