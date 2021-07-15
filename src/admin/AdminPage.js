import React, { useEffect, useState } from 'react'
import { AdminDashboardContextProvider } from '../context/admin/AdminDashboardContext'
import LoginForm from './LoginForm'
import {makeStyles, createMuiTheme, useTheme, ThemeProvider} from '@material-ui/core/styles'
import {CssBaseline, Hidden, Drawer, Container, Box } from '@material-ui/core'
import { Switch, Route} from 'react-router-dom'
import DrawerLinkList from './dashboard/DrawerLinkList'
import Home from './dashboard/contents/home/Home'
import FixedAppBar from './dashboard/FixedAppBar'
import AuditItem from './dashboard/contents/audit_item/AuditItem'
import Content from './dashboard/contents/home/transaction_activity/Content'
import StoreItems from './dashboard/contents/store_items/StoreItemsInventory'
import InventoryAppBar from './dashboard/InventoryAppBar'
import InventoryContent from './dashboard/contents/home/inventory_activity/InventoryContent'
import Settings from './dashboard/contents/home/settings/Settings'
import SettingsAppBar from './dashboard/contents/home/settings/SettingsAppBar'
import CashierContainer from './dashboard/contents/home/cashier/CashierContainer'
import CashierAppBar from './dashboard/contents/home/cashier/CashierAppBar'


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
      width: "100%"
    },

    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },

    drawer: {
      [theme.breakpoints.up('lg')]: {
        width: drawerWidth,
        flexShrink: 0,
      
      },

    },
    img: {
    
      height: "auto",
      marginTop: theme.spacing(0)
    },
    
    appBar: {
      [theme.breakpoints.up('lg')]: {
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
      padding: theme.spacing(4),
      color: "white",
      fontSize: theme.typography.pxToRem(1),
      fontWeight: theme.typography.fontWeightRegular,
      textTransform: "capitalize"
      
    },

    infoLinksContainer: {
      
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
      textTransform: "capitalize"
    },

    storeBaseDetail: {

      backgroundColor: "#0b1125",
      color: "white"
    },

    storeInfoContainer: {

      backgroundColor: "#0b1125",
     
    },

    storeBaseInfo: {
      minWidth: 270,
      margin: theme.spacing(2),
      backgroundColor: "#0b1125",
      padding: theme.spacing(0),
      color: "white"
    },

    infoContainer: {
      backgroundColor: "#453b542e",
      
      borderRadius: "9px",
      color: "wheat",
      margin: theme.spacing(1),
      
      
    },

    infoText: {
      
      paddingRight: "3px",
      paddingLeft: "3px",
      borderRadius: "20%",
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    }
    ,
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },

    adminAvatar: {
      width: theme.spacing(9),
      height: theme.spacing(9),
      marginBottom: theme.spacing(2)
    },

    avatarContainer: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      letterSpacing: "5px"
    },
    textHeight: {
      lineHeight: "2",
      letterSpacing: "2px"
    },
    theLink: {
      textDecoration: "none"
    }

  }));


function AdminPage(props){
    
     
      
    const currentUser = localStorage.getItem('admin')
    
    // style states
    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const classes = useStyles()

    // info states
    const [storeName, setStoreName] = useState("")
    const [dashboardData, setDashboardData] = useState(null)
    const [generalStoreInfos, setGeneralStoreInfos] = useState([])
    const [transactionReviewInfos, setTransactionReviewInfos] = useState([])
    const [inventoryManagerInfos, setInventoryManagerInfos] = useState([])
    const [staticDate, setStaticDate] = useState('')



    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const closeDrawer = () => {
      setMobileOpen(false)
    }

    
    
    
    
    
    return (
      <>

          {currentUser ? 
          
 
            <AdminDashboardContextProvider value={{
              muiTheme: muiTheme,
              styles: classes,
              drawerWidth: drawerWidth,

              handleDrawerToggle,
              

              
              store: {

                storeName: storeName,
                dashboardData: dashboardData,
                generalStoreInfos: generalStoreInfos,
                transactionReviewInfos: transactionReviewInfos,
                inventoryManagerInfos: inventoryManagerInfos,
                changeStoreName: name => setStoreName(name),
                setDashboardData: data => setDashboardData(data),
                setGeneralStoreInfos: generalStoreInfos => setGeneralStoreInfos(generalStoreInfos),
                setTransactionReviewInfos: transactionReviewInfos => setTransactionReviewInfos(transactionReviewInfos),
                setInventoryManagerInfos: inventoryManagerInfos => setInventoryManagerInfos(inventoryManagerInfos),
                staticDate,
                setStaticDate: (static_date) => setStaticDate(static_date)
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
                     
                      <DrawerLinkList handleDrawerToggle={closeDrawer}/> 
                    </Drawer>
                  </Hidden>
                  <Hidden mdDown implementation="css">
                    <Drawer
                      
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                      variant="permanent"
                      open
                    >
                        
                      <DrawerLinkList handleDrawerToggle={closeDrawer}/>
                    </Drawer>
                  </Hidden>
                </nav>

                    <main className={classes.content} >
                    <div className={classes.toolbar} />
                    
                      <Switch>

                          <Route exact={true} path="/admin_dashboard/transaction_activity/" >
                            
                            <Content />
                          </Route>

                          <Route exact={true} path="/admin_dashboard/inventory_activity" >
                           
                             <Box width="100%">
                             <InventoryAppBar handleDrawerToggle={handleDrawerToggle}/>
                          
                             <InventoryContent />

                             </Box>
                            
                              
                           
                            
                            
                          </Route>

                          <Route exact={true} path="/admin_dashboard/:storeName/statistics_report" >
                              <h1>  Statistics Reports</h1>
                          </Route>

                          <Route exact={true} path="/admin_dashboard/:storeName/items" >
                            <StoreItems />
                          
                          </Route>
                          
                          <Route exact={true} path="/admin_dashboard/:storeName/cashiers" >
                              <CashierAppBar handleDrawerToggle={handleDrawerToggle} />
                              <CashierContainer />
                              
                          </Route>

                          <Route exact={true} path="/admin_dashboard/:storeName/settings" >
                             <SettingsAppBar handleDrawerToggle={handleDrawerToggle}/>
                             <Settings />
                          </Route>

                          <Route exact={true} path="/admin_dashboard/audit_item" >
                              <FixedAppBar handleDrawerToggle={handleDrawerToggle}/>
                              <AuditItem />
                          </Route>

                          <Route exact={true} path='/admin_dashboard/warehouse'>
                              <FixedAppBar handleDrawerToggle={handleDrawerToggle}/>
                              <h1> THIs is the same warehouse</h1>
                          </Route>

                          <Route exact={true} path='/admin_dashboard/workers'>
                              <FixedAppBar handleDrawerToggle={handleDrawerToggle}/>
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
