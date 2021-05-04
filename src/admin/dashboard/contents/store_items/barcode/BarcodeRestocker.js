
import React, { useContext, useState } from 'react'
import StoreItemsInventory from '../../../../../context/admin/store_item_inventory/StoreItemsInventory'
import BarcodeReader from 'react-barcode-reader'


function BarcodeRestocker(){
   
    const {setItemName, performAction, launchSnackBar, items, setItemId} = useContext(StoreItemsInventory)

    const handleScan = (data) => {
        function itemExist(){
            return items.some((item) => item.barcode === data)
        }
        const theItem = [...items].find((item) => item.barcode === data)
        console.log(data)
        console.log(items)
        if (itemExist()){
             setItemName(theItem.name)
             setItemId(theItem.id)
             performAction()
        }else{
             launchSnackBar("Item Not found, Please Try Searching with (name or code) And Report Issue",'warning', true)
        }
    }

    const handleError = (err) => {
        
        launchSnackBar("Unable To Scan Item ",'info', true)
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

export default BarcodeRestocker