import { Box, Grid, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import DashboardContext from '../../../context/cashier/DashboardContext'
import ItemToBeSold from './ItemToBeSold'

function ItemToBeSoldList(){

    const {itemsToBeSold} = useContext(DashboardContext)
    return (
        <Grid spacing={3} container>
            

            {
                itemsToBeSold.map(item => {

                    return (
                        <Grid key={item.barcode} item xs={6}> 
                            <ItemToBeSold item={item}/>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default ItemToBeSoldList