import { AppBar, Box, IconButton, InputBase, makeStyles, Menu, MenuItem, Toolbar, Typography, withStyles } from '@material-ui/core'
import { AcUnit, Add, Brush, Clear, Equalizer, GraphicEq, PlaylistAddCheck } from '@material-ui/icons'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
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
    const {setDrawerOpened} = useContext(StoreItemsInventory)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const openInventoryManager = () => {

      setDrawerOpened(true)

    }


    return (
        <AppBar className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <Box width="60%" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6"> {storeName}  </Typography>

                    

                    <Box  display="flex" alignItems="center">
                        <Box paddingRight={2} paddingLeft={2}>
                            <Input  placeholder="Search Items "/>
                        </Box>

                        <Box paddingRight={2}   paddingLeft={2}>
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
                              <MenuItem onClick={handleClose}>     
                                <Box display="flex" justifyContent="space-between" width={200}> 
                                  <Typography>  Track Item Inventory </Typography> 
                                  <Equalizer />
                                </Box>  
                              </MenuItem>

                              <MenuItem onClick={handleClose}>     
                                <Box display="flex" justifyContent="space-between" width={200}> 
                                  <Typography>  Restock </Typography> 
                                  <Add />
                                </Box>  
                              </MenuItem>

                              <MenuItem onClick={handleClose}>     
                                <Box display="flex" justifyContent="space-between" width={200}> 
                                  <Typography>  Take Stock </Typography> 
                                  <PlaylistAddCheck />
                                </Box>  
                              </MenuItem>

                              <MenuItem onClick={handleClose}>     
                                <Box display="flex" justifyContent="space-between" width={200}> 
                                  <Typography>  Remove Bad Item </Typography> 
                                  <Clear />
                                </Box>  
                              </MenuItem>


                              {/* <MenuItem onClick={handleClose}>Restock</MenuItem>
                              <MenuItem onClick={handleClose}>Take Stock</MenuItem>
                              <MenuItem onClick={handleClose}>Remove Bad Item</MenuItem> */}
                            </Menu>
                        </Box>

                        <Box paddingRight={2}  paddingLeft={2}>
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