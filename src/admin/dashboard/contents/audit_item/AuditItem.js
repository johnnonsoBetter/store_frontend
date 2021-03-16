import { Box, Switch} from '@material-ui/core'
import React, { useState } from 'react'
import AuditMode from './audit_mode/AuditMode'
import CreateItem from './CreateItem';
import NoAuditMode from './no_audit_mode/NoAuditMode'

const value = (input) => (input === "true" ? true : false) 

function AuditItem(){

    const storedMode = localStorage.getItem('audit')
   
    
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

           <CreateItem />

            <Box>   
               {auditMode ? <AuditMode /> :  <NoAuditMode />  }
          
            </Box>
       </div>
    )
}

export default AuditItem 