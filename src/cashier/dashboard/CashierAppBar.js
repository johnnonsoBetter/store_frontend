
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardContext from '../../context/cashier/DashboardContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#060423",
    borderRadius: 5
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  header: {
    backgroundColor: "#060423",
    borderRadius: 5
  }
}));

export default function CashierAppBar() {
  const classes = useStyles();
  const {toggleDrawer} = useContext(DashboardContext)

  return (
    <div className={classes.root}>
      <AppBar className={classes.header} position="static">
        <Toolbar variant="dense">
          <IconButton onClick={toggleDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Store
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}