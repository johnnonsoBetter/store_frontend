
import {React, useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, Avatar, Box, Typography, Badge, IconButton, MenuItem, Menu, Button} from '@material-ui/core/';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import clsx from 'clsx';
import { ArrowForward, PrintDisabledRounded, SearchRounded, FlashOffRounded} from '@material-ui/icons';
import TransactionActivityContext from '../../../../../../context/admin/transaction_activity/TransactionActivity';
import axios from 'axios'

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
  const storeName = "upright"
  const {setTransactionActivity, setTableType} = useContext(TransactionActivityContext)



  const [anchorEl, setAnchorEl] = useState(null);
  const [sales, setSales] = useState([])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect(()=> {

    axios({
      method: 'GET',
      url: `http://localhost:3001/api/v1/admin_dashboards/${storeName}/sales`,
      headers: JSON.parse(localStorage.getItem('admin'))
    }).then(response => {
      console.log(response)

       const {transaction_activity} = response.data
      
       setTransactionActivity(transaction_activity)
       setTableType('sales')
      console.log("this is the transaction activity ", response)
    }).catch(err => {

      console.log(err)
    })

    return ()=> {
      setSales([])

    }
  }, [])

  return (
    <>
    
    <TableContainer component={Paper} style={{backgroundColor: "black"}}>
    
      <Box style={{backgroundColor: '#090A0A'}} alignContent="center" display="flex" paddingRight={3} paddingLeft={3}>

        

        <Box display="flex" flexGrow={1}>
          <IconButton> 
              <SearchRounded style={{color: "white"}}/>
          </IconButton>
          
        </Box>

        <Box   style={{color: "white"}} display="flex">
          <Button aria-controls="simple-menu" className={classes.whiteText} aria-haspopup="true" onClick={handleClick}>
            Transactions
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>All</MenuItem>
            <MenuItem onClick={handleClose}>Cash</MenuItem>
            <MenuItem onClick={handleClose}>Pos</MenuItem>
            <MenuItem onClick={handleClose}>Transfer</MenuItem>
            <MenuItem onClick={handleClose}>Pos Cashback</MenuItem>
            <MenuItem onClick={handleClose}>Transfer Cashback</MenuItem>
            <MenuItem onClick={handleClose}>Pos Cash</MenuItem>
            <MenuItem onClick={handleClose}>Transfer Cash</MenuItem>
            <MenuItem onClick={handleClose}>Pos Transfer</MenuItem>
          </Menu>
        </Box>

        <Box display="flex" marginRight={1} marginLeft={1}>
          <IconButton> 
              <PrintDisabledRounded style={{color: "white"}}/>
          </IconButton>
          
        </Box>

        <Box display="flex" marginRight={1} marginLeft={1}>
          <IconButton> 
              <FlashOffRounded style={{color: "white"}}/>
          </IconButton>
          
        </Box>
      </Box>
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
    </>
  );
}

export default SalesTable