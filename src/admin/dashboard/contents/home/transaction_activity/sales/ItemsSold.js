import { Slide, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Badge} from '@material-ui/core'
import React, { useContext } from 'react'
import SaleInfoContext from '../../../../../../context/admin/transaction_activity/sales/SaleInfoContext';
import AmountFormater from '../../../../../../helpers/AmountFormater'
import clsx from 'clsx';

function ItemsSold(){

    const [expanded, setExpanded] = React.useState(false);
    const circle = <div className={clsx()} />;


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const {items_sold} = useContext(SaleInfoContext)


    return (<Slide in={true} direction="left"> 
        <Box p={2}  >
            <Typography variant="h6"> Items Sold</Typography>

            <Box marginTop={2}>
                {
                    items_sold.map(item => {
                        const {name, selling_price_was_altered, price_sold_per_unit, quantity_sold} = item

                        return (
                            
                            <Accordion key={item.id}  expanded={expanded === `panel${item.id}`} onChange={handleChange(`panel${item.id}`)}>
                            <AccordionSummary
                            expandIcon={
                                <Box> <Typography> {
                                    selling_price_was_altered ? <Badge color="secondary" overlap="circle" badgeContent=" " variant="dot"> {circle}</Badge>
                                    : <Badge color="primary" overlap="circle" badgeContent=" " variant="dot"> {circle}</Badge>
                                  } </Typography> </Box>
                            }
                            aria-controls="panel1bh-content"
                            id={`panel${item.id}bh-header`}
                            >
                            <Typography > {name} </Typography>
                        
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box display="flex" width="100%" justifyContent="space-between">
                                    <Box display="flex" >
                                        <Typography> ₦{AmountFormater(price_sold_per_unit).amount()}</Typography>
                                    </Box>
                                    <Box display="flex" >
                                        <Typography> {quantity_sold}</Typography>
                                    </Box>

                                </Box>
                            </AccordionDetails>
                            </Accordion>
                        )
                    })
                }

            </Box>

            
            <Box>
                
            </Box>

        
        </Box> 
    </Slide>)
}

export default ItemsSold