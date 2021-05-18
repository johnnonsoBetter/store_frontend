import { AppBar, Box, makeStyles, Switch, Toolbar, IconButton, Grow, useMediaQuery, Drawer, CircularProgress, Typography} from '@material-ui/core'
import { CloseOutlined, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState, useLayoutEffect } from 'react'
import {AuditModeContextProvider} from '../../../../context/audit_item/AuditModeContext';
import AuditMode from './audit_mode/AuditMode'
import CreateItem from './CreateItem';
import NoAuditMode from './no_audit_mode/NoAuditMode' 
import ClearIcon from '@material-ui/icons/Clear';
import Item from './Item';
import ItemActionSnackbar from './ItemActionSnackbar';
import { categoryApi } from '../../../../api/admin/item/api';


const value = (input) => (input === "true" ? true : false) 


function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }


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
    const [width] = useWindowSize()
    
    if (storedMode === null) {
        localStorage.setItem('audit', false)
    }

    const [items, setItems] = useState([])
    const [totalItems, setTotalItems] = useState("0")
    const [searchValue, setSearchValue] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [itemDrawerOpened, setItemDrawerOpened] = useState(false)
    const matches = useMediaQuery('(max-width:600px)')
    const [itemInfo, setItemInfo] = useState(null)
    const [categories, setCategories] = useState([])
    const [loadingItem,setLoadingItem] = useState(false)
    const [failedItem, setFailedItem] = useState(false)
    
    const [snackBarAction, setSnackBarAction] = useState({
        itemName: "",
        action: "",
        snackBarOpened: false,
        taskDone: false

    })



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




    
    useEffect(()=> {

       categoryApi().fetchAll().then(response => {
            console.log(response.data)
            const {categories} = response.data
            console.log(categories)

            setCategories(categories)
        }).catch(err => {


        })

        document.title = "Audit Item"

        return ()=> {
            setCategories([])
            setLoadingItem(false)
            setFailedItem(false)
            document.title = "Supermarket App"
        }


    },[])

   

   

    return (
            <div>

                <AuditModeContextProvider 
                    value = {{
                            items,
                            totalItems,
                            searchValue,
                            itemInfo,
                            itemDrawerOpened,
                            snackBarAction,
                            categories,
                            failedItem,
                            loadingItem,
                            setLoadingItem,
                            setFailedItem,
                            setCategories,
                            toggleItemDrawer: ()=> {toggleItemDrawer()},
                            setItemInfo: itemInfo => setItemInfo(itemInfo),
                            setItems: items => setItems(items),
                            setSnackBarAction: snackBarAction => setSnackBarAction(snackBarAction),
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

                                

                                <Box  className={classes.actionContainer}>
                                    <CreateItem />

                                </Box>
                            

                                

                            </Box>
                        </Toolbar>
                   


                  }
                </AppBar>
                  <main className={classes.content}>
                    <Drawer anchor="right" open={itemDrawerOpened} onClose={() => {
                        setItemInfo(null)
                        toggleItemDrawer()
                    }}>
                        <Box width = {matches ? width : 320}   >

                            {
                                loadingItem || failedItem &&
                                <Box display="flex" justifyContent="flex-end">
                                    <IconButton onClick={()=> {
                                        setItemInfo(null)
                                        toggleItemDrawer()
                                    }}>
                                        <CloseOutlined fontSize="small" />
                                    </IconButton>
                                </Box>
                            }
                         
                         
                     

                          {
                              loadingItem ?
                              <Box style={{height: "calc(100vh - 200px)"}} display="flex" justifyContent="center" alignItems="center">
                                   <CircularProgress size={29} />
                              </Box>
                              : 
                              failedItem ?
                              <Box style={{height: "calc(100vh - 200px)"}} display="flex" justifyContent="center" alignItems="center">
                                   <Typography> Failed To Load Item Details </Typography>
                              </Box>
                              :
                              <>
                                 {itemInfo ? <Item /> : null} 
                              </>
                              

                          }
                          

                        </Box>
                    </Drawer>
                    { <NoAuditMode />  }
                  </main>
                  <ItemActionSnackbar />
       
                </AuditModeContextProvider>
            </div>
    )
}

export default AuditItem 