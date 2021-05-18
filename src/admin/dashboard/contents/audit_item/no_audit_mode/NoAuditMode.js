import { Box, ButtonBase, Card, CardContent, CircularProgress, Container, makeStyles, Typography} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso'
import { itemApi } from '../../../../../api/admin/item/api';
import AuditModeContext from '../../../../../context/audit_item/AuditModeContext';
import AmountFormater from '../../../../../helpers/AmountFormater';


const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
      },
      list: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",     
      },

      itemContainer: {
        
        color: "white",
        borderRadius: 9,
        marginTop: theme.spacing(2),
     
      
        [theme.breakpoints.up('lg')]: {
          width: "",
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
        },
        [theme.breakpoints.down('md')]: {
          width: "",
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
          
        },
        [theme.breakpoints.down('sm')]: {
          width: "100%",
          marginLeft: theme.spacing(0),
          marginRight: theme.spacing(0),
          
          
        },

      },
      small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
      }
}))



function NoAuditMode(){
    const [loading, setLoading] = useState(false)
    const [failed, setFailed] = useState(false)
    const classes = useStyles()
  
    const {setItemInfo, toggleItemDrawer, setLoadingItem, setFailedItem, loadingItem, items, setItems, failedItem} = useContext(AuditModeContext)


    const handleShowItemFullDetail = (name) => {
        setLoadingItem(true)
        itemApi().fetchItem(name).then(response => {

            const {item, cost_price_trackers, selling_price_trackers, category} = response.data

           setItemInfo({
               item,
               cost_price_trackers,
               selling_price_trackers,
               category,
               
           })
           setLoadingItem(false)
           setFailedItem(false)
            
        }).catch(err => {
            
            setLoadingItem(false)
            setFailedItem(true)
        })
    }

    useEffect(() => {
       setLoading(true)
        itemApi().fetchAll().then(response => {
            const {items, total_items} = response.data
           
            setLoading(false)
            setItems(items)
            

        }).catch(err => {
            setLoading(false)
            setFailed(true)
        })
        
       
    }, [])



    return (
        <Box  height="calc(100vh - 80px)" width="100%" className={classes.box}>
            {
                loading ? 
                <Box height="calc(100vh - 200px)" display="flex" justifyContent="center" alignItems="center" >

                    <CircularProgress size={24} />
                </Box> : failed ? 
                <Box height="calc(100vh - 200px)" display="flex" justifyContent="center" alignItems="center" >

                    <Typography> Failed To Load Items </Typography>
                </Box> :  

                <VirtuosoGrid
                totalCount={items.length}
                overscan={2}

                listClassName={classes.list}
                itemClassName={classes.itemContainer}
                itemContent={index => {

                
                const { name, cost_price, selling_price} = items[index]
                

                return (
                    
                        <Box p={1}  minWidth={300} className={classes.itemContainer}>
                            <ButtonBase style={{width: "100%"}} onClick={()=> {
                                handleShowItemFullDetail(name)
                                toggleItemDrawer()
                            }}>
                                <CardContent style={{padding: "0" , width: "100%"}}>
                                    <Box display="flex" p={1} justifyContent="space-between" style={{backgroundColor: "#002142"}}>
                                        <Typography style={{color: "#DEC429"}}> ₦{AmountFormater(cost_price).amount() } </Typography>
                                        <Typography style={{color: "#17B80A"}}> ₦{AmountFormater(selling_price).amount()} </Typography>
                                    </Box>

                                    <Box p={2} style={{backgroundColor: "#0A0B0C"}} >
                                        <Typography > {name} </Typography>
                                    </Box>
                                </CardContent>
                            </ButtonBase>
                        </Box>     
                        
                  

                )
                }}

                />
            }
        </Box>
    )
}


export default NoAuditMode