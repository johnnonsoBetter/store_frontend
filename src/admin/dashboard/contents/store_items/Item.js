import { Typography } from '@material-ui/core'
import React from 'react'

function Item(props){

    const {name} = props
    return (
        <Typography>{name}</Typography> 
    )
}

export default Item