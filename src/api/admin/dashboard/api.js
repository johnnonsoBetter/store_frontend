import axios from 'axios'
import {getBaseURL} from '../../../baseUrl'
 const baseUrl = getBaseURL()


export const dashboardApi = (storeName) => {
      return {
          load: ()=> {
            return axios({
                method: "GET",
                url: `${baseUrl}api/v1/admin_dashboard/?store=${storeName}`,
                headers: JSON.parse(localStorage.getItem('admin'))
              })
          }
      }

}

