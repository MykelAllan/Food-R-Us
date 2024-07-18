import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL

// const BASE_URL = process.env.REACT_APP_TEST_API_BASE_URL

export const getAllProducts = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/api/products/`);
        return res.data;
    } catch (err) {
        console.error('error fetching products')
    }
}

export const getProductsByCateg = async (category) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/products/${category.toLowerCase()}`);
        return res.data;
    } catch (err) {
        console.error(`error fetching products with categ ${category}`)
    }
}

//admin stuff

//creating new product
export const postNewProduct = async (product) => {
    try {
        const res = await axios.post(`${BASE_URL}/admin/products/add`, JSON.stringify(product), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (err) {
        console.error(`error adding new products `)
    }
}