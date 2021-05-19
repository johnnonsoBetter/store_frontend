import { AppBar, Avatar, Box, IconButton, InputBase, makeStyles, Menu, MenuItem, Toolbar, Typography, withStyles } from '@material-ui/core'
import { AcUnit, Add, Brush, Clear, Equalizer, ExpandLessOutlined, GraphicEq, PlaylistAddCheck } from '@material-ui/icons'
import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import StoreItemsInventory from '../../../../context/admin/store_item_inventory/StoreItemsInventory'

const useStyles = makeStyles((theme) => ({

    appBar: {
       
        backgroundColor: "#282c34",
        boxShadow: "none"
  
      },
      toolBar: {
        display: "flex",
        justifyContent: "space-around"
      },
      fixedBarContainer: {
        [theme.breakpoints.down('md')]: {
         width: "100%"
          
        },
        [theme.breakpoints.up('md')]: {
          width: "60%"
           
         },
      }
      ,
      small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        backgroundColor: "#3f51b5",
        textTransform: "capitalize"
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
    const {setDrawerOpened, setInventoryType, setCurrentAction, setInputBoxDisabled, items, setFilteredItems} = useContext(StoreItemsInventory)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = useState('')
    const history = useHistory()

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleSubmit = (e) => {
      e.preventDefault()

      let newFilteredItems; 

      if (value === '-'){
        newFilteredItems = items.filter(item => item.quantity < 0)

        
        setFilteredItems(newFilteredItems)
        return
        
      }

      if (value === '0'){
        newFilteredItems = items.filter(item => item.quantity === 0)

        
        setFilteredItems(newFilteredItems)
        return
        
      }

      newFilteredItems = items.filter(item => item.quantity === parseInt(value) || item.name.toLowerCase().includes(value.toLowerCase()))

      setFilteredItems(newFilteredItems)
      

     



  

    }

    const handleAction = (actionType) => {

      if (actionType === 'overview'){
        setCurrentAction(actionType)
        setInputBoxDisabled(true)
        handleClose()
        return 
      }
    
      setCurrentAction(actionType)
      setInputBoxDisabled(false)
      handleClose()

    }

    const handleChange = (e) => {
      e.preventDefault()

      if (e.target.value === ' ' || e.target.value === ''){
        setFilteredItems(items)
        
      }
      setValue(e.target.value)
    }
  
    const openInventoryManager = () => {

      setDrawerOpened(true)
      setInventoryType('store')

    }


    return (
        <AppBar className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <Box width="90%" className={classes.fixedBarContainer} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography onClick={() => {

                      history.push('/admin_dashboard')
                    }} variant="h6" style={{textTransform: "capitalize"}}> <Avatar className={classes.small} > {storeName.charAt(0)} </Avatar> </Typography>

                    

                    <Box  display="flex" alignItems="center">
                        <Box paddingRight={2} paddingLeft={2}>
                            <form onSubmit={handleSubmit}  noValidate autoComplete="off"  onSubmit={handleSubmit}>
                              <Input value={value} onChange={handleChange}  placeholder="Search Items "/>
                            </form>
                            
                        </Box>

                        <Box >
                            <IconButton onClick={handleClick} > 
                                <Brush style={{color: "rgb(255 202 2 / 81%)"}}/>
                            </IconButton>
                            <Menu
                              id="simple-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={() => handleAction('overview')}>     
                                <Box display="flex" justifyContent="space-between" width={200}> 
                                  <Typography>  Track Item Inventory </Typography> 
                                  <Equalizer />
                                </Box>  
                              </MenuItem>

                              <MenuItem onClick={() => handleAction('restock')}>     
                                <Box display="flex" justifyContent="space-between" width={200}> 
                                  <Typography>  Restock </Typography> 
                                  <Add />
                                </Box>  
                              </MenuItem>

                              <MenuItem onClick={() => handleAction('stock')}>     
                                <Box display="flex" justifyContent="space-between" width={200}> 
                                  <Typography>  Take Stock </Typography> 
                                  <PlaylistAddCheck />
                                </Box>  
                              </MenuItem>

                              <MenuItem onClick={() => handleAction('bad_item')}>     
                                <Box display="flex" justifyContent="space-between" width={200}> 
                                  <Typography>  Remove Bad Item </Typography> 
                                  <Clear />
                                </Box>  
                              </MenuItem>

                            </Menu>
                        </Box>

                        <Box >
                            <IconButton onClick={openInventoryManager}  > 
                                <GraphicEq style={{color: "rgb(255 202 2 / 81%)"}} />
                            </IconButton>
                        </Box>
 
                        
                    </Box>

                </Box>
                
            </Toolbar>
            
        </AppBar>
    )
}

export default FixedBar