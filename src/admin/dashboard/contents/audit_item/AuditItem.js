import { Box, Button, Switch, Typography, Grid, Container} from '@material-ui/core'
import { AddBox } from '@material-ui/icons'
import React, { useState } from 'react'
import AuditMode from './audit_mode/AuditMode'
import NoAuditMode from './no_audit_mode/NoAuditMode'

const value = (input) => (input === "true" ? true : false) 

function AuditItem(){

    const storedMode = localStorage.getItem('audit')

    console.log(window)
    
    if (storedMode === null) {
        localStorage.setItem('audit', false)
    }

    const [auditMode, setAuditMode] = useState(value(localStorage.getItem('audit')))

   

    return (
            <div>
           <Switch checked={value(storedMode)} onChange={(e) => {
               setAuditMode(e.target.checked)
               
               localStorage.setItem('audit', e.target.checked)
           }}/>

           <Button>
               <AddBox />
           </Button>
            <Box>   
               {auditMode ? <AuditMode /> :  <NoAuditMode />  }
          
            </Box>


        

        
       </div>
    )
}

export default AuditItem