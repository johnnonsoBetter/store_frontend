import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import Grid from '@material-ui/core/Grid'
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core';
import PastDayPreview from './PastDayPreview';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  

function Overview(){



    const classes = useStyles();
    const previews = [{amount: 3900}]

  return (
    <div className={classes.root} >
      <Accordion style={{backgroundColor: "green"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Trasanction Analysis</Typography>
        </AccordionSummary>
        <AccordionDetails >
          
          <Grid container>
              <Grid item xs={12} md={6}>
                  <PastDayPreview previews={previews}/>
              </Grid>

              <Grid item xs={12} md={6}>
                  <Typography> Hello boys</Typography>
              </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
     
    </div>
  );
}


export default Overview