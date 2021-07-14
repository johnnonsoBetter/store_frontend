import axios from 'axios'
import {getBaseURL} from '../../../baseUrl'
 import {API_ROOT} from '../../../apiRoot'


export const dashboardApi = () => {
      return {
          load: ()=> {
            return axios({
                method: "GET",
                url: `${API_ROOT}api/v2/admin_dashboards`,
                headers: JSON.parse(localStorage.getItem('admin'))
              })
          }
      }

}

