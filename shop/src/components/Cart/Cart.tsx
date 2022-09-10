import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/index';
import {
  getCart,
  removeFromCart,
  addQty,
} from '../../redux/Cart/slice';
import './Cart.css';
import './Cart-adaptive.css'

export const Cart: React.FC = () => {
  const cart = useAppSelector ((state) => state.cart.cart);
  const dispatch = useAppDispatch();
  // const []
  useEffect(() => {
    dispatch(getCart());
  }, []);
  console.log(cart);
  const removeQtyFunc = (qty:any, qty_id:number ) => {
    console.log(qty_id);
    if ( qty_id >= 0 && qty_id <= 100){
    dispatch(addQty({
      id: qty.id, 
      img: qty.img, 
      price: qty.price, 
      title: qty.title,
      quantity: qty_id,
    }))
  }
  }
  return (
    <div>
      <div className="banner">
        <span>Cart</span>
      </div>
      <div  className="cart_items">
      <div>
      {
        cart.length == 0 ?
        <div className='cart-empty-section'>
          <span className='cart-empty-title'>Your cart is currently empty.</span>
          <Link to={`/`}><button className='cart-empty-btn'>Return to shop</button></Link>
        </div>
        :
        <>
        <tbody>
        <tr>
            <th className='empty-th-1'></th>
            <th className='empty-th-2'></th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
        </tr>
        {cart.map((cart_item:any) => (
            <tr key={cart_item.id}>
                <td onClick={() => dispatch(removeFromCart(cart_item.id))} className='td-1'>M</td>
                <td className='td-2'><img src={cart_item.img} className="cart_item_img"/></td>
                <td><span className='cart_item_title'>{cart_item.title}</span></td>
                <td><span className='cart_item_title'>{cart_item.price}&nbsp;$</span></td>
                <td>
                    <div className="counter">
                        <div className="qty-arrow" onClick={() => removeQtyFunc(cart_item, cart_item.quantity + Number(-1))}>4</div>
                        <input type='text' className='qty' onChange={(e) => removeQtyFunc(cart_item, Number(e.target.value))} value={cart_item.quantity}/>
                        <div className="qty-arrow" onClick={() => removeQtyFunc(cart_item, cart_item.quantity+ Number(1))}>5</div>
                    </div>
                </td>
                <td><span className='cart_item_title'>{Number(cart_item.price * cart_item.quantity)}&nbsp;$</span></td>
            </tr>
        ))}
        </tbody>
          <div className='total'>
          <span> Cart totals</span>
          <tbody className='total-table'>
            <tr>
              <th className='total-title'>Subtotal</th>
              <td className='total-price'>   
                {
                  cart.map((qty:any) => qty.quantity*qty.price).reduce((a:any , b:any) => a + b, 0)
                }
               &nbsp;$</td>
            </tr>
            <tr>
              <th className='total-title'>Total</th>
              <td className='total-price'><strong>
                {
                  cart.map((qty:any) => qty.quantity*qty.price).reduce((a:any , b:any) => a + b, 0)
                }
                &nbsp;$</strong></td>
            </tr>
          </tbody>
          <Link to={'/checkout'}><button className='cart-empty-btn check-out'>Proceed to checkout</button></Link>
        </div>
        </>
      }

        
        </div>
      </div>
    </div>
  )
}