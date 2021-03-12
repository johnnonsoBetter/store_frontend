
import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Drawer, Backdrop, CircularProgress, ListItem, ListItemIcon, ListItemText, List} from '@material-ui/core/';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import Home from './contents/Home'
import axios from 'axios'



import {
  Switch,
  Route,
  Link, useRouteMatch, useHistory, BrowserRouter
} from "react-router-dom";
import AdminDashboardStyleContext from '../../context/admin/AdminDashboardContext';
import DrawerLinkList from './DrawerLinkList';
import FixedAppBar from './FixedAppBar';

const drawerWidth = 240;


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
    margin: theme.spacing(3),
    backgroundColor: "#0f2e447a",
    padding: theme.spacing(7),
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


}));


function AdminDashboard(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory()
 

  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  
  let { path, url } = useRouteMatch();
  const container = window !== undefined ? () => window().document.body : undefined;
  const {drawerWidth, muiTheme, backdrop} = useContext(AdminDashboardStyleContext)
  const {backdropState, setBackdropState} = useContext(AdminDashboardStyleContext).store
  console.log("this is the drawer width" + drawerWidth)

  return (
    
    <ThemeProvider theme={muiTheme}>
    
    <div className={classes.root}>
      <CssBaseline />
      
     
      <main className={classes.content}>
        <div className={classes.toolbar} />
               
             
              <Switch>
                  <Route exact={true} path='/admin_dashboard'>
                    <FixedAppBar handleDrawerToggle= {handleDrawerToggle}/>
                      <Home />
                  </Route>

                  <Route exact={true} path='/audit_item'>
                    <h1> Please this is the </h1>
                  </Route>

                  <Route exact={true} path='/admin_dashboard'>
                    <FixedAppBar handleDrawerToggle= {handleDrawerToggle}/>
                      <Home />
                  </Route>
                </Switch>
    
      </main>
    </div>

    </ThemeProvider>
   
          
  );
}


const AuditItem = () => {
  return <h1>Auditing the same item</h1>
}


export default AdminDashboard;
