import React from 'react'

function SettingsAppBar(){

    return (
        <> </>
    )
}

{/* <AppBar className={classes.appBar}>
<Toolbar className={classes.toolBar}>
    <Box width="90%" className={classes.fixedBarContainer} display="flex" justifyContent="space-between" alignItems="center">
        <Typography onClick={() => {

          history.push('/admin_dashboard')
        }} variant="h6" style={{textTransform: "capitalize"}}> <Avatar > {storeName.charAt(0)} </Avatar> </Typography>

        

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

</AppBar> */}