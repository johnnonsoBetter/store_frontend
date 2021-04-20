
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ItemList from './items/ItemList';
import RecentSales from '../recent_sales/RecentSales';
import ItemsNotSoldContainer from '../item_not_sold/ItemsNotSoldContainer';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: "rgb(11, 18, 37)"
  },
  tab_headers: {
    color: "white"
  }
}));

export default function ActivityNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const base_imageUrl = 'static/images/' 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="on"
          indicatorColor="primary"
          variant="fullWidth"
          textColor="primary"
          aria-label="scrollable force tabs example"
          style={{backgroundColor: "#050310", color: "white"}}
        >
          
          <Tab className={classes.tab_headers} label="Shelf"  {...a11yProps(0)} />
          <Tab className={classes.tab_headers} label="Recent" {...a11yProps(1)} />
          <Tab className={classes.tab_headers} label="Issue"  {...a11yProps(2)} />
                
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
            <ItemList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RecentSales />
      </TabPanel>
      <TabPanel value={value} index={2}>
         <ItemsNotSoldContainer />
      </TabPanel>
  
      
    </div>
  );
}






