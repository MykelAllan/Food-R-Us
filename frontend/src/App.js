import React from 'react';

import { AuthProvider } from './context/authContext'
import { ProductsProvider } from './context/productContext'
import { CartProvider } from './context/cartContext';
import { MainApp } from './components/MainApp/MainApp';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <MainApp />
          <ToastContainer
            theme="colored"
            position="bottom-center"
            autoClose={1000}
            limit={3}
            closeOnClick
          />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>

  );
}

export default App;
