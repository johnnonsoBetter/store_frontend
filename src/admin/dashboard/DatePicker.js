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
      console.log(date.toString())
      // let d = DateTime.fromRFC2822(date)
      // console.log(d)

     let format = new Date(date).toGMTString()
     console.log(DateTime.fromRFC2822(format).toISODate())
     console.log(DateTime.now().toLocaleString(DateTime.TIME_SIMPLE))
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