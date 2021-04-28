import { AppBar, Box, IconButton, InputBase, makeStyles, Toolbar, Typography, withStyles } from '@material-ui/core'
import { AcUnit, Brush, GraphicEq } from '@material-ui/icons'
import React from 'react'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({

    appBar: {
       
        backgroundColor: "#282c34",
        boxShadow: "none"
  
      },
      toolBar: {
        display: "flex",
        justifyContent: "space-around"
      },
}))


export const Input = withStyles((theme) => ({
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
      color: "#e0bb30",
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


function FixedBar(){
    const classes = useStyles()
    const {storeName} = useParams()

    return (
        <AppBar className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <Box width="60%" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6"> {storeName}  </Typography>

                    

                    <Box  display="flex" alignItems="center">
                        <Box paddingRight={2} paddingLeft={2}>
                            <Input  placeholder="Search Items "/>
                        </Box>

                        <Box paddingRight={2} style={{color: "rgb(255 202 2 / 81%);"}} paddingLeft={2}>
                            <IconButton > 
                                <Brush />
                            </IconButton>
                        </Box>

                        <Box paddingRight={2} style={{color: "rgb(255 202 2 / 81%);"}} paddingLeft={2}>
                            <IconButton > 
                                <GraphicEq />
                            </IconButton>
                        </Box>

                        
                    </Box>

                </Box>
                
            </Toolbar>
            
        </AppBar>
    )
}

export default FixedBar