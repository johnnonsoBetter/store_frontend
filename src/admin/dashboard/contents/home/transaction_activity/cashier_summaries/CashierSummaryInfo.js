import { Box, IconButton, Typography } from '@material-ui/core'
import { Cancel, Clear } from '@material-ui/icons'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CashierSummaryContext from '../../../../../../context/admin/transaction_activity/cashier_summaries/CashierSummaryContext'


function CashierSummaryInfo(){
    const {cashierSummaryId, setCashierSummaryId, setDrawerOpened} = useContext(CashierSummaryContext)
    const [cashierSummary, setCashierSummary] = useState(null)
    const [cashierSystem_summary, setCashierSystemSummary] = useState(null)
    const [transactionReview, setTransactionReview] = useState(null)


    useEffect(()=> {
        
        return ()=> {
            // clean up
            setCashierSummaryId('')
            setCashierSummary(null)
            setCashierSystemSummary(null)
            setTransactionReview(null)
        }
    }, [])
    return (
        <Box width="100%">
            <Box display="flex">
                <IconButton onClick={()=> {
                    setDrawerOpened(false)
                }}>
                    <Clear />
                </IconButton>

            </Box>
            <Box textAlign="center"> 
                <Typography variant="h6"> Cashier Report </Typography>
            </Box>
            
        </Box>
    )
}

export default CashierSummaryInfo