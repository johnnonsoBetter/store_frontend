import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { activitiesApi } from '../../../../../../api/admin/activities/api'
import TransactionActivityContext from '../../../../../../context/admin/transaction_activity/TransactionActivity'
import Loader from '../../../../Loader'
import FailedActivityLoader from '../../FailedActivityLoader'
import NoActivity from '../../NoActivity'

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1
    }
}))

function ItemReturnTable(){

    const {storeName} = useParams()
    const [itemReturns, setItemReturns] = useState([])
    const {staticDate, setTransactionActivity} = useContext(TransactionActivityContext)
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const classes = useStyles()
    const itemReturnApi = activitiesApi(storeName, 'item_returns')

    useEffect(()=> {

        if(staticDate !== ""){
            itemReturnApi.loadDate(staticDate).then(response => {
              
                const {item_returns, transaction_activity} = response.data
                setItemReturns(item_returns)
                setTransactionActivity(transaction_activity)
                setLoading(false)
                
            }).catch(err => {
                
                setLoading(false)
                setFailed(true)
            })
        }else{
            itemReturnApi.load().then(response => {
                const {item_returns, transaction_activity} = response.data
                setItemReturns(item_returns)
                setTransactionActivity(transaction_activity)
                setLoading(false)
            }).catch(err => {

                setLoading(false)
                setFailed(true)
            })
        }
    
        return ()=> {
            //clean up
            setItemReturns([])
            setLoading(true)
            setFailed(false)
        }
    }, [])


    return (
        <Box className={classes.root}>
            {
                loading ? <Loader /> : failed ? <FailedActivityLoader activity="Items Returned"/>: 
                
                <Box width="100%">

                </Box>
            }
        </Box>
    )
}

export default ItemReturnTable