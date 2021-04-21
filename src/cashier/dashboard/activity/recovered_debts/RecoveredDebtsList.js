import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { DateTime } from 'luxon'
import React, { useContext } from 'react'
import RecoveredDebtContext from '../../../../context/cashier/RecoveredDebtContext'
import AmountFormater from '../../../../helpers/AmountFormater'

const useStyles = makeStyles((theme) => ({
    recoveredDebt: {
        
        backgroundColor: "#08081dd9",
        marginTop: theme.spacing(1),
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

function RecoveredDebtList(){
    const {recoveredDebts} = useContext(RecoveredDebtContext)
    const classes = useStyles()
    
    return (
       <>

       
       <Box p={1} className={classes.listContainer} >

            <Grid container spacing={1}>
                    
                    {
                        recoveredDebts.map((recoveredDebt) => {
                            const {id, amount, created_at} = recoveredDebt
                            const time =  DateTime.fromISO(created_at).toLocaleString(DateTime.TIME_SIMPLE)
                            return (
                                <Grid key={id}  item xs={6}>
                                    <Box p={2} width={250}  display="flex" justifyContent="space-between" alignContent="center" className={classes.recoveredDebt} key={id}>
                                        <Typography className={classes.whiteText} > Recovered ₦{AmountFormater(amount).amount()} at </Typography>
                                        <Typography className={classes.whiteText}>{time}</Typography>
                                    </Box>
                                </Grid>
                            )
                        })
                    }
                    

            </Grid>
       </Box>
        
       </>
    )
}

export default RecoveredDebtList