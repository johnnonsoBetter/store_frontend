import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    expense: {
        width: 350,
        backgroundColor: "black",
        marginTop: theme.spacing(2),
        borderRight: "2px solid green"
    }
}))

function ExpensesList(props){
    const {expenses} = props
    const classes = useStyles()

    return (
       <>
        {
            expenses.map((expense) => {
                const {id, cost, detail, created_at} = expense

                return (
                    <Box p={3} className={classes.expense} key={id}>
                        <Typography style={{color: "white"}}> {detail} </Typography>
                    </Box>
                )
            })
        }
       </>
    )
}

export default ExpensesList