
import './App.css';
import AdminPage from './admin/AdminPage';
import {
 useLocation, useHistory
} from "react-router-dom";

import { Button } from '@material-ui/core';



function App(){
  const location = useLocation()
  const history = useHistory()
  const desiredLocation = localStorage.getItem('desiredLocation')
 


  if(desiredLocation == null ){
    localStorage.setItem("desiredLocation", "homepage")
    history.push('/')
  }
  


  return (
    <div className="App">
            <div className="App-body">
             {
               location.pathname === "/" ?  <Linker history={history}/> :

             localStorage.getItem('desiredLocation') === "admin" ? <AdminPage /> : desiredLocation === "cashier" ? <CashierPage /> : null}

           </div>
       </div>
  )
}

export default App


function Linker({history}){

  return(

    <div>
        
          <>
             <Button color="primary" onClick={() => {
               localStorage.setItem("desiredLocation", "cashier")
               history.push("/cashier_dashboard")

             }}> Cashier </Button>

             <Button color="secondary" onClick={() => {

               localStorage.setItem("desiredLocation", "admin")
               history.push("/admin_dashboard")
             }}> Admin </Button>

          </>
         
    </div>
   
  )

}


function CashierPage(){

  return (
    <div>
      This is the cashier page
    </div>
  )
}


