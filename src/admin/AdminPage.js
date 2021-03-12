import React, { useState } from 'react'
import { AdminDashboardContextProvider } from '../context/admin/AdminDashboardContext'
import LoginForm from './LoginForm'
import {makeStyles, createMuiTheme, useTheme, ThemeProvider} from '@material-ui/core/styles'
import {CssBaseline, Hidden, Drawer, } from '@material-ui/core'
import { Switch, Route} from 'react-router-dom'
import DrawerLinkList from './dashboard/DrawerLinkList'
import Home from './dashboard/contents/home/Home'
import FixedAppBar from './dashboard/FixedAppBar'


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

    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },

    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      
      },

    },
    img: {
    
      height: "auto",
      marginTop: theme.spacing(0)
    },
    
    appBar: {
      [theme.breakpoints.up('md')]: {
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
      [theme.breakpoints.up('md')]: {
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
    },
    fab: {
      position: "fixed",
      bottom: "3em",
      right: "2em"
    },
    preference: {
      margin: theme.spacing(7),
    
      color: "white"
    },
    preferenceLink: {

      color: "white",
      textDecoration: "none",
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(0.3),
      backgroundColor: "black",
      borderRadius: "10px"
    },

    storeBaseInfoHeader: {

      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },

    storeBaseDetail: {

      backgroundColor: "#0b1125",
      color: "white"
    },

    storeBaseInfo: {
      minWidth: 270,
      margin: theme.spacing(2),
      backgroundColor: "#0b1125",
      padding: theme.spacing(0),
      color: "white"
    },

  }));


function AdminPage(props){
    
    const classes = useStyles()
    const [storeName, setStoreName] = useState("upright")
    const [dashboardData, setDashboardData] = useState(null)
    const currentUser = localStorage.getItem('admin')


    const { window } = props;
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    
 

  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;
    
    
    
    return (
      <>

          {currentUser ? 
          
 
            <AdminDashboardContextProvider value={{
              muiTheme: muiTheme,
              styles: classes,
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

              <ThemeProvider theme={muiTheme}>

                          
                          


              <div className={classes.root}>
                <CssBaseline />


              
            
                <nav className={classes.drawer} aria-label="mailbox folders">
                  {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                  <Hidden smUp implementation="css">
                    <Drawer
                      container={container}
                      
                      variant="temporary"
                      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                      open={mobileOpen}
                      onClose={handleDrawerToggle}
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                      ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                      }}
                    >
                      <DrawerLinkList /> 
                    </Drawer>
                  </Hidden>
                  <Hidden smDown implementation="css">
                    <Drawer
                      
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                      variant="permanent"
                      open
                    >
                      <DrawerLinkList />
                    </Drawer>
                  </Hidden>
                </nav>

                  <main className={classes.content}>
                      <div className={classes.toolbar} />
                  <Switch>

                   
                      <Route exact={true} path="/admin_dashboard/audit_item" component={<h1> How are we </h1>}>
                          <h1> Audit item</h1>
                      </Route>

                      <Route exact={true} path='/admin_dashboard/warehouse'>
                       
                          <h1> THIs is the same warehouse</h1>
                      </Route>

                      <Route exact={true} path='/admin_dashboard/workers'>
                       
                          <h1> THIs is the same workers</h1>
                      </Route>

                      <Route exact={true} path='/admin_dashboard/'>
                        <FixedAppBar handleDrawerToggle={handleDrawerToggle}/>

                          <Home />
                          
                      </Route>
                   
                </Switch>
                </main>
                </div>
                </ThemeProvider>
        
              
            </AdminDashboardContextProvider>

          : <LoginForm />}
      </>
      
    )
}

export default AdminPage
