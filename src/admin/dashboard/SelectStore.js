import React, { useContext } from 'react'
import {Box, Select, MenuItem, CircularProgress, Backdrop} from '@material-ui/core/'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AdminDashboardContext from '../../context/admin/AdminDashboardContext';
import axios from 'axios'


function SelectStore(){
  const [store, setStore] = React.useState('upright');
  const {selectStore, storeIcon, backdrop} = useContext(AdminDashboardContext).styles
  const {changeStoreName, setDashboardData} = useContext(AdminDashboardContext).store

  console.log(setDashboardData)
  const [backdropState, setBackdropState] = React.useState(false);
  

    const handleChange = (event) => {
      setBackdropState(true)
      axios({
        method: "GET",
        url: `http://localhost:3001/api/v1/admin_dashboard/?store=${event.target.value}`,
        headers: JSON.parse(localStorage.getItem('admin'))
      }).then(response => {
        const {data} = response
      
          
            setDashboardData(data)
            changeStoreName(event.target.value)
            setStore(event.target.value);
            setTimeout(() => {
              setBackdropState(false)
          }, 2000)
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