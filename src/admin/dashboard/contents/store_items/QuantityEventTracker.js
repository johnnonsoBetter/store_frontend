


























import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, makeStyles, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { Virtuoso } from 'react-virtuoso'
import StoreItemsInventory from '../../../../context/admin/store_item_inventory/StoreItemsInventory'


const useStyles = makeStyles((theme) => ({

    eventName: {
        textTransform: "capitalize"
    },
    trackContainer: {
        margin: theme.spacing(1)
    },
    quantity_before_event: {
        backgroundColor: "black",
        color: "white"
    },
    quantity_on_event: {
        backgroundColor: "#4a4a9e",
        color: "white"
    },
    quantity_after_event: {
        backgroundColor: "#006d00",
        color: "white"
    }
}))

function QuantityEventTracker(){

    const {quantity_event_trackers} = useContext(StoreItemsInventory).itemInfo

    const [expanded, setExpanded] = React.useState(false);
    const classes = useStyles()
    


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    console.log(quantity_event_trackers)
    console.log("this is the trackers")

    const counts = 1 ? quantity_event_trackers.length === 0 : quantity_event_trackers.length
    return (
        <Box height="calc(91vh - 215px)">
           <Virtuoso
               
                totalCount={quantity_event_trackers.length}
                itemContent={(index) =>{

                    const {id, created_at, event, quantity_before_event, quantity_after_event, quantity_on_event} = quantity_event_trackers[index]

                    return (
                    <Accordion  className={classes.trackContainer} key={id}  expanded={expanded === `panel${id}`} onChange={handleChange(`panel${id}`)}>
                    <AccordionSummary
                    expandIcon={
                        <Box> <Typography style={{color: "black"}}>  {new Date(created_at).toLocaleDateString()} </Typography> </Box>
                    }
                    aria-controls="panel1bh-content"
                    id={`panel${id}bh-header`}
                    >
                    <Typography className={classes.eventName} > {event} </Typography>
                        
                
                
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box  display="flex" width="100%" justifyContent="space-around">
                            <Box display="flex"  >
                                
                                <Avatar className={classes.quantity_before_event}> {quantity_before_event} </Avatar>
                            </Box>
                            <Box display="flex" >
                                <Avatar className={classes.quantity_on_event}> {quantity_on_event} </Avatar>
                            </Box>
                            <Box display="flex" >
                                <Avatar className={classes.quantity_after_event}> {quantity_after_event} </Avatar>
                            </Box>


                        </Box>
                    </AccordionDetails>
                    </Accordion>
                    
                    )
                  
                
                }}
            />



        </Box>

        

    )
}

export default QuantityEventTracker