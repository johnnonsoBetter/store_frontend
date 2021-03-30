import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'


function ExpensesTable(){

    useEffect(() => {
        
        console.log("i am expesnes")

    }, [])

    return (
        <Typography style={{color: "white"}}> This is the expenses </Typography>
    )
}

export default ExpensesTable