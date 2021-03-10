import React, { useContext } from 'react'
import {AppBar, Toolbar, IconButton} from '@material-ui/core'
import SelectStore from './SelectStore'
import MenuIcon from '@material-ui/icons/Menu'
import AdminDashboardStyleContext from '../../context/admin/AdminDashboardStyleContext'
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
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
      <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label=""
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

function FixedAppBar(props){

    const {appBar, menuButton} = useContext(AdminDashboardStyleContext).styles
   
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

         
              
              <SelectStore />
              <DatePicker />

          
         
        </Toolbar>
      </AppBar>
    )
}

export default FixedAppBar