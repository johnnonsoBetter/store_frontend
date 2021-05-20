import React, { useContext, useState } from 'react'
import {AppBar, Toolbar, IconButton, Typography, Avatar, Box, makeStyles, Slide} from '@material-ui/core'
import SelectStore from './SelectStore'
import MenuIcon from '@material-ui/icons/Menu'
import AdminDashboardContext from '../../context/admin/AdminDashboardContext'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import lime from "@material-ui/core/colors/lime";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';

import {useLocation} from 'react-router-dom'
import { AccessTimeOutlined, CloseRounded } from '@material-ui/icons'
import AdminDashboardStyleContext from '../../context/admin/AdminDashboardContext'
import { DateTime } from 'luxon'

const useStyles = makeStyles((theme) => ({
  
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: "#3f51b5",
    textTransform: "capitalize",
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(4.5),
      height: theme.spacing(4.5),
    }
  },

  storeName: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(12)
     }
  },

  time: {
    [theme.breakpoints.up('sm')]: {
     paddingLeft: theme.spacing(12)
    }
  },
  dateSelector: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(12)
    }
  }
}));



const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: lime,
    font: "kanits"
  },
  color: "green"
});

function StoreDatePicker(props) {
  
  return (
    <ThemeProvider theme={defaultMaterialTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
        
        <DatePicker
        disableToolbar
        
        color="primary"
        value={props.selectedDate}
        onChange={props.handleDateChange}
      />
          
        </MuiPickersUtilsProvider>

    </ThemeProvider>
    
  );
}

function InventoryAppBar(props){
    const classes = useStyles()
    const {appBar, menuButton, appBarPickerContainer,  toolbar} = useContext(AdminDashboardContext).styles
    const [openDateSelector, setOpenDateSelector] = useState(false)
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const {setStaticDate} = useContext(AdminDashboardStyleContext).store
   
    
    const location = useLocation()
    const {storeName} = useContext(AdminDashboardStyleContext).store

    const handleDateChange = (date) => {
      setSelectedDate(date);
      const d = DateTime.fromHTTP(new Date(date).toGMTString())
      setStaticDate( d.toISODate())
      setOpenDateSelector(!openDateSelector)
    };
    

    return (

        <AppBar position="fixed" className={appBar} >
        <Toolbar display="flex" justifyContent="space-around" className={toolbar}>
          <IconButton
           
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            className={menuButton}
          >
            
            <MenuIcon />
          </IconButton>
          
              {
                
                  <div className={appBarPickerContainer}>
                  {
                    location.pathname === "/admin_dashboard" && <Box marginLeft={10} > <SelectStore /> </Box> 
                  }
                  
                  
                  <Box display="flex" width="100%" alignItems="center" justifyContent="space-around">
                    { location.pathname !== "/admin_dashboard" &&
                      <Box display="flex" alignItems="center"  flexGrow={1}>
                      {
                        openDateSelector ?
                        <Slide direction="down" in={true}>
                          <Box className={classes.dateSelector} display="flex" alignItems="center" width="100%">
                          <StoreDatePicker handleDateChange={handleDateChange} selectedDate={selectedDate}  resetContent={props.resetContent}/>
                          <IconButton onClick={()=> setOpenDateSelector(!openDateSelector)} > <CloseRounded /> </IconButton>
                        </Box>

                        </Slide>
                        
                          : 
                        <>
                        <Box display="flex" className={classes.time}>
                            <Typography > { selectedDate.toDateString()}</Typography>
                        </Box>

                        <Box display="flex">
                          <IconButton style={{color: "white"}} onClick={()=> {
                            setOpenDateSelector(!openDateSelector)  
                            
                          }
                          } > 
                            <AccessTimeOutlined />
                          </IconButton>
                        </Box>
                        </>

                      }
                      
                      
                    </Box>}

                    <Box display="flex" className={classes.storeName} alignContent="center">
                       <Avatar className={classes.small}> {storeName.charAt(0)}</Avatar>
                    </Box>
                   
                  </Box>
                  </div> 
              }
              
              
        </Toolbar>
      </AppBar>
    )
}

export default InventoryAppBar