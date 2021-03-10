
import './App.css';
import AdminPage from './admin/AdminPage';
import {
  Switch,
  Route,
  Link, useLocation, Redirect
} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import LoginForm from './admin/LoginForm';



function App(){
  const location = useLocation()
  const currentAdmin = localStorage.getItem('admin')


  return (
    <div className="App">
            <div className="App-body">
            
             
            <Switch>

            <Route exact path="/">
                <Linker location={location}/>
            </Route>
             <Route exact path="/admin_dashboard">
                {currentAdmin == null ?
                  <Redirect to="/login" /> : <AdminPage />
                }
              </Route>

              <Route exact path="/cashier_dashboard">
                <CashierPage />
             </Route>

             <Route exact path="/login">
          
               {currentAdmin ?
                <Redirect to="/admin_dashboard" /> : <LoginForm />
               }
             </Route>
           </Switch>  
           </div>
       </div>
  )
}

export default withRouter(App)


function Linker(props){
  const {pathname} = props.location
  

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
