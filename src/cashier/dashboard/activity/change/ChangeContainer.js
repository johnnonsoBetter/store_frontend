

import {Box, CircularProgress, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { changeApi } from '../../../../api/cashier/activity/api'
import { ChangeContextProvider } from '../../../../context/cashier/ChangeContext'
import ChangeList from './ChangeList'
import CreateChange from './CreateChange'


const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1
    },
    box: {
        flexGrow: 1,
        height: "calc(75vh - 50px)",
       
    },
    
}))

function ChangeContainer(){   

    const classes = useStyles()
    const [changes, setChanges] = useState([])
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [totalChangeBalance, setTotalChangeBalance] = useState('')
    
    useEffect(()=> {

        changeApi().fetchAll().then(response => {

            const {changes, total_change} = response.data
             setChanges(changes)
            setTotalChangeBalance(total_change)
            
            setLoading(false)
            console.log(response.data)

        }).catch(err => {
            console.log(err)
            setLoading(false)
            setFailed(true)
        })


        return ()=> {
            setChanges([])
            setLoading(true)
        }
    }, [])
    

    return (
        <ChangeContextProvider
            value={{
                changes,
                totalChangeBalance,
                setChanges,
                setTotalChangeBalance
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
                                
                                <Typography style={{color: "white"}}> Failed To Load Changes </Typography>
                            </Box>

                            : 
                            <Box  >
                                 <Typography style={{color: "white"}} variant="h6"> Total Changes {totalChangeBalance} </Typography>
                                <Box className={classes.box} display="flex" >
                                    <ChangeList />
                                </Box>
                               
                               
                            </Box>
                        

                        }
                    </Box>
      
                </Grid>

                <Grid item xs={4}>
                    <CreateChange />
                </Grid>
            </Grid>
        </Container>
        </ChangeContextProvider>
    )
}


export default ChangeContainer