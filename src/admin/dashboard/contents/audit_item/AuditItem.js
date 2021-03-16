import { Box, Switch} from '@material-ui/core'
import React, { useState } from 'react'
import AuditMode from './audit_mode/AuditMode'
import CreateItem from './CreateItem';
import NoAuditMode from './no_audit_mode/NoAuditMode'

const value = (input) => (input === "true" ? true : false) 

function AuditItem(){

    const storedMode = localStorage.getItem('audit')
    //{real_item: {name: "zee soap", cost_price: 80, selling_price: 150, barcode: "897738384", category_id: @category.id},  
    //create_item: {upright: {name: "upright", quantity: 3}, dechoice: {name: "dechoice", quantity: 4}, warehouse: {quantity: 6}}
    
    if (storedMode === null) {
        localStorage.setItem('audit', false)
    }

    const [auditMode, setAuditMode] = useState(value(localStorage.getItem('audit')))
    
    //const [openSnackBar, setOpenSnackBar] = useState(false)
 
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