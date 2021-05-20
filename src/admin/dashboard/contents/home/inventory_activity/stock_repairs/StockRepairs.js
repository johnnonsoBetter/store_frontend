import { Avatar, Box, Button, CircularProgress, Grid, InputBase, makeStyles, Menu, MenuItem, Typography, withStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { activitiesApi } from '../../../../../../api/admin/activities/api'



export const Input = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: '',
      border: '1px solid #ced4da',
      borderColor: '#a0a0a0a1',
      color: "#e0bb30",
      fontSize: 16,
      padding: '7px 10px 5px 7px',
      borderRadius: 5,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
       //Use the system font instead of the default Roboto font.
      fontFamily: [
        'Kanit',
        'cursive',
      ].join(','),
      '&:focus': {
        borderRadius: 5,
        
        
      },
    },
  }))(InputBase);


const useStyles = makeStyles((theme) => ({
    stockRepair: {
        backgroundColor: "#373d3f",
        borderRight: "1px solid",
        borderRadius: 5
    },
    stockRepairCont: {
        height: "calc(74vh - 200px)",
        overflowY: "auto"
    },
    blackCircle: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
        backgroundColor: "black"

    },
    
    redCircle: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
        backgroundColor: "red"

    },
    
    greenCircle: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
        backgroundColor: "green"

    },
    
    orangeCircle: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
        backgroundColor: "orange"

    },

    fixedHeight: {
        height: "calc(74vh - 200px)"
    }
}))




function StockRepairs(){

    const [loading, setLoading] = useState(false)
    const [failed, setFailed] = useState(false)
    const [stockRepairs, setStockRepairs] = useState([])
    const [filteredStockRepairs, setFilteredStockRepairs] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchValue, setSearchValue] = useState('')
    const [filterType, setFilterType] = useState('All')
    const {storeName} = useParams()
    const activity = activitiesApi(storeName, 'item_stock_repairs')
    const classes = useStyles()
    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };



    const handleFilterOutcome = (outcome) => {
        const filterOutcome = outcome.toLowerCase()
        const newFilteredStockRepairs = stockRepairs.filter(stockRepair => stockRepair.repaired_outcome === filterOutcome)

        if (filterOutcome === 'all'){
            setFilteredStockRepairs(stockRepairs)
            setFilterType(filterOutcome)
            setAnchorEl(null)
            return
        }
        
        setFilteredStockRepairs(newFilteredStockRepairs)
        setFilterType(filterOutcome)
        setAnchorEl(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newStockRepairs = stockRepairs.filter(stockRepair => stockRepair.name.toLowerCase().includes(searchValue.toLowerCase()))
        setFilterType('All')
        setFilteredStockRepairs(newStockRepairs)
        
    }

    const handleChange = (e) => {
        e.preventDefault()

        if (e.target.value === ' ' || e.target.value === ''){
            setFilteredStockRepairs(stockRepairs)
        }

        setSearchValue(e.target.value)
    }


    useEffect(()=> {
        setLoading(true)

        activity.load().then((response => {

            console.log(response)
            const {item_stock_repairs} = response.data

            setStockRepairs(item_stock_repairs)
            setFilteredStockRepairs(item_stock_repairs)
            setLoading(false)
        })).catch(err => {

            console.log(err)
            setFailed(true)
            setLoading(false)
        })


        return ()=> {
            setLoading(false)
            setStockRepairs([])
            setFailed(false)
            setSearchValue('')
            setFilteredStockRepairs([])
        }
    }, [])



    function classesType(classes, outcome){
        console.log(outcome)
        const value = outcome.toLowerCase()
        return value === "shortage" ? classes.redCircle : value === "excess" ? classes.orangeCircle : value === "balanced" ? classes.greenCircle : null
    }

  return (
        <Box>
            <Box p={2} textAlign="left"> <Typography variant="h5"> Stock Repairs </Typography></Box>
            <Box display="flex"  width="100%" alignItems="center" justifyContent="flex-end" >
                
                <Box display="flex"  >
                  
                  <Button style={{color: "white"}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    {filterType}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={()=>  setAnchorEl(null)}
                  >
                    <MenuItem onClick={()=> handleFilterOutcome('all')}> All</MenuItem>
                    <MenuItem onClick={()=> handleFilterOutcome('shortage')}>Shortage</MenuItem>
                    <MenuItem onClick={()=> handleFilterOutcome('excess')}>Excess</MenuItem>
                    <MenuItem onClick={()=> handleFilterOutcome('balanced')}>Balanced</MenuItem>
                    
                  </Menu>
             
                  
                </Box>
                <form onSubmit={handleSubmit}>
                    <Input value={searchValue} onChange={handleChange} placeholder="Search Item"/>

                </form>
                
            </Box>


            {
                loading ? 
                <Box display="flex" className={classes.fixedHeight} alignItems="center" justifyContent="center"> <CircularProgress size={26} /> </Box> : failed ?
                <Box display="flex" className={classes.fixedHeight} alignItems="center" justifyContent="center"> <Typography> Failed To Load Stock Repairs </Typography> </Box>  :
                <Box marginTop={3} className={classes.stockRepairCont}>
                    {

                        filteredStockRepairs.length === 0 &&
                        <Box display="flex" className={classes.fixedHeight} alignItems="center" justifyContent="center">
                            <Typography> No Stock Repairs Found </Typography>
                        </Box>

                    }
                <Grid spacing={2} container >
                    {
                         filteredStockRepairs.map(restock => {

                             const {id, name, before_repair_quantity, repaired_quantity, repair_quantity_outcome, repaired_outcome, created_at} = restock

                             return (
                                 <Grid  item xs={12} md={6} key={id} >
                                     <Box className={classes.stockRepair}  p={1} >
                                            <Box p={1}>
                                                <Typography> {name} </Typography>
                                            </Box>

                                        <Box display="flex" alignItems="center" justifyContent="space-around">
                                            <Box>
                                                <Avatar className={classes.blackCircle}>{before_repair_quantity}</Avatar>
                                            </Box>
                                            
                                            <Box>
                                                <Avatar className={classes.blackCircle}>{repaired_quantity}</Avatar>
                                            </Box>
                                        
                                        </Box>    
                                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                            
                                            <Box p={1}>
                                                <Avatar className={classesType(classes, repaired_outcome)}>{repair_quantity_outcome}</Avatar>
                                            </Box>
                                            
                                            <Typography style={{textTransform: "capitalize"}}>{repaired_outcome}</Typography>
                                        </Box>

                                     </Box>
                                 </Grid>
                             )
                         })
                    }
                </Grid>
                
            
        </Box>
            }
           
                
        
                   
        

        </Box>
    )
}


export default StockRepairs