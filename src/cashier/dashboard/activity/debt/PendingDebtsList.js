
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DebtContext from '../../../../context/cashier/DebtContext';
import { Box, Button, CircularProgress } from '@material-ui/core';
import AmountFormater from '../../../../helpers/AmountFormater';
import {  CalendarTodayRounded, LocationCity, Phone } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    
  },
  debtBody: {
      backgroundColor: "#000e23",
      color: "#ff572fd4"
  },
  
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function PendingDebtsList() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {pendingDebts, recoverDebt, recoverBtnDisabled, setRecoverBtnDisabled} = useContext(DebtContext)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
        <Box p={3}> 
        {
            pendingDebts.map((debt) => {
                const {id, cost, debtor_address, debtor_name, debtor_telephone, receipt_id, created_at} = debt
                const date = new Date(created_at).toDateString()
                return (
                    <Accordion className={classes.debtBody} key={id} expanded={expanded === `panel${id}`} onChange={handleChange(`panel${id}`)}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                        <Typography className={classes.heading}>{debtor_name}</Typography>
                        <Typography className={classes.secondaryHeading}>₦{AmountFormater(cost).amount()}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box width="100%" style={{color: "white"}} display="flex" justifyContent="space-around"  >
                                <Box display="flex" alignItems="center" >
                                    <Box display="flex" m={1}>
                                        <CalendarTodayRounded />
                                    </Box>
                                    
                                    <Typography> {date}</Typography>
                                </Box>

                                <Box display="flex" alignItems="center" >
                                   
                                    <Box display="flex"  m={1}>
                                        <LocationCity />
                                    </Box>
                                    <Typography>{debtor_address}</Typography>
                                </Box>

                                <Box display="flex" alignItems="center" >
                                    
                                    <Box display="flex"  m={1}>
                                        <Phone  />
                                    </Box>
                                    <Typography>{debtor_telephone}</Typography>
                                </Box>

                                <Box display="flex" alignItems="center" >
                                <div className={classes.wrapper}>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    
                                    disabled={recoverBtnDisabled}
                                    onClick={()=> {
                                        setRecoverBtnDisabled(true)
                                        recoverDebt(receipt_id, cost, 'pending')
                                    }}
                                    >
                                    Recover
                                    </Button>
                                    {recoverBtnDisabled && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </div>
                                </Box>


                            </Box>
                        <Typography>
                            
                        </Typography>
                        </AccordionDetails>
                    </Accordion>

                )
            })
        }
        </Box>

      
      
      
    </div>
  );
}


