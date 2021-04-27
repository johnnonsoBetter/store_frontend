
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExpensesContainer from './expenses/ExpensesContainer';
import ChangeContainer from './change/ChangeContainer';
import ItemReturnContainer from './item_return/ItemReturnContainer';
import DebtContainer from './debt/DebtContainer';
import RecoveredDebtContainer from './recovered_debts/RecoveredDebtContainer';
import AccountContainer from './account/AccountContainer';
import CashierContainer from './cashier/CashierContainer';





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
          centered
          textColor="primary"
          aria-label="scrollable force tabs example"
          style={{backgroundColor: "rgb(11, 18, 37)", color: "white"}}
        >
          <Tab className={classes.tab_headers} label="Store Goods Transfer" icon={<img src={`/${base_imageUrl}user.png`}  alt="user"/>} {...a11yProps(0)} />
          
          <Tab className={classes.tab_headers} label="Expenses" icon={<img src={`/${base_imageUrl}cash.png`}  alt="expenses"/> } {...a11yProps(1)} />
          <Tab className={classes.tab_headers} label="Debts" icon={<img src={`/${base_imageUrl}payday.png`}  alt="payday"/>} {...a11yProps(2)} />
          <Tab className={classes.tab_headers} label="Return Goods" icon={<img src={`/${base_imageUrl}return.png`}  alt="return"/>} {...a11yProps(3)} />
          <Tab className={classes.tab_headers} label="Change" icon={<img src={`/${base_imageUrl}changing-money.png`}  alt="change"/>} {...a11yProps(4)} />
          <Tab className={classes.tab_headers} label="Recovered Debts" icon={<img src={`/${base_imageUrl}borrow.png`}  alt="account"/>} {...a11yProps(5)} />
          <Tab className={classes.tab_headers} label="Account" icon={<img src={`/${base_imageUrl}accounting.png`}  alt="user"/>} {...a11yProps(6)} />
          <Tab className={classes.tab_headers} label="Me" icon={<img src={`/${base_imageUrl}user.png`}  alt="user"/>} {...a11yProps(7)} />
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        
        <Box style={{height: "calc(80vh - 50px)"}}>
            <Typography>Please take note</Typography>
            <Typography>Please take note</Typography>
            <Typography>Please take note</Typography>
            <Typography>Please take note</Typography>
            <Typography>Please take note</Typography>
            <Typography>Please take note</Typography>
            <Typography>Please take note</Typography>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ExpensesContainer />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DebtContainer />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ItemReturnContainer />
      </TabPanel>
      <TabPanel value={value} index={4}>
      <ChangeContainer />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <RecoveredDebtContainer />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <AccountContainer />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <CashierContainer />
      </TabPanel>
      
    </div>
  );
}






