import React from 'react'
import AdminDashboard from './AdminDashboard'
import LoginForm from './LoginForm'

function AdminPage(){
    const currentUser = localStorage.getItem('admin')
    return (
      <>
          {currentUser ? <AdminDashboard /> : <LoginForm />}
      </>
      
    )
}

export default AdminPage
