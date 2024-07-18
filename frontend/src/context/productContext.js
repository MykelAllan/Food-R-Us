import React, { createContext, useEffect, useState } from 'react'

import { getAllProducts, getProductsByCateg, postNewProduct } from '../api/products'

export const ProductContext = createContext()

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('')
    const [message, setMessage] = useState('') //msg for creating products
    const [isProdFetch, setIsProdFetch] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchProducts()
    }, [])

    //products
    const fetchProducts = async () => {
        setIsProdFetch(true)
        try {
            const data = await getAllProducts();
            setProducts(data);
            setCategory("")
        } catch (err) {
            console.error('Error fetching products:', err);
            setProducts([]);
        } finally {
            setIsProdFetch(false)
        }
    };

    const filterHandler = async (category) => {
        setIsProdFetch(true)
        try {
            const data = await getProductsByCateg(category);
            setProducts(data);
            setCategory(category)
        } catch (err) {
            console.error('Error fetching products:', err);
            setProducts([]);
        } finally {
            setIsProdFetch(false)
        }
    };
    const createNewProduct = async (newProduct) => {
        setIsLoading(true)
        setMessage(null)
        try {
            const data = await postNewProduct(newProduct);
            setProducts([...products, data])
            setMessage(`${newProduct.name} is successfully saved`)

        } catch (err) {
            console.error('Error saving new product', err);
            setProducts([]);
        } finally {
            setIsLoading(false)
        }
    };


    const contextValue = {
        products, message, isLoading, category,
        isProdFetch, fetchProducts, filterHandler, createNewProduct,
    }

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    )
}
