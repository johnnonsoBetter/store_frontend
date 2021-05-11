import axios from 'axios'
import {API_ROOT} from '../../../apiRoot'

export const  categoryApi = ()=> {

    return {
        fetchAll: ()=> {
            return axios({
                method: "GET",
                url: `${API_ROOT}api/v1/categories/`,
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
                url: `${API_ROOT}api/v1/real_items/`
            })
        },

        createItem: (item)=> {
            return axios({
                method: "POST",
                url: `${API_ROOT}api/v1/real_items/`,
                headers: JSON.parse(localStorage.admin),
                data: item
                
            })
        },

        updateItem: (itemName, updateData)=> {
            return axios({
                method: "PUT",
                url: `${API_ROOT}api/v1/real_items/name`,
                headers: JSON.parse(localStorage.admin),
                data: updateData,
                params: {item_name: itemName}
                
            })
        },

        fetchItemInventoryInfo: (id) => {
            return axios({
                method: "GET",
                url: `${API_ROOT}api/v1/store_items/${id}`,
                headers: JSON.parse(localStorage.getItem('admin')),
            })
        },

        deleteItem: (name) => {
            return axios({
                method: "DELETE",
                url: `${API_ROOT}api/v1/real_items/name`,
                headers: JSON.parse(localStorage.getItem('admin')),
                params: {item_name: name}
            })
        },

        fetchItem: (name) => {
            return axios({
                method: "GET",
                url: `${API_ROOT}api/v1/real_items/name`,
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
                url: `${API_ROOT}api/v1/admin_dashboards/${store}/store_items`,
                headers: JSON.parse(localStorage.getItem('admin')),
            })
        },

        fetchInventoryInfo: ()=> {
            return axios({
                method: "GET",
                url: `${API_ROOT}api/v1/store_inventory_managers/${store}`,
                headers: JSON.parse(localStorage.getItem('admin')),
            })
        },

        restockItem: (name, quantity)=> {
            return axios({
                method: "POST",
                url: `${API_ROOT}api/v1/restocks`,
                headers: JSON.parse(localStorage.getItem('admin')),
                data: {
                    store_name: store,
                    item_name: name,
                    quantity: quantity
                }
            })

        },

        takeItemStock: (name, repaired_quantity) => {
            return axios({
                method: "POST",
                url: `${API_ROOT}api/v1/admin_dashboards/${store}/item_stock_repairs`,
                headers: JSON.parse(localStorage.getItem('admin')),
                data: {
                   item_stock_repair: {
                       name,
                       repaired_quantity,
                   }
                }
            })

        },

        removeBadItem: (name, quantity)=> {
            return axios({
                method: "POST",
                url: `${API_ROOT}api/v1/bad_items`,
                headers: JSON.parse(localStorage.getItem('admin')),
                data: {
                    store_name: store,
                    name,
                    quantity,
                }
            })

        },

       
    }
}