import { Avatar, Box, Button, Container, Divider, Drawer, Grid, IconButton, Typography, useMediaQuery } from '@material-ui/core'
import { Cancel, Close, Edit, Star, ViewAgenda, Visibility } from '@material-ui/icons'
import React, { useLayoutEffect, useState } from 'react'
import CashierInfo from './CashierInfo';
import CreateCashier from './CreateCashier';
import EditCashier from './EditCashier';


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


function CashierContainer(){

    const [drawerOpened, setDrawerOpened] = useState(false)
    const [width] = useWindowSize()
    const matches = useMediaQuery('(max-width:600px)')
    const [type, setType] = useState('')


    const toggleDrawer = () => {

        setDrawerOpened(!drawerOpened)
    }


    return (
        <Container>
            <Drawer onClose={() => {
                setType('')
                setDrawerOpened(false)
            }} anchor="right" open={drawerOpened} >
                <Box  width={matches ? width : 320 }>
                    <Box p={1}  display="flex" justifyContent="flex-end">
                        <IconButton onClick={() => {
                            setType('')
                            toggleDrawer()
                        }
                        }> 
                            <Close />
                        </IconButton>

                    </Box>
                    
                    {
                        type === "create" ? 
                        <CreateCashier />
                        : type === "edit" ?
                        <EditCashier />
                        : type === "show" ?
                        <CashierInfo /> : null
                    }
                </Box>
            </Drawer>
            <Box p={2} display="flex" marginTop={3} alignItems="center" justifyContent="space-between" >
                <Typography variant="h6"> Store Cashiers</Typography>
                <Button onClick={() => {
                    setType('create')
                    toggleDrawer()
                }
                
                } style={{backgroundColor: "dodgerblue", color: "white"}}>
                    Create
                    
                </Button>
            </Box>
            
            <Divider />


            <Box p={2} marginTop={3} >
                <Grid  spacing={3} container>
                    <Grid item xs={12} sm={6} md={4} lg={3} >
                        <Box width="100%" display="flex" justifyContent="center" >
                            
                            <Box width="100%" borderRadius={10}   style={{backgroundColor: "#010b22"}} height={300} >
                                
                                <Box  display="flex" justifyContent="center"  marginTop={-2} > 
                                    <Avatar style={{backgroundColor: "black", fontWeight: "bolder"}}> U </Avatar>
                                </Box>

                                <Box marginTop={2} >
                                     <IconButton >
                                         <Star  style={{color: "green"}}/>
                                     </IconButton>
                                </Box>

                                <Box marginTop={2} p={3}>
                                    <Typography> Chinyere Paul</Typography>
                                </Box>

                                <Box  p={1}>
                                    <Typography> ₦ 21,000</Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-around">
                                    <IconButton  onClick={() => {
                                        setType('edit')
                                        toggleDrawer()
                                    }}>
                                        <Edit style={{color: "orange"}} />
                                    </IconButton>

                                    <IconButton  onClick={() => {
                                        setType('show')
                                        toggleDrawer()
                                    }}>
                                        <Visibility style={{color: "#4ab2d3"}} />
                                    </IconButton>

                                </Box>

                                
                            </Box>
                            
                        </Box>
                    </Grid>

                   
                </Grid>
            </Box>


        </Container>
    )
}

export default CashierContainer