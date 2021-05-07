import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ButtonBase, Container } from '@material-ui/core';
import { InventoryActivityContextProvider } from '../../../../../context/admin/inventory_activity/InventoryActivity';
import InventoryNav from './InventoryNav';



const useStyles = makeStyles((theme) => ({
  root: {
 
    backgroundColor: theme.palette.background.paper,
  },
  cont: {
    display: "flex",
    overflowX: "auto",
    marginTop: theme.spacing(3),
    whiteSpace: "nowrap",
    
    [theme.breakpoints.up('lg')]: {
       width: "70vw"
    },
    

},
contItem: {
 
  width: 220,
  minWidth: 220,
  minHeight: 135,
  display: "inline-block",
  borderRadius: "9px",
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),

}, 
link: {
  
  
  padding: theme.spacing(0),
  textDecoration: "none",
  color: "white"
},

contentBox: {
  [theme.breakpoints.up('lg')]: {
    width: "70vw"
 },
}
}));

export default function InventoryContent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleActivityType = (type) => {

    setActivityType(type)
  }

  const [activityType, setActivityType] = useState('restock')



  return (
    
    <Container >

      <InventoryActivityContextProvider
        value={{
          handleActivityType,
          activityType,
          classes,
        }}
      >
        <Box width="90vw" className={classes.cont}>
            <InventoryNav />
        </Box>
  
        <Box className={classes.contentBox} width="90vw" >
          {
            activityType === 'restock' ? 
            <Typography>Restock</Typography>  :
            activityType === 'stock' ? 
            <Typography> Stocker </Typography> : 
            activityType === 'bad_item' ?
            <Typography> Bad Item </Typography> :
            activityType === 'item_transfer' ? 
            <Typography> Item Transfer </Typography>: 
            activityType === "overview" ? 
            <Typography> Overview </Typography> : null
          }
            
        </Box>
 



      </InventoryActivityContextProvider>
     


    </Container>
       
     
    
  
  );
}
