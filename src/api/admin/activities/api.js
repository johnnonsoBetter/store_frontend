import axios from 'axios'

import {API_ROOT} from '../../../apiRoot'

export const activitiesApi = (store, activity) => {
    const subUrl = `api/v1/admin_dashboards/${store}/${activity}`
    
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


