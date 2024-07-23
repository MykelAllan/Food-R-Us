import React, { useContext } from 'react'
import '../../App.css';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
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

export const MainApp = () => {
    const { isLoggedIn } = useContext(AuthContext)
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route element={<WithNavbar isLoggedIn={isLoggedIn} />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/myaccount" element={<MyAccount />} />
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/newproduct" element={<NewProduct />} />
                    </Route>

                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                </Routes>
            </Router>
        </div>
    )
}

const WithNavbar = ({ isLoggedIn }) => (
    <>
        {isLoggedIn ? <LoggedInNavbar /> : <Navbar />}
        <Outlet />
    </>
);