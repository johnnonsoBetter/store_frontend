import { Typography } from '@material-ui/core'
import React, { Component, useContext, useState } from 'react'
import BarcodeReader from 'react-barcode-reader'
import DashboardContext from '../../../../context/cashier/DashboardContext'


function BarcodeProcessor(){
    const [result, setResult] = useState('No Result')
    const {addItemToTable, setProducts, products, itemsToBeSold, counterInfo, setCounterInfo, setItemsToBeSold} = useContext(DashboardContext)

    const handleScan = (data)=> {
      
       const newProduct = [...products].find((product) => product.barcode === data)

       addItemToTable(newProduct)


       
    }

    const handleError = (err) => {
        console.error(err)
        console.log("made some error")
    }


    return (
        <div>
          
            <BarcodeReader
            onError={handleError}
            onScan={handleScan}
            />
          

        </div>
    )
}


export default BarcodeProcessor