import React, { useState } from 'react'
import { AdminDashboardContextProvider } from '../context/admin/AdminDashboardContext'
import AdminDashboard from './dashboard/AdminDashboard'
import LoginForm from './LoginForm'
import {makeStyles, createMuiTheme} from '@material-ui/core/styles'



  const drawerWidth = 240;

  const muiTheme = createMuiTheme({
      typography: {
        fontFamily: [
          'Kanit',
          'cursive',
        ].join(','),
  },});

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      
      },

    },
    img: {
    
      height: "auto"
    },
    
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      backgroundColor: "#282c34",
      boxShadow: "none"

    },
    toolBar: {
      display: "flex",
      justifyContent: "space-around"
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    
    },
    storeIcon: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    selectStore: {
      flexGrow: 1
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#1f1f1f",
      color: "white"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },

    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },

    infoLinks: {
      minWidth: 270,
      margin: theme.spacing(2),
      backgroundColor: "#0b1125",
      padding: theme.spacing(5),
      color: "white"
    },

    infoLinksContainer: {
      marginTop: theme.spacing(5),
      padding: theme.spacing(0),
    
    },

    startContainer: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(1)
    },

    appBarPickerContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexGrow: 1
    }

  }));



function AdminPage(){
    
    const styles = useStyles()
    const [storeName, setStoreName] = useState("upright")
    const [dashboardData, setDashboardData] = useState({})

    const currentUser = localStorage.getItem('admin')
    
    return (
      <>
          {currentUser ? 
          
 
            <AdminDashboardContextProvider value={{
              muiTheme: muiTheme,
              styles: styles,
              drawerWidth: drawerWidth,
              store: {
                storeName: storeName,
                dashboardData: dashboardData,
                changeStoreName: (name)=>{
                  setStoreName(name)
                },
                setDashboardData: (data) => {
                  setDashboardData(data)

                }
                

              }
              
            }}>
              <AdminDashboard />
            </AdminDashboardContextProvider>

          : <LoginForm />}
      </>
      
    )
}

export default AdminPage
