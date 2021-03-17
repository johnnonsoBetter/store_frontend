import {Grid, Container } from '@material-ui/core'
import React, { useContext } from 'react'
import AuditModeContext from '../../../../../context/audit_item/AuditModeContext'
import Item from './Item'



function ItemList(){
    const {items, searchValue} = useContext(AuditModeContext)
    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))

    return (
     
            
        <Grid container >
        {
            filteredItems.map((item) => {
                return <Item key={item.id} {...item}/>
            })
        }
        </Grid>

    )
}

export default ItemList