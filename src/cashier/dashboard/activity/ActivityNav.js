import { Avatar, Box, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    list: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(2)
    }
}))

function ActivityNav(){
    const base_imageUrl = 'static/images/' 
    const classes = useStyles()

    return (
        <List component="nav">
            <ListItem className={classes.list}  button>
                
                <Box width="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <Box display="flex">
                        <Avatar style={{backgroundColor: "orange", color: "black"}} > U</Avatar>

                    </Box>
                   
                    
                </Box>
              
            </ListItem>


            <ListItem className={classes.list}  button>
                
                <Box width="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <Box display="flex">
                        <img src={`/${base_imageUrl}cash.png`}  alt="items"/> 

                    </Box>
                    <Typography style={{color: "white"}}>  Expenses</Typography>
                    
                </Box>
              
            </ListItem>

            <ListItem className={classes.list} button>
                
                <Box width="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <Box display="flex">
                        <img src={`/${base_imageUrl}payday.png`}  alt="debts"/> 

                    </Box>
                    <Typography style={{color: "white"}}>  Debtors </Typography>
                    
                </Box>
              
            </ListItem>

            <ListItem className={classes.list} button>
                
                <Box width="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <Box display="flex">
                        <img src={`/${base_imageUrl}return.png`}  alt="debts"/> 

                    </Box>
                    <Typography style={{color: "white"}}>  Item Return </Typography>
                    
                </Box>
              
            </ListItem>

            <ListItem className={classes.list} button>
                
                <Box width="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <Box display="flex">
                        <img src={`/${base_imageUrl}changing-money.png`}  alt="debts"/> 

                    </Box>
                    <Typography style={{color: "white"}}>  Change </Typography>
                    
                </Box>
              
            </ListItem>
        </List>
    )
}

export default ActivityNav