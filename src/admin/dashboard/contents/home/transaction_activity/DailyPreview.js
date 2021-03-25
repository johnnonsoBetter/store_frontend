import { Box, ButtonGroup, Button } from '@material-ui/core'
import React, { useState } from 'react'
import PaymentInfo from './PaymentInfo'
import MainInfo from './MainInfo'
import InternalInfo from './InternalInfo'




function DailyPreview(){

    const [view, setView] = useState("mainInfo") 
    

    return (
        <Box p={2} style={{backgroundImage: "linear-gradient(to left, rgba(255, 0, 0, 0), rgb(123 123 123))", height: "100%", color: "white"}} borderRadius={15}>
           
            <Box display="flex">
                <ButtonGroup disableElevation size="small" variant="contained" color="primary" aria-label="contained primary button group">
                    <Button style={{backgroundColor: "green"}} onClick={()=>  setView("mainInfo")} >Main</Button>
                    <Button style={{backgroundColor: "#cc8504"}} onClick={()=>  setView("paymentInfo")}>Payment</Button>
                    <Button style={{backgroundColor: "#177cc7ad"}} onClick={()=>  setView("internalInfo")}>Internal</Button>
                    
                </ButtonGroup>
                
            </Box>

            <Box marginTop={2}>
               
               {
                   view === "mainInfo" ? <MainInfo /> : view === "paymentInfo" ? <PaymentInfo /> : view === "internalInfo" && <InternalInfo />
               }
               
            </Box>
        </Box>
    )
}

export default DailyPreview