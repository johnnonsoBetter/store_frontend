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
                    return <Item name={item.name} key={item.id} id={item.id} cost_price={item.cost_price} selling_price={item.selling_price}/>
                })
            }

        </Grid>
            
       
    )
}

export default ItemList