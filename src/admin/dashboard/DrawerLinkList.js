import React, { useContext} from 'react'
import {List, ListItem, ListItemText, ListItemIcon} from '@material-ui/core/'
import AdminDashboardStyleContext from '../../context/admin/AdminDashboardStyleContext';
import axios from 'axios'
import {useHistory} from 'react-router-dom'


function DrawerLinkList(){
    const {img, toolbar} = useContext(AdminDashboardStyleContext).styles
    const history = useHistory()

    return ( 
            <div>
           
              <div className={toolbar} />
              
              <List>
                
                  <ListItem button>
                     
                     <ListItemIcon style={{marginBottom: "4px"}}> <img src="static/images/shopping-bag.png" className={img} alt="items"/>  </ListItemIcon>
                    <ListItemText primary="Audit Items"/>
                  </ListItem>
        
                  <ListItem button>
                     
                     <ListItemIcon > <img src="static/images/warehouse.png" alt="warehouse" className={img} />  </ListItemIcon>
                    <ListItemText primary="WareHouse"/>
                  </ListItem>
        
                  <ListItem button>
                     
                     <ListItemIcon > <img src="static/images/workers.png" alt="workers" className={img} />  </ListItemIcon>
                    <ListItemText primary="Workers"/>
                  </ListItem>
        
                  
                  <ListItem button>
                  <ListItemIcon > <img src="static/images/logout.png" alt="logout" className={img} />  </ListItemIcon>
                  <ListItemText primary="Logout" onClick={(e) => {
        
                    e.preventDefault();
                    axios({
                      method: "DELETE",
                      url: "http://localhost:3001/api/v1/auth_admin/sign_out",
                      data: JSON.parse(localStorage.admin)
                    }).then((response) =>{
                      localStorage.removeItem('admin')
                      history.push("/")
                    }).catch(err => {
                      console.log(err)
                    })
        
                 
                  }}/>
                </ListItem>
              </List>
              
            </div>
          );
    

}


export default DrawerLinkList