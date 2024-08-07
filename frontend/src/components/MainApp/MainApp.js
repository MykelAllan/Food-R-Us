import React, { useContext } from 'react'
import '../../App.css';
import '../../styles/discount-price.css'
import '../../styles/responsive-styles.css'
import { BrowserRouter as Router, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { Login } from '../../pages/Auth/Login/login';
import { Register } from '../../pages/Auth/Register/register';
import { Cart } from '../../pages/cart/Cart';
import { Home } from '../../pages/home/Home';
import { Shop } from '../../pages/shop/Shop';
import { MyAccount } from '../Account/MyAccount';
import { Navbar } from '../Navbar/defaultNav';
import { LoggedInNavbar } from '../Navbar/loggedInNav';
import { Dashboard } from '../../pages/Admin/Dashboard/Dashboard';
import { NewProduct } from '../../pages/Admin/Products/CreateNewProduct/NewProduct';
import { UpdateProduct } from '../../pages/Admin/Products/UpdateProduct/UpdateProduct';
import { ProductContext } from '../../context/productContext';
import { toast } from 'react-toastify';
import { UpdateOrder } from '../../pages/Admin/Orders/UpdateOrder/UpdateOrder';

export const MainApp = () => {
    const { isLoggedIn } = useContext(AuthContext)
    const { } = useContext(ProductContext)
    const navigate = useNavigate()

    // search product handler
    const searchProductHandler = (productName) => {
        console.log('searching for ', productName)
        if (productName.trim() === '') {
            toast.error('Please enter a product', {
                autoClose: 4000
            })
        } else {
            console.log('navigating')
            navigate(`/shop/search/${productName}`)
        }
    }
    return (
        <div className="App">

            <Routes>
                <Route element={<WithNavbar searchProductHandler={searchProductHandler} isLoggedIn={isLoggedIn} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/shop/search/:productName" element={<Shop />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/myaccount" element={<MyAccount />} />
                </Route>
                {/* without navbar */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/add-product" element={<NewProduct />} />
                <Route path="/admin/update-product/:productId" element={<UpdateProduct />} />
                <Route path="/admin/update-order/:orderId" element={<UpdateOrder />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>

        </div>
    )
}

const PageNotFound = () => {
    return (
        <>
            <h1>Error 404 Page Not Found</h1>
        </>
    )

}

const WithNavbar = ({ isLoggedIn, searchProductHandler }) => (
    <>
        {isLoggedIn ? <LoggedInNavbar searchProductHandler={searchProductHandler} /> : <Navbar searchProductHandler={searchProductHandler} />}
        <Outlet />
    </>
);