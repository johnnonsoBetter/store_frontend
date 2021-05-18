import { Box, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import CashierSettings from './CashierSettings'
import GeneralSetting from './GeneralSetting'
import InternalInfoSettings from './InternalInfoSettings'

function Settings(){

    
    return (
        <Container>
            
           <GeneralSetting />

           <CashierSettings />

           <InternalInfoSettings />


           
        </Container>
    )
}

export default Settings