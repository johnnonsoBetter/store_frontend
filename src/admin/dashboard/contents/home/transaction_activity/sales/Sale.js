import { Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import SalesContext from '../../../../../../context/admin/transaction_activity/sales/SalesContext'


function Sale(){
    const {receipt_id, setReceiptId} = useContext(SalesContext)
    return (
        <Typography> This is the sale component</Typography>
    )
}

export default Sale