import React, { useContext } from 'react'
import {AppBar, Toolbar, IconButton} from '@material-ui/core'
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
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {useLocation} from 'react-router-dom'


const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: lime,
    font: "kanits"
  },
  color: "green"
});

function DatePicker() {
  
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date)
  };

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
        
        <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            disabled={true}
           
            style={{margin: 0, marginLeft: "20px", color: "white"}}
          />
          
        </MuiPickersUtilsProvider>

    </ThemeProvider>
    
  );
}

function FixedAppBar(props){

    const {appBar, menuButton, appBarPickerContainer, toolbar} = useContext(AdminDashboardContext).styles
    const location = useLocation()
   
    return (

        <AppBar position="fixed" className={appBar} >
        <Toolbar display="flex" justifycontent="space-around" className={toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            className={menuButton}
          >
            
            <MenuIcon />
          </IconButton>
          

              {
                location.pathname == "/admin_dashboard" ? 
                  <div className={appBarPickerContainer}>
                  <DatePicker />
                  <SelectStore />
                
                  </div> :
                  null
              }
              
              
        </Toolbar>
      </AppBar>
    )
}

export default FixedAppBar