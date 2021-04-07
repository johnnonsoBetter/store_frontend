import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    expense: {
        width: 350,
        backgroundColor: "#08081dd9",
        marginTop: theme.spacing(2),
        borderRight: "2px solid green",
        borderRadius: 6

    },
    listContainer: {

        maxHeight: "calc(80vh - 50px)",
        overflowY: "auto"
    }
}))

function ExpensesList(props){
    const {expenses} = props
    const classes = useStyles()

    return (
       <>
       <Box p={1} className={classes.listContainer} >
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
            


       </Box>
        
       </>
    )
}

export default ExpensesList