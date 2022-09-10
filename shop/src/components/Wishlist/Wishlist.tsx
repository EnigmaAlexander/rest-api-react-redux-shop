import React, {useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/index';
import { Link } from 'react-router-dom';
import './Wishlist.css';
import { getWishlist, removeFromWishlist } from '../../redux/Wishlist/slice';
import { addToCart, addQty } from '../../redux/Cart/slice';

export const Wishlist: React.FC = () => {
    const cart = useAppSelector ((state) => state.cart.cart);
    const wishlist = useAppSelector ((state) => state.wishlist.wishlist);
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(getWishlist());
    }, []);
    console.log(wishlist);

    const cartCheck = (prod:any) => {
     
      const id = cart.map((el:any) => el.id); 
      id.includes(prod.id) 
      ? 
      console.log()
      :
      dispatch(addToCart({
        id: prod.id, 
        img: prod.img, 
        price: prod.price, 
        title: prod.title,
        stock_status: prod.stock_status,
        quantity: prod.quantity,
        }
        ))
    }

  return (
    <div>
        <div className="wishlist-banner">
        <span>Wish list</span>
      </div>
      <div  className="cart_items">
      <div>
      {
       wishlist.length == 0 ?
        <div className='cart-empty-section'>
          <span className='cart-empty-title'>Your Wishlist is currently empty.</span>
          <Link to={`/`}><button className='cart-empty-btn'>Return to shop</button></Link>
        </div>
        :
        <>
        <tbody>
        <tr>
            <th className='empty-th-1'></th>
            <th className='empty-th-2'></th>
            <th>Product</th>
            <th>Unit Price</th>
            <th>Stock Status</th>
            <th></th>
        </tr>
        {wishlist.map((wishlist_item:any) => (
            <tr key={wishlist_item.id}>
                <td onClick={() => dispatch(removeFromWishlist(wishlist_item.id))} className='td-1'>M</td>
                <td className='td-2'><img src={wishlist_item.img} className="cart_item_img"/></td>
                <td><span className='cart_item_title'>{wishlist_item.title}</span></td>
                <td><span className='cart_item_title'>{wishlist_item.price}&nbsp;$</span></td>
                <td><span className='cart_item_title'>{wishlist_item.stock_status}</span></td>
                <td>
                  {
                    Object.values(cart).map((el:any) => el.id).includes(wishlist_item.id) 
                    ?
                    <Link  to={`/cart`}  className='cart-empty-btn wishlist-add-to-cart-btn'>View in cart</Link>
                    :
                    <button className='cart-empty-btn wishlist-add-to-cart-btn' onClick={() =>  cartCheck(wishlist_item)}>Add to cart</button>
                  }
                
                 
                </td>
            </tr>
        ))}
        </tbody>
        </>
        }
        </div>
        </div>
        </div>
  )
}
