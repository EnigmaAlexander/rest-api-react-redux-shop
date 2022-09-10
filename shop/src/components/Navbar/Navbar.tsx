import React, {useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import search from '../../assets/searching.png';
import cartIcon from '../../assets/bag.png'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCart } from '../../redux/Cart/slice';
import './Navbar.css'


export const Navbar: React.FC = () => {
  // const [burgerActive, setBurgerActive] = useState(false);
  const cart = useAppSelector ((state) => state.cart.cart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, [])
  
  return (
    <div className='navbar'>
     <Link to={"./"}><img src={logo} className='logo'/></Link> 
      <div className="navigation-block">
        <div className="navigation-links">
        <Link to={`/`} className='nav-link' >Home</Link>
        <Link to={`/products`} className='nav-link'>Products</Link>
        <Link to={`/wishlist`} className='nav-link'>Wishlist</Link>
        </div>
          <div>
            {
              cart.length == 0 
              ? 
            <div></div>
            :
            <div className='cart-amount'>
                { 
                Object.values(cart).map((qty:any) => qty.quantity).reduce((a:number , b:number) => a + b, 0)
                }           
            </div>
            }
            <Link to={`/cart`}>
              <img src={cartIcon} className='cart'/>
            </Link>
          </div>
          {/* <div className="cart_hover">
            {Object.values(cart).map((cart_item: any) => 
            (<div className='cart_hover_item' key={cart_item.id}>
              <img src={cart_item.img} className='cart_hover_item_img' />
              <div className="cart_hover_item_info">
                <span>{cart_item.title}</span>
                <p>{cart_item.quantity} x ${cart_item.price}</p>
              </div>
            </div>)
            )}
            <button className='cart_hover_item_btn'> View Cart</button>
            <button className='cart_hover_item_btn_checkout'> Checkout</button>
          </div> */}
      </div>
    </div>
  )
}
