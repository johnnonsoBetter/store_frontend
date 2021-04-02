import axios from 'axios'
import { getBaseURL } from '../../../baseUrl'
const baseUrl = getBaseURL()


export const salesApi = () => {
    const subUrl = `/api/v1/sales/`

    return {
        fetchByReceiptId: (receipt_id) => {
            const subUrl = `api/v1/sales/${receipt_id}`
            return axios({
                method: 'GET',
                url: `http://localhost:3001/${subUrl}`,
                headers: JSON.parse(localStorage.getItem('admin'))
            })
        }
    }
}



// export const activitiesApi = (store, activity) => {
//     const subUrl = `/api/v1/admin_dashboards/${store}/${activity}`
    
//     return {
//         load: () => {
//             return axios({
//                 method: 'GET',
//                 url: `${baseUrl}${subUrl}`,
//                 headers: JSON.parse(localStorage.getItem('admin'))
//             })
//         },

//         loadDate: (date) => {
//             return axios({
//                 method: 'GET',
//                 url: `${baseUrl}${subUrl}`,
//                 headers: JSON.parse(localStorage.getItem('admin')),
//                 params: {static_date: date}
//             })
//         }
//     }
// }
