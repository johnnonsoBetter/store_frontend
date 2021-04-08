import { Box, makeStyles, Typography } from '@material-ui/core'
import { DateTime } from 'luxon'
import React, { useContext } from 'react'
import ExpensesContext from '../../../../context/cashier/ExpensesContext'

const useStyles = makeStyles((theme) => ({
    expense: {
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

function ExpensesList(){
    const {expenses} = useContext(ExpensesContext)
    const classes = useStyles()
    
    return (
       <>
       <Box p={1} className={classes.listContainer} >
        {
                expenses.map((expense) => {
                    const {id, detail, created_at} = expense
                    const time =  DateTime.fromISO(created_at).toLocaleString(DateTime.TIME_SIMPLE)
                    return (
                        <Box p={3} display="flex" justifyContent="space-between" alignContent="center" className={classes.expense} key={id}>
                            <Typography className={classes.whiteText} > {detail} at </Typography>
                            <Typography className={classes.whiteText}>{time}</Typography>
                        </Box>
                    )
                })
            }
            


       </Box>
        
       </>
    )
}

export default ExpensesList