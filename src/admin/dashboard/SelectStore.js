import React, { useContext } from 'react'
import {Box, MenuItem, Menu} from '@material-ui/core/'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AdminDashboardContext from '../../context/admin/AdminDashboardContext';
import AdminDashboardStyleContext from '../../context/admin/AdminDashboardContext';


function SelectStore(){
  
  const {selectStore, storeIcon} = useContext(AdminDashboardContext).styles
  const {changeStoreName} = useContext(AdminDashboardStyleContext).store
  
    const handleChange = (store) => {
      changeStoreName(store)
   
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
                   
                    handleChange("upright")
                    handleClose()
                  }}>Upright</MenuItem>
                  <MenuItem onClick={()=> {
                   
                    handleChange("dechoice")
                    handleClose()
                  }}>Dechoice</MenuItem>
                </Menu>
            </Box>
       
            
           
            
            </div>
    )
    
}

export default SelectStore

