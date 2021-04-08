import { Box, IconButton, List, ListItem, Typography } from '@material-ui/core'
import { Launch } from '@material-ui/icons'
import React, { useContext } from 'react'
import CreateItemReturnContext from '../../../../context/cashier/CreateItemReturnContext'

function ItemsSold(){

    const {itemsSold} = useContext(CreateItemReturnContext)
   

    return(
        <Box>
            <List>


                {
                    itemsSold.map((itemSold) => {
                        const {id, name} = itemSold
                        return (
                            <ListItem key={id} >
                    
                            <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
                                
                                <Typography style={{color: "wheat"}}> {name} </Typography>
                                <IconButton style={{color: "#ff9a00c4"}}> <Launch /> </IconButton>
                            </Box>
                        
                        </ListItem>
                        )
                    })
                }

                

                
            </List>
        </Box>
    )
}

export default ItemsSold