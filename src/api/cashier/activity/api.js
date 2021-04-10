
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

export const itemReturnApi = ()=> {
    
    return {
        fetchAll: ()=> {

          return  axios({
                method: "GET",
                headers: JSON.parse(localStorage.getItem('cashier')),
                url: `${baseUrl}/api/v1/cashier_item_returns`
            })
        },

        createItemReturn: (item_return)=> {
            return axios({
                method: "POST",
                url: `${baseUrl}/api/v1/item_returns`,
                headers: JSON.parse(localStorage.cashier),
                data: {item_return: item_return}
                
            })
        },

        
    }
}




export const cashierDebtApi = ()=> {
    
    return {
        fetchAll: ()=> {

          return  axios({
                method: "GET",
                headers: JSON.parse(localStorage.getItem('cashier')),
                url: `${baseUrl}/api/v1/cashier_debts`
            })
        },

        createDebt: (debt)=> {
            return axios({
                method: "POST",
                url: `${baseUrl}/api/v1/debts`,
                headers: JSON.parse(localStorage.cashier),
                data: {debt: debt}
                
            })
        },

        
    }
}


export const cashierRecoverDebtApi = ()=> {
    
    return {
        fetchAll: ()=> {

          return  axios({
                method: "GET",
                headers: JSON.parse(localStorage.getItem('cashier')),
                url: `${baseUrl}/api/v1/cashier_recovered_debts`
            })
        },

        recoverDebt: (recovered_debt)=> {
            return axios({
                method: "POST",
                url: `${baseUrl}/api/v1/recovered_debts`,
                headers: JSON.parse(localStorage.cashier),
                data: {recovered_debt: recovered_debt}
                
            })
        },

        
    }
}


export const cashierSalesApi = () => {

    return {
        fetchByReceiptId: (receipt_id) => {
            return  axios({
                method: "GET",
                headers: JSON.parse(localStorage.getItem('cashier')),
                url: `${baseUrl}/api/v1/cashier_sales/${receipt_id}`
            })
        }
    }

}

export const cashierApi = () => {

    return {
        login: (email, password) => {
            return axios({
                method: 'POST',
                url: `${baseUrl}/api/v1/auth/sign_in`,
                data: {
                    email: email,
                    password: password
                }
            })
        },

        logout: () => {
            return axios({
                method: "DELETE",
                url: `${baseUrl}/api/v1/auth/sign_out`,
                data: JSON.parse(localStorage.cashier)
              })
        },

        loadStoreResource: () => {

        }
    }
}
