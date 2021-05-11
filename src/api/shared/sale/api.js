import axios from 'axios'

import {API_ROOT} from '../../../apiRoot'


export const salesApi = () => {
    const subUrl = `/api/v1/sales/`

    return {
        fetchByReceiptId: (receipt_id) => {
           
            return axios({
                method: 'GET',
                url: `${API_ROOT}${subUrl}${receipt_id}`,
                headers: JSON.parse(localStorage.getItem('admin'))
            })
        }
    }
}
