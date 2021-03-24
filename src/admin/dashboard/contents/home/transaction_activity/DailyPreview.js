import { Box, Typography, ButtonGroup, Button } from '@material-ui/core'
import { getDefaultNormalizer } from '@testing-library/react'
import React from 'react'
import MainInfo from './MainInfo'

function DailyPreview(){


    return (
        <Box p={2} style={{backgroundImage: "linear-gradient(to left, rgba(255,0,0,0), rgb(54 74 105))", color: "white"}} borderRadius={15}>
           
            <Box display="flex">
                <ButtonGroup disableElevation size="small" variant="contained" color="primary" aria-label="contained primary button group">
                    <Button style={{backgroundColor: "green"}} >Main</Button>
                    <Button style={{backgroundColor: "#cc8504"}}>Preview</Button>
                    <Button style={{backgroundColor: "#177cc7ad"}}>Internal</Button>
                    
                </ButtonGroup>
                
            </Box>

            <Box marginTop={2}>
               <MainInfo />
            </Box>

        </Box>
    )
}

export default DailyPreview