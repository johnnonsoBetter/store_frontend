import { Box, ButtonBase, Typography } from '@material-ui/core'
import { Block, DoubleArrow, Edit, Redo, Transform } from '@material-ui/icons'
import React, { useContext } from 'react'
import InventoryActivityContext from '../../../../../context/admin/inventory_activity/InventoryActivity'
import AmountFormater from '../../../../../helpers/AmountFormater'



function InventoryNav(){

    const {handleActivityType, classes} = useContext(InventoryActivityContext)


    return (
        <>
            <ButtonBase onClick={()=> handleActivityType("restock") }
              style={{backgroundImage: "linear-gradient(to right, rgb(0 0 0 / 67%), rgb(44 7 116))"}} borderRadius={6} className={classes.contItem}   marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Restocks</Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                        <Redo />
                    </Box>

                </Box>
                
            </ButtonBase>      







            
        
            <ButtonBase onClick={()=> handleActivityType("stock") }  style={{backgroundImage: "linear-gradient(to right, rgb(0 0 0 / 67%), rgb(4 36 194 / 81%))"}}  borderRadius={6} className={classes.contItem}  p={2} marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Stock Repair</Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                        <Edit />
                    </Box>

                </Box>
                
            </ButtonBase>      
        
            
        
            {/* <ButtonBase onClick={()=> handleActivityType("item_transfer") } style={{backgroundImage: "linear-gradient(to right, rgb(0 0 0 / 67%), #922721)"}}  borderRadius={6} className={classes.contItem}  p={2} marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Item Transfer</Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                        <Transform />
                    </Box>

                </Box>
                
            </ButtonBase>       */}
        
         
            <ButtonBase onClick={()=> handleActivityType("bad_item") }  style={{backgroundImage: "linear-gradient(to right, rgb(0 0 0 / 67%), rgb(0 0 0 / 73%))"}}  borderRadius={6} className={classes.contItem}  p={2} marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Bad Items </Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                        <Block />
                    </Box>

                </Box>
                
            </ButtonBase>  

        </>
    )
}

export default InventoryNav