import { Typography } from '@material-ui/core'
import React, { Component, useContext, useState } from 'react'
import BarcodeReader from 'react-barcode-reader'
import DashboardContext from '../../../../context/cashier/DashboardContext'


function BarcodeProcessor(){
    const [result, setResult] = useState('No Result')
    const {addItemToTable, setProducts, products, launchSnackBar} = useContext(DashboardContext)

    const handleScan = (data)=> {
       function itemExist(){
           return products.some((item) => item.barcode === data)
       }
       const newProduct = [...products].find((product) => product.barcode === data)

       if (itemExist()){
            addItemToTable(newProduct)
       }else{
            launchSnackBar("Item Not found, Please Try Searching with (name or code) And Report Issue",'warning')
       }

       

       
    }

    const handleError = (err) => {
        
        launchSnackBar("Unable To Scan Item ",'info')
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