import { Box, makeStyles, createMuiTheme, Typography, TableContainer, Drawer, Paper, Table, TableHead, TableRow, TableCell, useMediaQuery} from '@material-ui/core'
import React, { useContext, useEffect, useState, useLayoutEffect} from 'react'
import { useParams } from 'react-router-dom'
import { activitiesApi } from '../../../../../../api/admin/activities/api'
import TransactionActivityContext from '../../../../../../context/admin/transaction_activity/TransactionActivity'
import Loader from '../../../../Loader'
import FailedActivityLoader from '../../FailedActivityLoader'
import {ThemeProvider} from '@material-ui/styles'
import NoData from '../../NoData'
import ItemReturnList from './ItemReturnList'
import { deepOrange } from '@material-ui/core/colors';
import Sale from '../sales/Sale'
import { ItemReturnContextProvider } from '../../../../../../context/admin/transaction_activity/item_returns/ItemReturnContext'

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1
    },
    tableComponent: {
        maxHeight: 440
    },
    table: {
        minWidth: 650,
    },
    cell: {
        backgroundColor: "black"
    },
    whiteText:  { 
        color: "white",
        textTransform: "capitalize"
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
  
    },
    noBottom: {
      borderBottom: "none"
    },
  
}))


const theme = createMuiTheme({

    typography: {
      fontFamily: [
        'Kanit',
        'cursive',
      ].join(','),
     
  }
})

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }
  


function ItemReturnTable(){

    const {storeName} = useParams()
    const [itemReturns, setItemReturns] = useState([])
    const {staticDate, setTransactionActivity} = useContext(TransactionActivityContext)
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const classes = useStyles()
    const itemReturnApi = activitiesApi(storeName, 'item_returns')
    const [itemReturnDrawerOpened, setItemReturnDrawerOpened] = useState(false)
    const matches = useMediaQuery('(max-width:600px)')
    const [width] = useWindowSize()
    const [sale_receipt_id, setSaleReceiptId] = useState('')

    const toggleItemReturnDrawer = (itemReturnDrawerOpened) => {
        setItemReturnDrawerOpened(itemReturnDrawerOpened)
    }

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
                console.log(item_returns)
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
        <ItemReturnContextProvider 
            value = {{
                sale_receipt_id,
                setSaleReceiptId,
                toggleItemReturnDrawer,
            }}
        > 
            <div>
            <Drawer anchor="right" open={itemReturnDrawerOpened} onClose={()=>{
                    setItemReturnDrawerOpened(!itemReturnDrawerOpened)
                    console.log("toggling")
                }}>
                    <Box width={matches ? "100%" : 320 } >
                    <Sale receipt_id={sale_receipt_id} setReceiptId={setSaleReceiptId} toggleSaleDrawer={toggleItemReturnDrawer} />
                    </Box>
                </Drawer>
            </div>
            <Box className={classes.root}
            
            >
               
                { 
                    loading ? <Loader /> : failed ? <FailedActivityLoader activity="Items Returned"/>: 
                    
                    <Box width="100%">
                        <ThemeProvider theme={theme}>
                            {
                                itemReturns.length === 0 ? <NoData activity="Item Return" /> : 

                                <Box>
                                    <TableContainer className={classes.tableComponent} component={Paper} style={{backgroundColor: "black"}}>
                                    <Table stickyHeader  className={classes.table} aria-label="simple table">
                                        <TableHead   style={{backgroundColor: "black"}} className={classes.noBottom}>
                                            <TableRow>
                                            
                                            <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Cashier Name </Typography></TableCell>
                                            <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Item </Typography> </TableCell>
                                            <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Amount </Typography> </TableCell>
                                            <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Time </Typography> </TableCell>
                                            <TableCell className={classes.cell} align="center"> <Typography className={classes.whiteText}> Info </Typography> </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <ItemReturnList itemReturns={itemReturns} />
                                    </Table>
                                    </TableContainer>
                                </Box>
                            }
                        </ThemeProvider>
                    </Box>
                }
            </Box>
        </ItemReturnContextProvider>
    )
}

export default ItemReturnTable