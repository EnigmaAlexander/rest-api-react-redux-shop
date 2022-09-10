import React from 'react';
import { Route, Routes} from 'react-router-dom';
import './App.css';
import { Cart } from './components/Cart/Cart';
import { Navbar } from './components/Navbar/Navbar';
import { Products } from './components/Products/Products';
import { Product } from './components/Product/Product';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import { useAppSelector, useAppDispatch } from './hooks/index';
import { Wishlist } from './components/Wishlist/Wishlist';
import { Checkout } from './components/Checkout/Checkout';
import { NotFound } from './components/NotFound/NotFound';


export const App: React.FC = () => {
  const product = useAppSelector ((state) => state.products.product);
  
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path={`/products/${product.title}`} element={<Product product={product}/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

