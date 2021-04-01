import axios from 'axios'
import { getBaseURL } from '../../../baseUrl'
const baseUrl = getBaseURL()



export const activitiesApi = (store, activity) => {
    const subUrl = `/api/v1/admin_dashboards/${store}/${activity}`
    
    return {
        load: () => {
            return axios({
                method: 'GET',
                url: `${baseUrl}${subUrl}`,
                headers: JSON.parse(localStorage.getItem('admin'))
            })
        },

        loadDate: (date) => {
            return axios({
                method: 'GET',
                url: `${baseUrl}${subUrl}`,
                headers: JSON.parse(localStorage.getItem('admin')),
                params: {static_date: date}
            })
        }
    }
}


