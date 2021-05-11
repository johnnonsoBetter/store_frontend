import axios from 'axios'
import {getBaseURL} from '../../../baseUrl'
 import {API_ROOT} from '../../../apiRoot'


export const dashboardApi = (storeName) => {
      return {
          load: ()=> {
            return axios({
                method: "GET",
                url: `${API_ROOT}api/v1/admin_dashboard/?store=${storeName}`,
                headers: JSON.parse(localStorage.getItem('admin'))
              })
          }
      }

}

