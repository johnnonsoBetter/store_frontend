
import {Box, CircularProgress, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { expensesApi, itemReturnApi } from '../../../../api/cashier/activity/api'
import { ItemReturnContextProvider } from '../../../../context/cashier/ItemReturnContext'
import CreateItemReturn from './CreateItemReturn'


const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1
    },
    box: {
        flexGrow: 1,
        height: "calc(75vh - 50px)",
       
    },
    
}))

function ItemReturnContainer(){   

    const classes = useStyles()
    const [itemReturns, setItemReturns] = useState([])
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [totalItemReturned, setTotalItemReturned] = useState('')
    
    useEffect(()=> {

        itemReturnApi().fetchAll().then(response => {

            const {expenses, total_expenses_cost} = response.data
            // setItemReturns(expenses)
            // setTotalExpenses(total_expenses_cost)
            
            setLoading(false)  
            console.log(response.data)

        }).catch(err => {
            console.log(err)
            setLoading(false)
            setFailed(true)
        })


        return ()=> {
            setItemReturns([])
            setLoading(true)
        }
    }, [])
    

    return (
        <ItemReturnContextProvider
            value={{
                itemReturns,
                totalItemReturned,
                setItemReturns,
                setTotalItemReturned
            }}
        >

        
        <Container className={classes.root} >
            
            <Grid spacing={7} container>
                <Grid item xs={8}>
                    <Box    >

                        {
                            loading ? 
                        
                        
                            <Box width="100%" minHeight={400} alignItems="center" display="flex" justifyContent="center">
                                
                                <CircularProgress style={{color: "yellow"}} size={24} />
                            </Box>

                            : 
                            failed ?
                            
                            <Box width="100%"  minHeight={400} alignItems="center" display="flex" justifyContent="center">
                                
                                <Typography style={{color: "white"}}> Failed To Load ItemReturned </Typography>
                            </Box>

                            : 
                            <Box  >
                                 <Typography style={{color: "white"}} variant="h6"> Total Item Return {totalItemReturned} </Typography>
                                <Box className={classes.box} display="flex" >
                                
                                </Box>
                               
                               
                            </Box>
                        

                        }
                    </Box>
      
                </Grid>

                <Grid item xs={4}>
                    <CreateItemReturn />
                </Grid>
            </Grid>
        </Container>
        </ItemReturnContextProvider>
    )
}


export default ItemReturnContainer