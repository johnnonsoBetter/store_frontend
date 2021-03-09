
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import {Typography, Button, Card, CardContent} from '@material-ui/core/';
import { makeStyles, useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Select, Box, Grid, Paper} from '@material-ui/core/'
import MenuItem from '@material-ui/core/MenuItem';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios'
import {
  Switch,
  Route,
  Link, useLocation, useHistory
} from "react-router-dom";

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







function SimpleSelect() {
  
  const [store, setStore] = React.useState('upright');
  const classes = useStyles()
  const handleChange = (event) => {
    setStore(event.target.value);
  };

  return (
    <div>
      <Box display="flex"  justifyContent="center" alignItems="center" color="white" className={classes.selectStore} >
              
        <ShoppingCartIcon className={classes.storeIcon}/>
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


function AdminDashboard(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation()
  const history = useHistory()

  console.log(location)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
   
      <div className={classes.toolbar} />
      
      <List>
        
          <ListItem button>
             
             <ListItemIcon style={{marginBottom: "4px"}}> <img src="static/images/shopping-bag.png" className={classes.img} />  </ListItemIcon>
            <ListItemText primary="Audit Items"/>
          </ListItem>

          <ListItem button>
             
             <ListItemIcon > <img src="static/images/warehouse.png" className={classes.img} />  </ListItemIcon>
            <ListItemText primary="WareHouse"/>
          </ListItem>

          <ListItem button>
             
             <ListItemIcon > <img src="static/images/workers.png" className={classes.img} />  </ListItemIcon>
            <ListItemText primary="Workers"/>
          </ListItem>

          
          <ListItem button>
          <ListItemIcon > <img src="static/images/logout.png" className={classes.img} />  </ListItemIcon>
          <ListItemText primary="Logout" onClick={(e) => {

            e.preventDefault();
            axios({
              method: "DELETE",
              url: "http://localhost:3001/api/v1/auth_admin/sign_out",
              data: JSON.parse(localStorage.admin)
            }).then((response) =>{
              localStorage.removeItem('admin')
              history.push("/")
            })

         
          }}/>
        </ListItem>
      </List>
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (

    <ThemeProvider theme={muiTheme}>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar display="flex" justifyContent="space-around">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

         
              
              <SimpleSelect />

          
         
        </Toolbar>
      </AppBar>
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
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

                <Typography variant="h4"> Wellcome to Upright Supermarket</Typography>
                <Box className={classes.startContainer}>
                  <img src="static/images/favourites.png" /> 
                  <img src="static/images/favourites.png" /> 
                  <img src="static/images/favourites.png" /> 
                    
                </Box>
                <Grid container className={classes.infoLinksContainer}>
                  <Grid item xs={12} md={6} lg={4}>
                  <Link>
                                      
                  
                   <Box>
                   <Card className={classes.infoLinks}>
                        <CardContent>
                        <img src="static/images/shopping-bag.png" />
                        <Typography variant="h5"> Transaction Activity </Typography>

                        </CardContent>
                        
                      </Card>
                   </Box>
                   </Link>
                     
             
                    
                      
                  </Grid>


                  <Grid item xs={12} md={6} lg={4}>
                  <Link>
                  
                  
                  
                   <Box>
                   <Card className={classes.infoLinks}>
                        <CardContent>
                        <img src="static/images/shopping-bag.png" />
                        <Typography variant="h5"> Transaction Activity </Typography>

                        </CardContent>
                        
                      </Card>
                   </Box>

                     
             
                   </Link>
                      
                  </Grid>


                  <Grid item xs={12} md={6} lg={4}>
                    <Link> 
                    <Box>
                    <Card className={classes.infoLinks}>
                        <CardContent>
                        <img src="static/images/shopping-bag.png" />
                        <Typography variant="h5"> Transaction Activity </Typography>

                        </CardContent>
                        
                      </Card>
                    </Box>
                    </Link>

                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>

                   

                      <Card className={classes.infoLinks}>
                        <CardContent>
                        <img src="static/images/transaction.png" />
                        <Typography variant="h5"> Transaction Activity </Typography>

                        </CardContent>
                        
                      </Card>
             
                    
                      
                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>

                   

                      <Card className={classes.infoLinks}>
                        <CardContent>
                        <img src="static/images/shopping-bag.png" />
                        <Typography variant="h5"> Transaction Activity </Typography>

                        </CardContent>
                        
                      </Card>
             
                    
                      
                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>

                   

                      <Card className={classes.infoLinks}>
                        <CardContent>
                        <img src="static/images/shopping-bag.png" />
                        <Typography variant="h5"> Transaction Activity </Typography>

                        </CardContent>
                        
                      </Card>
             
                    
                      
                  </Grid>

                  
                </Grid>
            
      </main>
    </div>
    </ThemeProvider>
  );
}



export default AdminDashboard;
