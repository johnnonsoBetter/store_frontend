import axios from 'axios'
import { getBaseURL } from '../../../baseUrl'
const baseUrl = getBaseURL()


export const salesApi = () => {
    const subUrl = `/api/v1/sales/`

    return {
        fetchByReceiptId: (receipt_id) => {
           
            return axios({
                method: 'GET',
                url: `${baseUrl}${subUrl}${receipt_id}`,
                headers: JSON.parse(localStorage.getItem('admin'))
            })
        }
    }
}
