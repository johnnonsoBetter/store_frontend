import axios from 'axios'
import {API_ROOT} from '../../../apiRoot'

export const  categoryApi = ()=> {

    return {
        fetchAll: ()=> {
            return axios({
                method: "GET",
                url: `${API_ROOT}api/v2/categories/`,
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
                url: `${API_ROOT}api/v2/items/`
            })
        },

        createItem: (item)=> {
            return axios({
                method: "POST",
                url: `${API_ROOT}api/v2/items/`,
                headers: JSON.parse(localStorage.admin),
                data: item
                
            })
        },

        updateItem: (name, updateData)=> {
            return axios({
                method: "PUT",
                url: `${API_ROOT}api/v2/items/${name}`,
                headers: JSON.parse(localStorage.admin),
                data: updateData,
                params: {name: name}
                
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
                url: `${API_ROOT}api/v2/items/${name}`,
                headers: JSON.parse(localStorage.getItem('admin')),
                params: {name: name}
            })
        },

        fetchItem: (name) => {
            return axios({
                method: "GET",
                url: `${API_ROOT}api/v2/items/${name}`,
                headers: JSON.parse(localStorage.getItem('admin')),
                params: {name: name}
    
            })
        },
        
    }
}

export const store = () => {

    return {
        fetchItems: ()=> {
            return axios({
                method: "GET",
                url: `${API_ROOT}api/v2/store_items`,
                headers: JSON.parse(localStorage.getItem('admin')),
            })
        },

        fetchInventoryInfo: (store_name)=> {
            return axios({
                method: "GET",
                url: `${API_ROOT}api/v1/store_inventory_managers/${store_name}`,
                headers: JSON.parse(localStorage.getItem('admin')),
            })
        },

        restockItem: (name, quantity)=> {
            return axios({
                method: "POST",
                url: `${API_ROOT}api/v2/restocks`,
                headers: JSON.parse(localStorage.getItem('admin')),
                data: {
                    restock: {
                        item_name: name,
                        quantity: quantity
                    }
                }
            })

        },

        takeItemStock: (name, repaired_quantity) => {
            return axios({
                method: "POST",
                url: `${API_ROOT}api/v2/item_stock_repairs`,
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
                url: `${API_ROOT}api/v2/bad_items`,
                headers: JSON.parse(localStorage.getItem('admin')),
                data: {
                    name,
                    quantity,
                }
            })

        },

        getInfo: () => {
            return axios({
                method: "GET",
                url: `${API_ROOT}api/v1/stores/name`,
                headers: JSON.parse(localStorage.getItem('admin')),
            })
        },

        updateInfo: (data) => {
            return axios({
                method: "PUT",
                url: `${API_ROOT}api/v1/stores/name`,
                headers: JSON.parse(localStorage.getItem('admin')),
                data: {store: data}
            })

        }

       
    }
}