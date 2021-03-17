import { Box,  TextField, Badge, Grid, CircularProgress, Typography} from '@material-ui/core'
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
     
            <>
                <Box display="flex" justifyContent="center" alignItems="center" >
               
                {loading ? <CircularProgress color="secondary" /> :<ItemList /> }
                </Box>
            
            </>  
                        
    )
}

export default AuditMode