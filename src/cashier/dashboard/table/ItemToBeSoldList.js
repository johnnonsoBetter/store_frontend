import {  Grid } from '@material-ui/core'
import React, { useContext } from 'react'
import DashboardContext from '../../../context/cashier/DashboardContext'
import ItemToBeSold from './ItemToBeSold'

function ItemToBeSoldList(){

    const {itemsToBeSold} = useContext(DashboardContext)
    return (
        <Grid spacing={3} container>
            

            {
                itemsToBeSold.map((the_item, index) => {

                    return (
                        <Grid key={index} item xs={6}> 
                            <ItemToBeSold item={the_item}/>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default ItemToBeSoldList