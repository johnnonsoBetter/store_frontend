import { Box, Switch} from '@material-ui/core'
import React, { useState } from 'react'
import {AuditModeContextProvider} from '../../../../context/audit_item/AuditModeContext';
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
    const [items, setItems] = useState([])
    const [totalItems, setTotalItems] = useState("0")


    return (
            <div>

                <AuditModeContextProvider 
                    value = {{
                            items: items,
                            totalItems: totalItems,
                            setItems: items => setItems(items),
                            setTotalItems: totalItems => setTotalItems(totalItems)
                        }
                    }
                
                >


                
                <Switch  checked={value(storedMode)} onChange={(e) => {
                    setAuditMode(e.target.checked)
                    
                    localStorage.setItem('audit', e.target.checked)
                }}/>

                <CreateItem />

                     
                    {auditMode ? <AuditMode /> :  <NoAuditMode />  }
                
                    
                </AuditModeContextProvider>
            </div>
    )
}

export default AuditItem 