
import './App.css';
import LoginForm from './admin/LoginForm';
import AdminDashboard from './admin/AdminDashboard';


function App() {
  const currentUser = localStorage.getItem('admin')
  return (
    <div className="App">
      <div className="App-body">
        {/* <Homepage /> */}
        
        {currentUser ? <AdminDashboard /> : <LoginForm />}
      </div>

    </div>
  );
}

export default App;
