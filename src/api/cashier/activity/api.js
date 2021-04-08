
import axios from 'axios'
import { getBaseURL } from '../../../baseUrl'

const baseUrl = getBaseURL()


export const expensesApi = ()=> {
    
    return {
        fetchAll: ()=> {

          return  axios({
                method: "GET",
                headers: JSON.parse(localStorage.getItem('cashier')),
                url: `${baseUrl}/api/v1/cashier_expenses`
            })
        },

        createExpense: (expense)=> {
            return axios({
                method: "POST",
                url: `${baseUrl}/api/v1/expenses`,
                headers: JSON.parse(localStorage.cashier),
                data: {expense: expense}
                
            })
        },

        
    }
}

export const changeApi = ()=> {
    
    return {
        fetchAll: ()=> {

          return  axios({
                method: "GET",
                headers: JSON.parse(localStorage.getItem('cashier')),
                url: `${baseUrl}/api/v1/cashier_changes`
            })
        },

        createChange: (change)=> {
            return axios({
                method: "POST",
                url: `${baseUrl}/api/v1/change_balances`,
                headers: JSON.parse(localStorage.cashier),
                data: {change_balance: change}
                
            })
        },

        
    }
}
