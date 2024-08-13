import React, { useContext, useEffect } from 'react'
import '../../App.css';
import '../../styles/discount-price.css'

import { Route, Routes, Outlet, useNavigate, useLocation } from 'react-router-dom';
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
import { toast } from 'react-toastify';
import { UpdateOrder } from '../../pages/Admin/Orders/UpdateOrder/UpdateOrder';
import { Footer } from '../Footer/footer';

export const MainApp = () => {
    const { isLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()


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
    // scroll to the collection section
    const scrollToCollection = () => {
        const collectionSection = document.getElementById('collection');
        if (collectionSection) {
            collectionSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const footer = document.getElementById('footer')
        if (location.hash === '#collection') {
            scrollToCollection();
        }
        //only activates if on mobile
        if (footer) {
            if (location.pathname === '/cart') {
                footer.classList.add('active')
                console.log('at cart')
            } else {
                footer.classList.remove('active')
            }
        }

    }, [location]);


    return (
        <div className="App">
            <Routes>
                <Route element={<WithNavbar searchProductHandler={searchProductHandler} isLoggedIn={isLoggedIn} scrollToCollection={scrollToCollection} />}>
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
                <Route path="/*" element={<PageNotFound navigate={navigate} />} />
            </Routes>

        </div>
    )
}

const PageNotFound = ({ navigate }) => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f8f9fa',
            color: '#343a40',
            textAlign: 'center',
            padding: '20px',
        },
        heading: {
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '20px',
        },
        button: {
            padding: '10px 20px',
            fontSize: '1rem',
            color: '#ffffff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Error 404: Page Not Found</h1>
            <button
                style={styles.button}
                onClick={() => navigate(-1)}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
            >
                Go Back
            </button>
        </div>
    );
};

const WithNavbar = ({ isLoggedIn, searchProductHandler, scrollToCollection }) => (
    <>
        {isLoggedIn ? <LoggedInNavbar data={{ searchProductHandler, scrollToCollection }} /> : <Navbar data={{ searchProductHandler, scrollToCollection }} />}
        <Outlet />
        <Footer />
    </>
);