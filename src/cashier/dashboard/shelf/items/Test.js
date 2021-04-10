import { Typography } from '@material-ui/core'
import React, { Component, useContext, useState } from 'react'
import BarcodeReader from 'react-barcode-reader'
import DashboardContext from '../../../../context/cashier/DashboardContext'


function Test(){
    const [result, setResult] = useState('No Result')
    const {setProducts, products} = useContext(DashboardContext)

    const handleScan = (data)=> {
       console.log("this is the same time and the same people that i would really like to know and let the whole people ")
       const newProducts = [...products].filter((product) => product.barcode === data)

       setProducts(newProducts)
       console.log(newProducts)
       setResult(newProducts[0].name)
    }

    const handleError = (err) => {
        console.error(err)
    }

   

    return (
        <div>
          
            <BarcodeReader
            onError={handleError}
            onScan={handleScan}
            />
            <Typography style={{color: "white"}}> {result} </Typography>
        </div>
    )
}


export default Test