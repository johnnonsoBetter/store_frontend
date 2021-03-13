import React, { useContext} from 'react'
import {List, ListItem, ListItemText, ListItemIcon, Avatar, Box, Typography} from '@material-ui/core/'
import AdminDashboardContext from '../../context/admin/AdminDashboardContext';
import axios from 'axios'
import {useHistory, Link, NavLink} from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person'


function DrawerLinkList(props){
    const {img, toolbar, adminAvatar, avatarContainer} = useContext(AdminDashboardContext).styles
    const history = useHistory()
    const base_imageUrl = 'static/images/' 

    return ( 
            <>
              <div className={toolbar} />
              <Box display="flex" className={avatarContainer}>
                <Avatar className={adminAvatar}>
                  <PersonIcon />
                </Avatar>
                <Typography > Admin </Typography>
              </Box>

              
              <List>
                
                  <ListItem button component={NavLink} active={true} onClick={props.handleDrawerToggle} to="/admin_dashboard">
                     
                     <ListItemIcon  style={{marginBottom: "4px"}}> <img src={`/${base_imageUrl}dashboard.png`} className={img} alt="items"/>  </ListItemIcon>
                    <ListItemText primary="Store Dashboard"/>
                  </ListItem>

                  <ListItem onClick={props.handleDrawerToggle} button component={Link} to="/admin_dashboard/audit_item">
                     
                     <ListItemIcon  style={{marginBottom: "4px"}}> <img src={`/${base_imageUrl}shopping-bag.png`} className={img} alt="items"/>  </ListItemIcon>
                    <ListItemText primary="Audit Items"/>
                  </ListItem>
        
                  <ListItem onClick={props.handleDrawerToggle} button component={Link} to="/admin_dashboard/warehouse" >
                     
                     <ListItemIcon > <img src={`/${base_imageUrl}warehouse.png`} alt="warehouse" className={img} />  </ListItemIcon>
                    <ListItemText primary="WareHouse"/>
                  </ListItem>
        
                  <ListItem onClick={props.handleDrawerToggle} button component={Link} to="/admin_dashboard/workers">
                     
                     <ListItemIcon > <img src={`/${base_imageUrl}workers.png`} className={img} alt="workers" />  </ListItemIcon>
                    <ListItemText primary="Workers"/>
                  </ListItem>
        
                  
                  <ListItem button component={Link} to="/">
                  <ListItemIcon > <img src={`/${base_imageUrl}logout.png`} className={img} alt="logout" />  </ListItemIcon>
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
              
            </>
          );
    

}


export default DrawerLinkList