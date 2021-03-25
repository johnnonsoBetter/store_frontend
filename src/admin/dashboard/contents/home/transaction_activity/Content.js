import { Box, ButtonBase, Container, makeStyles, Accordion, AccordionSummary, AccordionDetails, Typography} from '@material-ui/core'
import axios from 'axios';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {React, useEffect, useLayoutEffect, useState} from 'react'
import { TransactionActivityContextProvider } from '../../../../../context/admin/transaction_activity/TransactionActivity';
import ContentNav from './ContentNav';
import Overview from './Overview';
import SalesTable from './sales/SalesTable';



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

    function updateSize() {
      setWidth(window.innerWidth);
     
    }

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
         setTableType('sales')
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

    const classes = useStyles()
    const [preview, setPreview] = useState([])
    const [transactionActivity, setTransactionActivity] = useState({})
    const [tableType, setTableType] = useState(null)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)


    return (
         <>
         <TransactionActivityContextProvider 
            value= {{
               transactionActivity: transactionActivity,
               preview: [],
               tableType: "",
               show,
               setShow: (show)=> {
                  setShow(show)
               }
            }}
         >
            <Container className={classes.root}>
                  <Box width="90vw" className={classes.cont}>
                     <ContentNav />
                  
                  </Box>

                  <Box marginTop={4} >
                     <Overview width={width}/>
                  
                  </Box>

                  <Box marginTop={4} marginBottom={2}>
                     <Accordion style={{backgroundColor: "rgb(0 4 10)"}} expanded={show}>
                        <AccordionSummary
                           expandIcon={<ExpandMoreIcon />}
                           aria-controls="panel1a-content"
                           id="panel1a-header"
                        >
                          
                        </AccordionSummary>
                        <AccordionDetails>
                           <SalesTable />
                          
                        </AccordionDetails>
                     </Accordion>
                     

                  </Box>

            </Container>
         </TransactionActivityContextProvider>
           
 
         </>


  
           
            
     
    )
}

export default Content