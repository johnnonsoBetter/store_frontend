import { Box, Button, InputBase, Typography, withStyles } from '@material-ui/core'
import { Email, Person, PersonOutline, VpnKey } from '@material-ui/icons';
import React from 'react'

 const Input = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: '',
      border: '1px solid #ced4da',
      borderColor: '#a0a0a0a1',
      color: "black",
      fontSize: 16,
      padding: '7px 10px 5px 7px',
      borderRadius: 5,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        'Kanit',
        'cursive',
      ].join(','),
      '&:focus': {
        borderRadius: 5,
        
        
      },
    },
  }))(InputBase);

 

function CreateCashier(){


    return (
        <Box p={2}>
             
            <form>
                <Box p={1} display="flex" justifyContent="space-between" alignItems="center">
                    <Person />
                    <Input  placeholder="Name"  />
                </Box>
                <Box  p={1} display="flex" justifyContent="space-between" alignItems="center">
                    <Email  />
                    <Input  placeholder="Email" type="email" />
                </Box>
                <Box  p={1} display="flex" justifyContent="space-between" alignItems="center">
                    <VpnKey />
                    <Input placeholder="Password" type="password" />
                </Box>

                <Box marginTop={2} display="flex" >
                    <Box p={1} >
                        <Input type="number" placeholder="Salary" />
                        
                    </Box>
                    <Box p={1}>
                        <Input type="number" placeholder="Default"/>
                    </Box>
                </Box>


                <Box display="flex" justifyContent="center" p={2}>
                    <Button style={{backgroundColor: "#3f51b5",  color: "white"}}> Create Casheir </Button>
                </Box>
            </form>
        </Box>
    )
}

export default CreateCashier