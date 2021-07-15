import axios from 'axios'

import {API_ROOT} from '../../../apiRoot'

export const activitiesApi = (activity) => {
    const subUrl = `api/v2/${activity}`
    
    return {
        load: () => {
            return axios({
                method: 'GET',
                url: `${API_ROOT}${subUrl}`,
                headers: JSON.parse(localStorage.getItem('admin'))
            })
        },

        loadDate: (date) => {
            return axios({
                method: 'GET',
                url: `${API_ROOT}${subUrl}`,
                headers: JSON.parse(localStorage.getItem('admin')),
                params: {static_date: date}
            })
        }
    }
}


