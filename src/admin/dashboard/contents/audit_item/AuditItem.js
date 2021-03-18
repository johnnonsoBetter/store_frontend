import { AppBar, Box, makeStyles, Switch, Toolbar, IconButton, Grow, Typography, useMediaQuery, Drawer} from '@material-ui/core'
import { EditOutlined, SearchOutlined } from '@material-ui/icons';
import React, { useState } from 'react'
import {AuditModeContextProvider} from '../../../../context/audit_item/AuditModeContext';
import AuditMode from './audit_mode/AuditMode'
import CreateItem from './CreateItem';
import NoAuditMode from './no_audit_mode/NoAuditMode' 
import ClearIcon from '@material-ui/icons/Clear';
import Item from './Item';


const value = (input) => (input === "true" ? true : false) 

const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${300}px)`,
          marginLeft: 270,
        },
        [theme.breakpoints.down('sm')]: {
            width: `calc(100% - ${50}px)`,
            
          },
        
        backgroundColor: "#282c34",
        boxShadow: "none"
  
    },

   

    actionContainer: {
        marginRight: theme.spacing(1),
        display: "flex"
    },
    
    content: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },

 
    searchInput: {
        display: "block",
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        textTransform: "capitalize",
        outline: "none",
        height: "100%",
        border: "none"
    },

    toolbar: theme.mixins.toolbar,
}))

function AuditItem(){

    const storedMode = localStorage.getItem('audit')
    const classes = useStyles()
   
    
    if (storedMode === null) {
        localStorage.setItem('audit', false)
    }

    const [auditMode, setAuditMode] = useState(value(localStorage.getItem('audit')))
    const [items, setItems] = useState([])
    const [totalItems, setTotalItems] = useState("0")
    const [searchValue, setSearchValue] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [itemDrawerOpened, setItemDrawerOpened] = useState(false)
    const matches = useMediaQuery('(min-width:600px)')
    const [itemInfo, setItemInfo] = useState(null)

    const handleSearchToggle = () => {

        setShowSearch(!showSearch)
        setSearchValue("")
    }

    const handleSearchInput = (e) => {
        e.preventDefault()

        setSearchValue(e.target.value)
    }

    const toggleItemDrawer = () => {
        setItemDrawerOpened(!itemDrawerOpened)
    }


    return (
            <div>

                <AuditModeContextProvider 
                    value = {{
                            items,
                            totalItems,
                            searchValue,
                            itemInfo,
                            itemDrawerOpened,
                            toggleItemDrawer: ()=> {toggleItemDrawer()},
                            setItemInfo: itemInfo => setItemInfo(itemInfo),
                            setItems: items => setItems(items),
                            setTotalItems: totalItems => setTotalItems(totalItems),
                            setSearchValue: searchValue => setSearchValue(searchValue)
                        }
                    }
                
                >
                
                <AppBar className={classes.appBar} position="fixed"> 
                    {showSearch ? 
                    <Grow in={true}> 
                        <Toolbar className={classes.toolbar} >
                                
                                <Box width="100%" display="flex" justifyContent="flex-end"> 
                                    <Box display="flex" borderRadius={16}  p={1} style={{backgroundColor: "white"}} >
                                        <input className={classes.searchInput} onChange={handleSearchInput}/>
                                    </Box>

                                    <Box display="flex" marginLeft={2} >
                                        <IconButton size="small" style={{color: "#e25218"}} onClick={handleSearchToggle}>
                                            <ClearIcon  />
                                        </IconButton>
                                    </Box>
                                </Box>

                                
                        </Toolbar> 
                    </Grow>
                    :  
                    
                        <Toolbar className={classes.toolbar}>
                            <Box width="100%" display="flex" justifyContent="flex-end" alignItems="center" >
                                <Box className={classes.actionContainer} >
                                    
                                    <IconButton>
                                        <SearchOutlined style={{color: "grey"}} onClick={handleSearchToggle}/>
                                    </IconButton>
                                </Box>

                                <Box className={classes.actionContainer}>
                                    <Switch  checked={value(storedMode)} onChange={(e) => {
                                    setAuditMode(e.target.checked)
                                        
                                        localStorage.setItem('audit', e.target.checked)
                                    }}/>

                                </Box>

                                <Box  className={classes.actionContainer}>
                                    <CreateItem />

                                </Box>
                            

                                

                            </Box>
                        </Toolbar>
                   


                  }
                </AppBar>
                  <main>
                    <Drawer anchor="right" open={itemDrawerOpened} onClose={() => {
                        setItemInfo(null)
                        toggleItemDrawer()
                    }}>
                        <Box width={matches ? 340 : "100%"}    >
                          {itemInfo ? <Item /> : null}

                        </Box>
                    </Drawer>
                    {auditMode ? <AuditMode /> :  <NoAuditMode />  }
                  </main>
       
                </AuditModeContextProvider>
            </div>
    )
}

export default AuditItem 