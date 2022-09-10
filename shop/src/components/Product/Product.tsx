import React, { useEffect, useState } from 'react';
import { addToCart } from '../../redux/Cart/slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './Product-adaptive.css';
import './Product.css';
import { addToWishlist, getWishlist } from '../../redux/Wishlist/slice';
import wishlistLogo from '../../assets/wishlist.png'
import { Link } from 'react-router-dom';

type IProduct = {
  product:any;
}
export const Product:React.FC<IProduct> = ({product}) => {
  const wishlist = useAppSelector((state)=> state.wishlist.wishlist)
  const cart = useAppSelector ((state) => state.cart.cart);
  const dispatch = useAppDispatch();
  const [productQty, setProductQty] = useState(1)
  const cartCheck = (product:any, productQty:number) => {
    const id = cart.map((el:any) => el.id); 
    id.includes(product.id) ? 
     console.log() :
    dispatch(addToCart({
      id: product.id, 
      img: product.img, 
      price: product.price, 
      title: product.title,
      stock_status: product.stock_status,
      quantity: productQty,
      }
      ))
  }
  useEffect(() => {
    dispatch(getWishlist())
  }, [])
  
  return (
    <>
    <div className='product-page-container'>
      <div className="img-page-container">
       <img className='img-page-container-img' src={product.img}/> 
      </div>
      <div className="product-page-info">
        <h2>{product.title}</h2>
        <div className='product-page-rating'></div>
        <span className='product-page-price'>${product.price}</span>
        <p className='product-page-description'>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo consequat. 
        Duis aute irure dolor in reprehenderit dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident.
        </p>
        <div className="add-to-cart">
        <div className="counter product-counter">
          <div className="qty-arrow" onClick={() => productQty === 1 ? setProductQty(Number(productQty + 0)) : setProductQty(Number(productQty + (-1)))}>4</div>
            <input type='text' className='qty'value={productQty}/>
          <div className="qty-arrow" onClick={() => setProductQty(Number(productQty + 1))}>5</div>
          </div>
          <button className='add-product-btn' onClick={() => cartCheck(product, productQty)}>Add To Cart </button>
        </div>
        {
            Object.values(wishlist).map((el:any) => el.id).includes(product.id)   
            ? 
            <Link to={"/wishlist"} className="add-to-wishlist" >
              <span>Product added! <strong> Browse Wishlist</strong></span>
            </Link>
            :
            <div className="add-to-wishlist" onClick={()=>  dispatch(addToWishlist(product)) }>
            <img src={wishlistLogo} className="wishlistLogo"/>
            <span>Add to Wishlist</span>
      </div>
          
        }
       
        <div className="product-category-info">
          <p>Category:{product.category}</p>
          <p>Type: {product.type}</p>
          <p>Stock Status: {product.stock_status}</p>
        </div>
      </div>
    </div>
    </>
  )
}
