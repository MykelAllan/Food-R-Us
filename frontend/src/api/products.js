import axios from 'axios'

import { getBaseUrl } from './config'

const BASE_URL = getBaseUrl()
export const getAllProducts = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/api/products`);
        return res.data;
    } catch (err) {
        console.error('error fetching products')
        return []
    }
}

//gets the products that are discounted
export const getDiscountedProducts = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/api/products/discounted`);
        return res.data;
    } catch (err) {
        console.error('error fetching products')
        return []
    }
}

//gets the products by name
export const getProductsByName = async (productName) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/products/by-name`, {
            params: { name: productName }

        });
        return res.data;
    } catch (err) {
        console.error('error fetching products')
        return []
    }
}

//filter by price 
export const getProductsByPrice = async (minPrice, maxPrice) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/products`, {
            params: { minPrice, maxPrice }
        });
        return res.data;
    } catch (err) {
        console.error(`error fetching products by prices`)
        return []
    }
}

//filter by category only
export const getProductsByCateg = async (category) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/products`, {
            params: { category }
        });
        return res.data;
    } catch (err) {
        console.error(`error fetching products with categ ${category}`)
        return []
    }
}

//filter by categ and price
export const getProductsByCategAndPrice = async (category, minPrice, maxPrice) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/products`, {
            params: { category, minPrice, maxPrice }
        });
        return res.data;
    } catch (err) {
        console.error(`error fetching products by prices`)
        return []
    }
}

//admin stuff

//fetch paginated products list for admin dashboard
export const getPaginatedProducts = async (pageNo, user, password) => {
    try {
        const res = await axios.get(`${BASE_URL}/admin/products/lists/${pageNo}`, {
            auth: {
                username: user,
                password
            }
        });
        return res.data;
    } catch (err) {
        console.error(`error fetching products `)
        return []
    }
}

//creating new product
export const postNewProduct = async (product, user, password) => {
    try {
        await axios.post(`${BASE_URL}/admin/products/add`, product, {
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: user,
                password
            }
        });
        return true;
    } catch (err) {
        console.error(`error adding new products `)
        return false;
    }
}

//fetch product by id
export const getProductById = async (productId, user, password) => {
    try {
        const product = await axios.get(`${BASE_URL}/admin/products/${productId}`, {
            auth: {
                username: user,
                password
            }
        })
        return product.data;
    } catch (err) {
        console.log(err)
    }
}

//updates a product

export const updatesAProduct = async (productId, updatedProduct, user, password) => {
    try {
        await axios.put(`${BASE_URL}/admin/products/update/${productId}`, updatedProduct, {
            headers: {
                'Content-Type': 'application/json',
            },
            auth: {
                username: user,
                password
            }
        })

        return true

    } catch (err) {
        console.log('error updating the product')
        return false
    }
}

//deletes a product
export const deletesAProduct = async (productId, user, password) => {
    try {
        await axios.delete(`${BASE_URL}/admin/products/delete/${productId}`, {
            auth: {
                username: user,
                password
            }
        })
        return true

    } catch (err) {
        console.error(`error delete the product `)
        return false
    }
}