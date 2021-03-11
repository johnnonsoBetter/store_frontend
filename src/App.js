
import './App.css';
import AdminPage from './admin/AdminPage';
import {
  Switch,
  Route,
  Link, useLocation, Redirect, BrowserRouter
} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import LoginForm from './admin/LoginForm';



function App(){
  
  const currentAdmin = localStorage.getItem('admin')


  return (
    <div className="App">
            <div className="App-body">

              {/* <BrowserRouter>
              
             

                {
                  currentAdmin ? <AdminPage /> : <Linker />
                }
                
              </BrowserRouter> */}

            <AdminPage />
            

           
           </div>
       </div>
  )
}

export default App


function Linker(props){

  return(

    <div>
        
          <>
             <Link to="/admin_dashboard">
                AdminPage
             </Link>

             <Link to="/cashier_dashboard">
                CashierPage
             </Link>
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



// export default App;
