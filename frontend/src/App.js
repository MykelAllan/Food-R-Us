
import React, { useContext } from 'react';

import { AuthProvider } from './context/authContext'
import { ProductsProvider } from './context/productContext'
import { CartProvider } from './context/cartContext';
import { MainApp } from './components/MainApp/MainApp';

function App() {

  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
         <MainApp />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>

  );
}



export default App;
