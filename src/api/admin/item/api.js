import axios from 'axios'
import { getBaseURL } from '../../../baseUrl'

const baseUrl = getBaseURL()

export const  categoryApi = ()=> {

    return {
        fetchAll: ()=> {
            return axios({
                method: "GET",
                url: 'http://localhost:3001/api/v1/categories',
                headers: JSON.parse(localStorage.admin),
            })
        }
    }
}

export const itemApi = ()=> {

    return {
        fetchAll: ()=> {

          return  axios({
                method: "GET",
                headers: JSON.parse(localStorage.getItem('admin')),
                url: `${baseUrl}api/v1/real_items/`
            })
        },

        createItem: (item)=> {
            return axios({
                method: "POST",
                url: `${baseUrl}api/v1/real_items/`,
                headers: JSON.parse(localStorage.admin),
                data: item
                
            })
        },

        updateItem: (itemName, updateData)=> {
            return axios({
                method: "PUT",
                url: `${baseUrl}api/v1/real_items/name`,
                headers: JSON.parse(localStorage.admin),
                data: updateData,
                params: {item_name: itemName}
                
            })
        },

        deleteItem: (name) => {
            return axios({
                method: "DELETE",
                url: `${baseUrl}api/v1/real_items/name`,
                headers: JSON.parse(localStorage.getItem('admin')),
                params: {item_name: name}
            })
        },

        fetchItem: (name) => {
            return axios({
                method: "GET",
                url: `${baseUrl}api/v1/real_items/name`,
                headers: JSON.parse(localStorage.getItem('admin')),
                params: {item_name: name}
    
            })
        },
        
    }
}

export const store = (store) => {

    return {
        fetchItems: ()=> {
            return axios({
                method: "GET",
                url: `${baseUrl}api/v1/admin_dashboards/${store}/store_items`,
                headers: JSON.parse(localStorage.getItem('admin')),
            })
        }
    }
}