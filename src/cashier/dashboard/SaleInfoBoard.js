import { Avatar, Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Print } from '@material-ui/icons'
import React from 'react'

const useStyles = makeStyles((theme) => ({

    infoContainer: {
        backgroundImage: "linear-gradient(to right, rgb(0 0 0), rgb(23 13 74))",
        color: "white"
    },
    square: {
        width: theme.spacing(7),
        backgroundColor: 'green'
    },
}))

function SaleInfoBoard(){

    const classes = useStyles()

    return (
        <Box className={classes.infoContainer} borderRadius={10} style={{}} width={450} bottom={20} p={2} position="absolute">
            <Box display="flex" alignItems="center">

                <Box  width="100%" >
                    <Box p={1} display="flex" justifyContent="space-between">

                        <Box>
                            <Typography variant="h5"> Total Amount:</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5">  ₦9,000</Typography>
                        </Box>

                    </Box>

                    <Box p={1} display="flex" justifyContent="space-between">

                        <Box>
                            <Typography variant="h5"> To Pay:</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5" style={{color: "gold"}}>  ₦9000</Typography>
                        </Box>

                    </Box>

                    <Box p={1} display="flex" justifyContent="space-between">

                        <Box>
                            <Typography variant="h6"> Discount:</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" style={{color: "red"}}>  ₦50</Typography>
                        </Box>

                    </Box>

                    <Box p={1} display="flex" justifyContent="space-between">

                        <Box>
                            <Typography variant="h6"> Transaction:</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6">  Pos_CashBack</Typography>
                        </Box>

                    </Box>

                    
                    

                </Box>



                <Box p={2} display="flex" justifyItems="center" flexDirection="column">
                    <Box>
                        <Typography variant="h4"> 12 </Typography>
                    </Box>

                    <Box m={2}>
                        <Typography variant="h4"> 12 </Typography>
                    </Box>

                    <Box >
                        <IconButton>
                            <Avatar className={classes.square}  variant="rounded">
                                <Print />
                            </Avatar>
                        </IconButton>
                    </Box>
                </Box>







            </Box>
            

            <Box>

            </Box>

    </Box>
    )
}


export default SaleInfoBoard