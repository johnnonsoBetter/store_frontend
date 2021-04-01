import { Box, Container, makeStyles, Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core'
import axios from 'axios';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {React, useContext, useEffect, useLayoutEffect, useState} from 'react'
import { TransactionActivityContextProvider } from '../../../../../context/admin/transaction_activity/TransactionActivity';
import ContentNav from './ContentNav';
import Overview from './Overview';
import SalesTable from './sales/SalesTable';
import { useParams } from 'react-router-dom';
import FixedAppBar from '../../../FixedAppBar';
import ExpensesTable from './expenses/ExpensesTable';
import DebtTable from './debts/DebtTable';
import AdminDashboardStyleContext from '../../../../../context/admin/AdminDashboardContext';
import NoActivity from '../NoActivity';
import ChangeTable from './changes/ChangeTable';
import ItemReturnTable from './item_returns/ItemReturnTable';



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
    
    const {storeName} = useParams()

    const classes = useStyles()
    const [preview, setPreview] = useState([])
    const [transactionActivity, setTransactionActivity] = useState({})
    const [tableType, setTableType] = useState(null)
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false)
    const {handleDrawerToggle} = useContext(AdminDashboardStyleContext)
    const {staticDate, setStaticDate} = useContext(AdminDashboardStyleContext).store


    function noTransaction(obj){
       return Object.keys(obj).length === 0
    }

    

    function updateSize() {
      setWidth(window.innerWidth);
     
    }

    const setTransactionByDate = (date) => {
       console.log("former static date ", staticDate)
       console.log("are we allowed to know the cps", date)
      axios({
         method: 'GET',
         url: `http://localhost:3001/api/v1/admin_dashboards/${storeName}/sales`,
         headers: JSON.parse(localStorage.getItem('admin')),
         params: {static_date: date}
       }).then(response => {
         
         const {transaction_activity} = response.data

         setTableType(null)
         setShow(false)

         console.log(transaction_activity)
         
          setTransactionActivity(transaction_activity)
        
       }).catch(err => {

         console.log(err)
       })

    }

    useEffect(()=> {
       updateSize()
       console.log("entering page")
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
          setTableType(null)
          setTransactionActivity({})
          setStaticDate('')

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
                  tableType,
                  show,
                  loading,
                  setTableType: (tableType)=> {
                     setTableType(tableType)
                  },
                  setTransactionActivity,
                  setShow,
                  staticDate,
                  
               }}
            >
               <Container className={classes.root}>
                     <FixedAppBar handleDrawerToggle={handleDrawerToggle} resetContent={setTransactionByDate}/>
                     {
                        noTransaction(transactionActivity) ? <NoActivity activity="Transaction" date={staticDate}/>
                        :
                        <div>
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
                                       tableType === "sales" ? <SalesTable /> : tableType === "expenses" ? <ExpensesTable /> : tableType === "debts" ? <DebtTable /> : tableType === "changes" ? <ChangeTable /> : tableType === "item_returns" ? <ItemReturnTable /> : null
                                    }
                                 
                                 
                                 </AccordionDetails>
                              </Accordion>
                              

                           </Box>




                        </div>
                        

                     }
                    
               </Container>
            </TransactionActivityContextProvider>
      </>

    )
}

export default Content