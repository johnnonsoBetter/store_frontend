import { Toolbar, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import AdminDashboardStyleContext from '../../../../../context/admin/AdminDashboardContext'

function TransactionFixedAppBar(){

    const {appBar, menuButton, appBarPickerContainer, toolbar} = useContext(AdminDashboardStyleContext)

    return (
        <Toolbar display="flex" justifyContent="space-around" className={toolbar}> 
            <Typography> Hello</Typography>


        </Toolbar>

    )
}


export default TransactionFixedAppBar