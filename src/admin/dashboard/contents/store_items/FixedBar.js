import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({

    appBar: {
       
        backgroundColor: "#282c34",
        boxShadow: "none"
  
      },
      toolBar: {
        display: "flex",
        justifyContent: "space-around"
      },
}))

function FixedBar(){
    const classes = useStyles()
    const {storeName} = useParams()

    return (
        <AppBar className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <Typography> {storeName} How are we going to make hte same time and the same people to realkly get </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default FixedBar