import { Box, makeStyles, Typography } from '@material-ui/core'
import { DateTime } from 'luxon'
import React, { useContext } from 'react'
import ItemReturnContext from '../../../../context/cashier/ItemReturnContext'


const useStyles = makeStyles((theme) => ({
    item_return: {
        minWidth: 380,
        backgroundColor: "#08081dd9",
        marginTop: theme.spacing(2),
        borderRight: "2px solid green",
        borderRadius: 6

    },
    listContainer: {

        maxHeight: "calc(80vh - 50px)",
        overflowY: "auto"
    },
    whiteText: {
        color: "white"
    }
}))

function ItemReturnList(){
    const {itemReturns} = useContext(ItemReturnContext)
    console.log(itemReturns)
    const classes = useStyles()
    
    return (
       <>
       <Box p={1} className={classes.listContainer} >
        {
                itemReturns.map((item_return) => {
                    const {id, item_name, cost, quantity, created_at} = item_return
                    const time =  DateTime.fromISO(created_at).toLocaleString(DateTime.TIME_SIMPLE)
                    return (
                        <Box p={3} display="flex" justifyContent="space-between" alignContent="center" className={classes.item_return} key={id}>
                            <Typography className={classes.whiteText} > Returned {quantity} {item_name} worth {cost} at </Typography>
                            <Typography className={classes.whiteText}>{time}</Typography>
                        </Box>
                    )
                })
            }
            


       </Box>
        
       </>
    )
}

export default ItemReturnList