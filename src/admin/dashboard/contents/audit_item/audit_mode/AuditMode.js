import { Box,  TextField, Badge,  Container, Grid, CircularProgress, Typography} from '@material-ui/core'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AuditModeContext from '../../../../../context/audit_item/AuditModeContext'
import ItemList from './ItemList'

function AuditMode(){

    const [loading, setLoading] = useState(true)
    const {setTotalItems, setItems, items, totalItems, searchValue, setSearchValue} = useContext(AuditModeContext)

    

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    
    }


    useEffect(() => {
        axios({
            method: "GET",
            headers: JSON.parse(localStorage.getItem('admin')),
            url: `http://localhost:3001/api/v1/real_items/`

        }).then(response => {
            const {items, total_items} = response.data
           
            setLoading(false)
            setItems(items)
            setTotalItems(total_items)
            
        }).catch(err => {
            console.log("there was an issue with this request", err)
        })


        return () => {
            // clean up
            setItems([])
            setTotalItems("0")
            setSearchValue("")
        }
    }, [])

    
    return (
     
        <Container>
        

            <Grid container >
                <Grid item md={9} lg={9}>
                    <Box   >
                        <Box display="flex" p={1} justifyContent="space-between" alignItems="baseline" >
                            <TextField id="standard-basic" label="Standard" style={{color: "whitesmoke"}} onChange={handleSearch}/>
                            <Box m={2}>
                                     <Badge max={10000}  color="primary"   badgeContent={totalItems}> <Typography> Total Items</Typography> </Badge>   
                            </Box>
                            
                        </Box>
                        
                        <Box display="flex" justifyContent="center" alignItems="center" >
                            {loading ? <CircularProgress color="secondary" /> :
                            <ItemList />
                        
                            }
                        </Box>
                        
                        
                    </Box>
                </Grid>

                <Grid item md={3} lg={3}>
                    <Box  bgcolor="grey.300" style={{height: "calc(100vh - 200px)", overflow: "auto"}}>
                        <Typography> How are we going to make the same time and the same people to really get to know</Typography>
                        
                    </Box>    
                </Grid>

            </Grid>
            
            
        </Container>
    )
}

export default AuditMode