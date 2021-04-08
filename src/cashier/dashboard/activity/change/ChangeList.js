import { Box, makeStyles, Typography } from '@material-ui/core'
import { DateTime } from 'luxon'
import React, { useContext } from 'react'
import ChangeContext from '../../../../context/cashier/ChangeContext'

import AmountFormater from '../../../../helpers/AmountFormater'

const useStyles = makeStyles((theme) => ({
    change: {
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

function ChangeList(){
    const {changes} = useContext(ChangeContext)
    const classes = useStyles()
    
    return (
       <>
       <Box p={1} className={classes.listContainer} >
        {
                changes.map((change) => {
                    const {id, amount, created_at} = change
                    const time =  DateTime.fromISO(created_at).toLocaleString(DateTime.TIME_SIMPLE)
                    return (
                        <Box p={3} display="flex" justifyContent="space-between" alignContent="center" className={classes.change} key={id}>
                            <Typography className={classes.whiteText} > Collected ₦{AmountFormater(amount).amount()} Change at </Typography>
                            <Typography className={classes.whiteText}>{time}</Typography>
                        </Box>
                    )
                })
            }
            


       </Box>
        
       </>
    )
}

export default ChangeList