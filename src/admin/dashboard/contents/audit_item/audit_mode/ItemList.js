import { Grid } from '@material-ui/core'
import React, { useContext } from 'react'
import AuditModeContext from '../../../../../context/audit_item/AuditModeContext'
import Item from './Item'

function ItemList(){
    const {items} = useContext(AuditModeContext)

    return (
        <Grid container style={{height: "calc(100vh - 200px)", overflow: "auto"}}>
            {
                items.map((item) => {
                    return <Item key={item.id} {...item}/>
                })
            }

        </Grid>
            
       
    )
}

export default ItemList