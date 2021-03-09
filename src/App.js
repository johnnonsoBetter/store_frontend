
import './App.css';
import AdminPage from './admin/AdminPage';
import {
  Switch,
  Route,
  Link, useLocation
} from "react-router-dom";
import {withRouter} from 'react-router-dom';



function App(){
  const location = useLocation()


  return (
    <div className="App">
            <div className="App-body">
            <Linker location={location}/>
             
            <Switch>
             <Route exact path="/admin_dashboard">
                <AdminPage />
               </Route>
              <Route path="/cashier_dashboard">
                <CashierPage />
             </Route>
           </Switch>  
           </div>
       </div>
  )
}

export default withRouter(App)


function Linker(props){
  const {pathname} = props.location
  //console.log(props.location)

  console.log( pathname)

  return(

    <div>
         {pathname === '/' ? 
          <>
             <Link to="/admin_dashboard">
                AdminPage
             </Link>

             <Link to="/cashier_dashboard">
                CashierPage
             </Link>
          </>
          : null}
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
