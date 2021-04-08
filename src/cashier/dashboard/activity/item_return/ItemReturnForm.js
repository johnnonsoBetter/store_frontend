import { Box, Grid, IconButton, makeStyles, Button, CircularProgress, Slide, Typography } from '@material-ui/core'
import { ArrowBack, CreateSharp } from '@material-ui/icons'
import React, { useState } from 'react'
import {Input} from '../../CustomInput'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    backButton: {
        color: "white"
    },
    itemName: {
        color: "white"
    },
    greenText: {
        color: "#7cdaff",
        borderRadius: 10,
        boxShadow: "1px"

    },
    inputContainer: {
        backgroundColor: "black",
        color: "white"
    }
}))

function ItemReturnForm(){

    const classes = useStyles()
    const [loading, setLoading] = useState(false)


    const handleSubmit =() => {

    }

    const handleChange = () => {

    }
    return (
        <Slide direction="left" in={true}>
            <Box>
                <Box>
                    <IconButton className={classes.backButton} > <ArrowBack> </ArrowBack></IconButton>
                </Box>
                <Box >
                    <Box textAlign="center"> <Typography variant="h6" className={classes.itemName}> Hollandia Yogurth Plain </Typography></Box>
                </Box>

                
                    <Box  textAlign="center" className={classes.greenText}  justifyContent="space-around" >
                        <Box p={3}>
                            <Typography variant="h3">₦900</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h3">9</Typography>
                        </Box>
                    </Box>

                    <Box p={2}>

                    <form onSubmit={handleSubmit}  noValidate autoComplete="off">
              

               

                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="flex-start">
                                        <Box boxShadow={30} width={100} borderRadius={6} p={1} className={classes.inputContainer}>
                                            <Box textAlign="center">
                                                <Typography variant="h5"> ? </Typography>
                                            </Box>
                                            <Box textAlign="center" >
                                                <Typography variant="h5"> <CreateSharp /> </Typography>
                                            </Box>
                                            <Box textAlign="center" >
                                                <Input placeholder="who?" type="number" name="collector"  onChange={handleChange} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="flex-end">
                                        <Box boxShadow={30} width={200} borderRadius={6} p={2} className={classes.inputContainer}>
                                            <Box textAlign="center">
                                                <Typography variant="h5"> Reason </Typography>
                                            </Box>
                                            <Box textAlign="center" >
                                                <Typography variant="h5"> <CreateSharp /> </Typography>
                                            </Box>
                                            <Box textAlign="center" >
                                                <Input placeholder="who?" name="collector" type="text"  onChange={handleChange} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>

                                

                                
                                

                                <Grid item xs={12}>
                                    <Box   display="flex" justifyContent="flex-start">
                                       
                                        <div className={classes.wrapper}>
                                            <Button
                                            variant="contained"
                                            color="primary"
                                            
                                            disabled={loading}
                                            type="submit"
                                            >
                                            Create Expense
                                            </Button>
                                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                        </div>
                                    </Box>
                                </Grid>
                            </Grid>
                            
                        </form>
                    </Box>
               
            </Box>

        </Slide>
        
    )
}

export default ItemReturnForm