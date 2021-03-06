import React, { useContext } from 'react'
import Accordion from '@material-ui/core/Accordion';
import Grid from '@material-ui/core/Grid'
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core';
import PastDayPreview from './PastDayPreview';
import DailyPreview from './DailyPreview';
import TransactionActivityContext from '../../../../../context/admin/transaction_activity/TransactionActivity';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  

function Overview(props){

    const {show, setShow, previews} = useContext(TransactionActivityContext)
    const classes = useStyles();
    
    
    console.log(previews)
  return (
    <div className={classes.root} >
      <Accordion  expanded={!show}    style={{backgroundColor: "black"}}>
        <AccordionSummary onClick={()=> setShow(!show)}
          expandIcon={<ExpandMoreIcon style={{color: "white"}} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Trasanction Analysis</Typography>
        </AccordionSummary>
        <AccordionDetails >
            <Grid container spacing={4} justify="center">
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <DailyPreview />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <PastDayPreview previews={previews}/>
                </Grid>
            </Grid>

         
        </AccordionDetails>
      </Accordion>
     
    </div>
  );
}


export default Overview