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
        <MuiPickersUtilsProvider utils={DateFnsUtils} color="inherit">
        
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
            color="inherit"
            style={{margin: 0, marginLeft: "20px", color: "white"}}
          />
          
        </MuiPickersUtilsProvider>

    </ThemeProvider>
    
  );
}

function FixedAppBar(props){

    const {appBar, menuButton, appBarPickerContainer} = useContext(AdminDashboardContext).styles
   
    return (

        <AppBar position="fixed" className={appBar} >
        <Toolbar display="flex" justifyContent="space-around" >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            className={menuButton}
          >
            <MenuIcon />
          </IconButton>

         
              <div className={appBarPickerContainer}>
                <DatePicker />
                <SelectStore />
               
              </div>
              
        </Toolbar>
      </AppBar>
    )
}

export default FixedAppBar