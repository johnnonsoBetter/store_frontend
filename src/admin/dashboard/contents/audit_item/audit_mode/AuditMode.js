import { Box,  TextField,  Container, Typography } from '@material-ui/core'
import React from 'react'

function AuditMode(){


    return (
     
        <Container>
            <Box display="flex" justifyContent="space-around"  style={{backgroundColor: "#0b1125"}} m={2}>
                <Box width="68%"  >
                    <Box display="flex" width="30%" >
                        <TextField id="standard-basic" label="Standard" style={{color: "whitesmoke"}}/>
                    </Box>
                    
                    <Box style={{height: "calc(100vh - 200px)", overflow: "auto"}}>
                        <Typography> Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some people int th</Typography>
                        <Typography> Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some people int th</Typography>
                        <Typography> Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some people int th</Typography>
                        <Typography> Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some people int th</Typography>
                        <Typography> Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some people int th</Typography>
                        <Typography> Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some people int th</Typography>
                        <Typography> Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some people int th</Typography>
                        <Typography> Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some people int th</Typography>
                        <Typography> Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some pe Place some people int th Place some people int th Place some people int th Place some people int th</Typography>

                    </Box>
                    
                    
                </Box>

                <Box width="30%" bgcolor="grey.300">
                <Typography> Place int th</Typography>
                </Box>

            </Box>
            
            
        </Container>
    )
}

export default AuditMode