import { Avatar, Box, Button, Container, Divider, Grid, IconButton, Typography } from '@material-ui/core'
import { Edit, Star, ViewAgenda, Visibility } from '@material-ui/icons'
import React from 'react'




function CashierContainer(){

    return (
        <Container>
            <Box p={2} display="flex" marginTop={3} alignItems="center" justifyContent="space-between" >
                <Typography variant="h6"> Store Cashiers</Typography>
                <Button style={{backgroundColor: "dodgerblue"}}>
                    Create
                    
                </Button>
            </Box>
            
            <Divider />


            <Box p={2} marginTop={3} >
                <Grid container>
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
                                    <IconButton>
                                        <Edit style={{color: "orange"}} />
                                    </IconButton>

                                    <IconButton>
                                        <Visibility style={{color: "#4ab2d3"}} />
                                    </IconButton>

                                </Box>

                                
                            </Box>
                            
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} >
                        <Box >
                            <Typography> THe one</Typography>
                        </Box>
                    </Grid>

                </Grid>
            </Box>


        </Container>
    )
}

export default CashierContainer