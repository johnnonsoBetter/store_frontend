import React, { useContext } from 'react'
import {Box, Select, MenuItem} from '@material-ui/core/'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AdminDashboardStyleContext from '../../context/admin/AdminDashboardStyleContext';


function SelectStore(){
    const [store, setStore] = React.useState('upright');
    const {selectStore, storeIcon} = useContext(AdminDashboardStyleContext).styles
    const {changeStoreName} = useContext(AdminDashboardStyleContext).store
   

    const handleChange = (event) => {
      setStore(event.target.value);
      changeStoreName(event.target.value)
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