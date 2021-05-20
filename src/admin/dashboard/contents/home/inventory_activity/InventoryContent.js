import React, { useContext, useEffect, useState } from 'react';
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
import { activitiesApi } from '../../../../../api/admin/activities/api';
import { useParams } from 'react-router-dom';
import Restock from './restocks/Restock';
import StockRepairs from './stock_repairs/StockRepairs';
import BadItems from './bad_items/BadItems';
import AdminDashboardStyleContext from '../../../../../context/admin/AdminDashboardContext';



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
  const [activityType, setActivityType] = useState('restock')
  const classes = useStyles();
  const {staticDate, setStaticDate}  = useContext(AdminDashboardStyleContext).store
  const handleActivityType = (type) => {

    setActivityType(type)
  }

  useEffect(() => {

    setActivityType('restock')

    return ()=> {
      setStaticDate('')
    }

  }, [])

 
  useEffect(() => {

    if (activityType === 'restock' && staticDate !== ''){
      setActivityType('stock')
    }else{
      setActivityType('restock')
    }
  }, [staticDate])


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
            <Restock />  :
            activityType === 'stock' ? 
            <StockRepairs /> : 
            activityType === 'bad_item' ?
            <BadItems /> :
            activityType === 'item_transfer' ? 
            <Typography> Item Transfer </Typography> : null
          }
            
        </Box>
 



      </InventoryActivityContextProvider>
     


    </Container>
       
     
    
  
  );
}
