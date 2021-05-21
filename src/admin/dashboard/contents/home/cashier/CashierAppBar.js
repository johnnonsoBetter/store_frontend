import { AppBar, Avatar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons';
import React from 'react'
import { useParams, useRouteMatch } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

    appBar: {
        [theme.breakpoints.up('lg')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        },
        backgroundColor: "#282c34",
        boxShadow: "none"
  
      },
      toolBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      },
      small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        backgroundColor: "#3f51b5",
        textTransform: "capitalize"
      },

      menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
          display: 'none',
        },
      
      },
}))

function CashierAppBar(props){
    const classes = useStyles()

    const {storeName} = useParams()

    return (
        <AppBar className={classes.appBar} position="fixed" >

            <Toolbar className={classes.toolBar}>
               
                <IconButton
           
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    className={classes.menuButton}
                    style={{color: "white"}}
                >
                    
                   <Menu />
                </IconButton>

                <Avatar className={classes.small} > {storeName.charAt(0)} </Avatar>
            </Toolbar>
            

        </AppBar>
    )
}

export default CashierAppBar