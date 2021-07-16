import axios from 'axios'

import {API_ROOT} from '../apiRoot'

export const cashier = () => {
    const subUrl = 'api/v1/auth'
    
    return {
        signup: (data) => {
            return axios({
                method: 'POST',
                url: `${API_ROOT}${subUrl}`,
                params: data
            })
        },

        loadCashiers: () => {
            return axios({
                method: 'GET',
                url: `${API_ROOT}api/v2/cashiers`,
                headers: JSON.parse(localStorage.getItem('admin')),
                
            })

        }

    }
}
