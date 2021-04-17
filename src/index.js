import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter
} from "react-router-dom";
import Dexie from 'dexie'

// {
   
    //     "log_issue_type": "sale",
    //     "sale": {
    //         "receipt_id": "bbbeea3f2f",
    //         "issue": true,
    //         "receipt_was_issued": true,
    //         "total_items_amount": 600,
    //         "discount": 0,
    //         "total_amount_paid": 600,
    //         "transaction_type": "cash",
    //         "cash_amount": 600,
    //         "cashback_profit": 0,
    //         "pos_amount": 0,
    //         "transfer_amount": 0,
    //         "items": [ {"name": "Snicker Chocolate", "quantity_sold": 1, "price_sold_per_unit": 600, "selling_price_was_altered": true}
    //         ]
                
    //     }
                                
               
    // }

const db = new Dexie('storeDb')
db.version(1).stores({
    failedSales: 'receipt_id, issue, receipt_was_issued, total_items_amount, total_amount_paid, discount, transaction_type, cash_amount, cashback_profit, pos_amount, transfer_amount, items'
})

db.open().catch(function(){
 console.log("failed to open")
});

ReactDOM.render(
  <React.StrictMode>
        <BrowserRouter>
        <App />
        </BrowserRouter>
        
  
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
