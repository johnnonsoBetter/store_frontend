import { Box, ButtonBase, Container, makeStyles, Typography, useMediaQuery} from '@material-ui/core'
import {React, useEffect, useLayoutEffect, useState} from 'react'
import ContentNav from './ContentNav';
import Overview from './Overview';



const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1
    },

    cont: {
         display: "flex",
        // flexWrap: "nowrap",
         overflowX: "auto",
         marginTop: theme.spacing(3),
         whiteSpace: "nowrap",
         [theme.breakpoints.up('lg')]: {
            width: "70vw"
         },
        // scrollBehavior: "smooth"
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

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }




function Content(){

    const [width, setWidth] = useState(0)
    const matches = useMediaQuery('(max-width:1286px)')
    const [type, setType] = useState("Sales")

    function updateSize() {
      setWidth(window.innerWidth);
      console.log("resizing it ", window.innerWidth)
    }

    useEffect(()=> {
       updateSize()
       console.log("i have made the width available")
    }, [])


     useLayoutEffect(()=> {
      
       window.addEventListener('resize', updateSize);
       updateSize();
       

        return () => window.removeEventListener('resize', updateSize);
    }, [])

    const classes = useStyles()

    return (
         <>
   
           <Container className={classes.root}>
               <Box width="90vw" className={classes.cont}>
                  <ContentNav />
                 
               </Box>

               <Box marginTop={4} >
                  <Overview width={width}/>
                 
               </Box>

           </Container>
 
         </>


      // Sales
      // Debts
      // Changes
      // Expenses
      // Return
      // Turnover Report
           
            
     
    )
}

export default Content