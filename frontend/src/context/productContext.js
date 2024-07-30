import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
    getAllProducts,
    getPaginatedProducts, // for admin
    getProductsByCategAndPrice,
    getProductsByPrice,
    getProductsByCateg,
    getProductById, // for admin
    postNewProduct, // for admin
    updatesAProduct, // for admin
    deletesAProduct // for admin
}
    from '../api/products'
import { AuthContext } from './authContext'

export const ProductContext = createContext()

export const ProductsProvider = ({ children }) => {
    const { user, password } = useContext(AuthContext)
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('')
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 })
    const [isProdFetch, setIsProdFetch] = useState(false)
    const [paginatedProducts, setPaginatedProducts] = useState([])
    const [totalPaginatedPages, setTotalPaginatedPages] = useState(0)
    const [totalProductItems, setTotalProductItems] = useState(0)


    //product model
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: 0,
        discountPercentage: 0,
        discountedPrice: 0,
        imageUrl: ''
    });


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

    const filterHandler = async (category, minPrice, maxPrice) => {
        setIsProdFetch(true)
        let data;
        const min = minPrice ? minPrice : 0;
        const max = maxPrice ? maxPrice : 0;

        try {
            if (category !== null && minPrice !== null && maxPrice !== null) {
                data = await getProductsByCategAndPrice(category, minPrice, maxPrice)
                setProducts(data);
            } else if (category !== null) {
                data = await getProductsByCateg(category);
                setProducts(data);
            } else if (minPrice !== null && maxPrice !== null) {
                data = await getProductsByPrice(minPrice, maxPrice)
            }

            setProducts(data);
            setCategory(category)
            setPriceRange({ min: min, max: max })
        } catch (err) {
            console.error('Error fetching products:', err);
            setProducts([]);
        } finally {
            setIsProdFetch(false)
        }
    };

    //admin stuff
    const fetchPaginatedProducts = async (pageNo) => {
        setIsProdFetch(true)
        setTotalPaginatedPages(0)
        try {
            const data = await getPaginatedProducts(pageNo, user, password)
            setPaginatedProducts(data.content)
            setTotalPaginatedPages(data.totalPages)
            setTotalProductItems(data.totalElements)
        } catch (err) {
            console.error("Error fetching paginated products")
            setPaginatedProducts([])
        } finally {
            setIsProdFetch(false)
        }
    }

    //create new product
    const createNewProduct = async (newProduct) => {
        try {
            const isSucess = await postNewProduct(newProduct, user, password);
            if (isSucess) {
                toast.success("Sucessfully Created a New Product", {
                    autoClose: 4000
                })
                fetchProducts()
            }
        } catch (err) {
            console.error('Error saving new product', err);
            toast.error("Error createing a New Product")
            setProducts([]);
        }
    };

    //get product by id
    const productById = async (productId) => {
        try {
            const newProduct = await getProductById(productId, user, password);
            if (newProduct === null) {
                toast.error("Error Getting The Product")
            }
            setProduct(newProduct)
        } catch (err) {
            toast.error("Error Getting The Product")
            setProduct([])
        }
    }

    //update a product
    const saveProduct = async (productId, updatedProduct) => {
        try {
            const isSuccess = await updatesAProduct(productId, updatedProduct, user, password);
            if (isSuccess) {
                toast.success(`Successfully updated ${updatedProduct.name}`, {
                    autoClose: 4000
                })
                fetchProducts()
            } else {
                toast.error("Error updating the Product", {
                    autoClose: 4000
                })
            }
        } catch (err) {
            console.error('Error saving new product', err);
            toast.error("Error updating the Product")
        }
    }

    //delete a product
    const deleteAProduct = async (productId) => {
        try {
            const isSucess = await deletesAProduct(productId, user, password);
            if (isSucess) {
                toast.success("Sucessfully Deleted A Product", {
                    autoClose: 4000
                })
                fetchProducts()
            }
        } catch (err) {
            console.error('Error saving new product', err);
            toast.error("Error deleting a Product")
        }
    }



    const contextValue = {
        product,
        products,
        category,
        priceRange,
        paginatedProducts,
        totalPaginatedPages,
        totalProductItems,
        productById,
        setProduct,
        isProdFetch,
        fetchProducts,
        fetchPaginatedProducts,
        filterHandler,
        createNewProduct,
        saveProduct,
        deleteAProduct
    }

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    )
}
