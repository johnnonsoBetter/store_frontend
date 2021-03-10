import React, { useContext } from 'react'
import {AppBar, Toolbar, IconButton} from '@material-ui/core'
import SelectStore from './SelectStore'
import MenuIcon from '@material-ui/icons/Menu'
import AdminDashboardContext from '../../context/admin/AdminDashboardContext'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


function DatePicker() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date)
  };

  return (
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
          style={{margin: 0, marginLeft: "20px", color: "white"}}
        />
        
    </MuiPickersUtilsProvider>
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