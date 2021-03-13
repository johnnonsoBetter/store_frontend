import { Container, Box, Switch } from '@material-ui/core'
import React, { useState } from 'react'

const value = (input) => (input === "true" ? true : false) 

function AuditItem(){

    const storedMode = localStorage.getItem('audit')
    
    if (storedMode === null) {
        localStorage.setItem('audit', false)
    }

    const [auditMode, setAuditMode] = useState(value(localStorage.getItem('audit')))

   

    return (
       <Container>
           <Switch checked={value(storedMode)} onChange={(e) => {
               setAuditMode(e.target.checked)
               
               localStorage.setItem('audit', e.target.checked)
           }}/>
           <Box>
                
               {auditMode ? <h1> i am on the audit item mode </h1> : <h1> We are not on the audity mode</h1>}
               {/* <Box>
                   Item List
               </Box>

               <Box>
                 Item View
               </Box> */}
           </Box>
       </Container>
    )
}

export default AuditItem