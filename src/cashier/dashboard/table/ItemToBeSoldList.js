import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import ItemToBeSold from './ItemToBeSold'

function ItemToBeSoldList(){


    return (
        <Grid spacing={3} container>
            <Grid item xs={6}> 
                <ItemToBeSold />
            </Grid>

            <Grid item xs={6}> 
                <ItemToBeSold />
            </Grid>
            <Grid item xs={6}> 
                <ItemToBeSold />
            </Grid>
            <Grid item xs={6}> 
                <ItemToBeSold />
            </Grid>

            <Grid item xs={6}> 
                <ItemToBeSold />
            </Grid>
            <Grid item xs={6}> 
                <ItemToBeSold />
            </Grid>
            <Grid item xs={6}> 
                <ItemToBeSold />
            </Grid>


            
            

        </Grid>
    )
}

export default ItemToBeSoldList