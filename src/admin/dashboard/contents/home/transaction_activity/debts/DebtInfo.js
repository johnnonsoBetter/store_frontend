import { Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import DebtContext from '../../../../../../context/admin/transaction_activity/debts/DebtContext'

function DebtInfo(){
    const {debtInfo} = useContext(DebtContext)
    const {debtor_name} = debtInfo

    console.log(debtInfo)

    return (
        <Typography> {debtor_name} </Typography>
    )
}

export default DebtInfo