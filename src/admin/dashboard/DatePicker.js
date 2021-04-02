import React from 'react'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    
  } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from "@material-ui/styles";
import lime from "@material-ui/core/colors/lime";
import { createMuiTheme } from "@material-ui/core";
import {DateTime} from 'luxon'


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
            
             
              style={{margin: 0, marginLeft: "20px", color: "white"}}
            />
            
          </MuiPickersUtilsProvider>
  
      </ThemeProvider>
      
    );
  }


  export default DatePicker