import React from 'react'
import { Box, ButtonBase, Container, makeStyles, Typography, useMediaQuery} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
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


function ContentNav(){

    const classes = useStyles()

    return (

        <>
            <ButtonBase  borderRadius={6} className={classes.contItem}   marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Sales</Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                        <Typography variant="h6"> ₦8,000</Typography>
                    </Box>

                </Box>
                
            </ButtonBase>      

                            
            
        
            <ButtonBase style={{backgroundColor: "#19526C"}}  borderRadius={6} className={classes.contItem}  p={2} marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Expenses</Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                        <Typography variant="h6"> ₦8,000</Typography>
                    </Box>

                </Box>
                
            </ButtonBase>      
        

        
            <ButtonBase style={{backgroundColor: "rgb(187 110 44)"}}  borderRadius={6} className={classes.contItem}  p={2} marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Debts</Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                        <Typography variant="h6"> ₦8,000</Typography>
                    </Box>

                </Box>
                
            </ButtonBase>      
        
            
            <ButtonBase style={{backgroundColor: "#212623"}}  borderRadius={6} className={classes.contItem}  p={2} marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Returns </Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                        <Typography variant="h6"> ₦4,000</Typography>
                    </Box>

                </Box>
                
            </ButtonBase>      
        

        
            <ButtonBase style={{backgroundColor: "rgb(67 58 214)"}}  borderRadius={6} className={classes.contItem}  p={2} marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Changes</Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                        <Typography variant="h6"> ₦1,000</Typography>
                    </Box>

                </Box>
                
            </ButtonBase>      
        

        
            <ButtonBase style={{backgroundColor: "rgb(179 59 59)"}}  borderRadius={6} className={classes.contItem}  p={2} marginRight={2} position="relative" marginLeft={2}>
                <Box >
                    <Box textAlign="left" top={20} left={30}  position="absolute">
                        <Typography variant="h6"> Cashier Report</Typography>
                    </Box>

                    <Box textAlign="right" bottom={20} right={30} position="absolute">
                        <Typography variant="h6"> ₦8,000</Typography>
                    </Box>

                </Box>
                
            </ButtonBase>      
        </>

    )
}


export default ContentNav