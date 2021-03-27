import { Box, ButtonBase, Container, makeStyles, Accordion, AccordionSummary, AccordionDetails, Typography} from '@material-ui/core'
import axios from 'axios';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {React, useEffect, useLayoutEffect, useState} from 'react'
import { TransactionActivityContextProvider } from '../../../../../context/admin/transaction_activity/TransactionActivity';
import ContentNav from './ContentNav';
import Overview from './Overview';
import SalesTable from './sales/SalesTable';

import DatePicker from '../../../DatePicker'



const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1
    },

    cont: {
         display: "flex",
         overflowX: "auto",
         marginTop: theme.spacing(3),
         whiteSpace: "nowrap",
         [theme.breakpoints.up('lg')]: {
            width: "70vw"
         },

    },
    contItem: {
       backgroundColor: "green",
       width: 220,
       minWidth: 220,
       minHeight: 135,
       display: "inline-block",
       borderRadius: "9px",
       display: "inline-block",
       marginRight: theme.spacing(2),
       marginLeft: theme.spacing(2),
   
    }, 
    link: {
       
       
       padding: theme.spacing(0),
       textDecoration: "none",
       color: "white"
    }
}))




function Content(){

    const [width, setWidth] = useState(0)
    const storeName = "upright"

    const classes = useStyles()
    const [preview, setPreview] = useState([])
    const [transactionActivity, setTransactionActivity] = useState({})
    const [tableType, setTableType] = useState(null)
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false)

    function updateSize() {
      setWidth(window.innerWidth);
     
    }
   //  ?store=${storeName}`
    useEffect(()=> {
       updateSize()

       axios({
         method: 'GET',
         url: `http://localhost:3001/api/v1/admin_dashboards/${storeName}/sales`,
         headers: JSON.parse(localStorage.getItem('admin'))
       }).then(response => {
         console.log(response)

         const {transaction_activity} = response.data
         
         setTransactionActivity(transaction_activity)
        
       }).catch(err => {

         console.log(err)
       })
       

       return ()=> {
          setWidth(0)

       }
    }, [])


     useLayoutEffect(()=> {
      
       window.addEventListener('resize', updateSize);
       updateSize();
       

        return () => window.removeEventListener('resize', updateSize);
    }, [])

    


    return (
         <>
         <TransactionActivityContextProvider 
            value= {{
               transactionActivity: transactionActivity,
               preview: [],
               tableType: "",
               show,
               loading,
               setTableType: (tableType)=> {
                  setTableType(tableType)
               },
               setTransactionActivity,
               setShow,
               
            }}
         >
            <Container className={classes.root}>
                  <DatePicker />
                  <Box width="90vw" className={classes.cont}>
                     <ContentNav />
                  
                  </Box>

                  <Box marginTop={4} >
                     <Overview width={width}/>
                  
                  </Box>

                  <Box marginTop={4} marginBottom={2}>
                     <Accordion style={{backgroundColor: "black"}} expanded={show}>
                        <AccordionSummary
                           expandIcon={<ExpandMoreIcon />}
                           aria-controls="panel1a-content"
                           id="panel1a-header"
                        >
                          
                        </AccordionSummary>
                        <AccordionDetails>
                           
                           {
                              tableType === "sales" ? <SalesTable /> : null
                           }
                          
                          
                        </AccordionDetails>
                     </Accordion>
                     

                  </Box>

            </Container>
         </TransactionActivityContextProvider>
           
 
         </>


  
           
            
     
    )
}

export default Content