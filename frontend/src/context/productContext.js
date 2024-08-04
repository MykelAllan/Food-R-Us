import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
    getAllProducts,
    getProductsByName,
    getDiscountedProducts,
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
    const [discountedProds, setDiscountedProds] = useState([])
    const [category, setCategory] = useState('')
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 })
    const [isProdFetch, setIsProdFetch] = useState(false)
    const [paginatedProducts, setPaginatedProducts] = useState([])
    const [totalPaginatedPages, setTotalPaginatedPages] = useState(0)
    const [totalProductItems, setTotalProductItems] = useState(0)

    const [isLoaded, setLoaded] = useState(false)


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

    //fetch all products
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
    //fetch all products that are discounted
    const fetchDiscountedProducts = async () => {
        const toastMessage = `Loading more content...\n(Might take 1min to load)`;
        let loadingContent;
        if (!isLoaded) {
            loadingContent = toast.loading(toastMessage, {
                style: { whiteSpace: 'pre-wrap' }
            });
        }
        setIsProdFetch(true)
        try {
            const data = await getDiscountedProducts();
            if (!isLoaded) {
                setLoaded(true)
                toast.update(loadingContent, {
                    render: 'Done',
                    type: 'success',
                    isLoading: false,
                    autoClose: 1000,
                });
            }

            setDiscountedProds(data)
        } catch (err) {
            console.error('Error fetching products:', err);
            setDiscountedProds([]);
            toast.update(loadingContent, {
                render: 'Error fetching products',
                type: 'error',
                isLoading: false,
                autoClose: 2000,
            });
        } finally {
            setIsProdFetch(false)
        }
    };

    //fetch products by name
    const fetchProductsByName = async (productName) => {
        setIsProdFetch(true)
        try {
            const data = await getProductsByName(productName);
            setProducts(data);
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
        product, //product model for creating new products
        discountedProds,
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
        fetchProductsByName,
        fetchDiscountedProducts,
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
