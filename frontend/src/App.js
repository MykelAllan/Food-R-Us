import './App.css';


import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Home } from './pages/home/Home';
import { Shop } from "./pages/shop/Shop";
import { Cart } from "./pages/cart/Cart";
import { Login } from "./pages/Auth/Login/login";
import { Register } from "./pages/Auth/Register/register";
import { NewProduct } from './pages/Admin/CreateNewProduct/NewProduct';

import { AuthProvider } from './context/authContext'
import { ProductsProvider } from './context/productContext'
import { CartProvider } from './context/cartContext';

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <div className="App">
            <Router>
              <Routes>
                <Route element={<WithNavbar />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/newproduct" element={<NewProduct />} />
                </Route>

                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
              </Routes>
            </Router>
          </div>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>

  );
}

const WithNavbar = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default App;
