
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, Avatar, Box, Typography, Badge, IconButton} from '@material-ui/core/';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import clsx from 'clsx';
import { ArrowForward } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],

    },

    whiteText:  { 
      color: "white"
    },

    noBottom: {
      borderBottom: "none"
    },
   
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }));

  
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function SalesTable() {
  const classes = useStyles();
  const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

  return (
    <TableContainer component={Paper} style={{backgroundColor: "black"}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor: "black"}} className={classes.noBottom}>
          <TableRow>
           
            <TableCell align="center"> <Typography className={classes.whiteText}> Cashier </Typography></TableCell>
            <TableCell align="center"> <Typography className={classes.whiteText}> Sales Amount </Typography> </TableCell>
            <TableCell align="center"> <Typography className={classes.whiteText}> Transaction </Typography> </TableCell>
            <TableCell align="center"> <Typography className={classes.whiteText}> Issue </Typography> </TableCell>
            <TableCell align="center"> <Typography className={classes.whiteText}> Time </Typography> </TableCell>
            <TableCell align="center"> <Typography className={classes.whiteText}> Info </Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{backgroundColor: "#040715"}}>
          {rows.map((row) => (
            <TableRow key={row.name} style={{borderBottom: "none"}}>
              <TableCell align="center" className={classes.noBottom}> <Box display="flex" justifyContent="center">  <Avatar sizes="small" style={{color: "white"}} className={classes.small}> <Typography > JN </Typography>  </Avatar>    </Box></TableCell>
              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText} > ₦5,600 </Typography>   </Box></TableCell>
              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText} > Cash </Typography>   </Box></TableCell>
              <TableCell align="center" className={classes.noBottom}>
                <Box display="flex" justifyContent="center"> 
                  <Badge color="secondary" overlap="circle" badgeContent=" " variant="dot"> {circle}</Badge> 
                </Box>
              </TableCell>
              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <Typography className={classes.whiteText}> 2 hours ago </Typography>   </Box></TableCell>
              <TableCell align="center" className={classes.noBottom}><Box display="flex" justifyContent="center"> <IconButton> <ArrowForward style={{color: "#1f87f5"}} /> </IconButton>  </Box></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SalesTable