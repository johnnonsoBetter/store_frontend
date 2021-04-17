

import React, { useContext, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Typography } from '@material-ui/core';
import ReactToPrint from 'react-to-print';
import DashboardContext from '../../context/cashier/DashboardContext';

export default function SaleReceipt() {

  const [scroll, setScroll] = React.useState('paper');
  const receiptRef = useRef()
  const {receiptOpened, setReceiptOpened} = useContext(DashboardContext)



  const handleClose = () => {
    setReceiptOpened(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (receiptOpened) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [receiptOpened]);

  return (
    <div>
    
      <Dialog
        open={receiptOpened}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
           <Box ref={receiptRef}>
               <Typography> Please how are we going to add some sample </Typography>
           </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        
          <ReactToPrint 
          
            trigger ={() => (
                <Button onClick={handleClose} color="primary">
                    Subscribe
                </Button>
            )}

            content={()=> receiptRef.current}
          
          />
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
