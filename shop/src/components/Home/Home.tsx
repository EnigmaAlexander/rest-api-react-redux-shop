import React, { useEffect, useState } from 'react';
import { CarouselBox } from '../Carousel/CarouselBox';
import { useAppSelector, useAppDispatch } from '../../hooks/index';
import { Link } from 'react-router-dom';
import {
    getProducts,
    productTitle,
  } from '../../redux/Products/slice';
  import {
    addToCart,
  } from '../../redux/Cart/slice';
import './Home.css'
import './Home-adaptive.css';

export const Home = () => {
const prods = useAppSelector((state) => state.products.products);
const cart = useAppSelector ((state) => state.cart.cart);
const dispatch = useAppDispatch();
const cartCheck = (prod:any) => {
    const id = cart.map((el:any) => el.id); 
    id.includes(prod.id) ? 
     console.log() :
    dispatch(addToCart({
      id: prod.id, 
      img: prod.img, 
      price: prod.price, 
      title: prod.title,
      quantity: prod.quantity,
      }
      ))
  }
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div>
        <div className="slider">
            <CarouselBox/>
        </div>
        <div className="homepgae-products">
            <h2>Products of the week</h2>
            <span>Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo consequat. Duis aute irure dolor in reprehenderit.</span>
           <div className='homepgae-products-render'>
           {
            Object.values(prods).splice(0,3).map((prod:any) =>(
                <div className="product-card" key={prod.id}>
                <div className="img-container">
                  {
                    Object.values(cart).map((el:any) => el.id).includes(prod.id) 
                    ?
                      <Link  to={`/cart`} className="already-in-cart-btn">
                        <div className="add-btn">View in cart</div>
                      </Link >
                    :
                    <div className="add-to-cart-btn" onClick={() => cartCheck(prod)}>
                   <div className="add-btn">Add to cart</div>
                   <div className='plus'> + </div>
                 </div>
                  }
                <Link  onClick={() => dispatch(productTitle(prod))} to={`/products/${prod.title}`}>
                <img src={prod.img} className="product-img"/>
                </Link>
                </div>
                <span className='product-title'>{prod.title}</span>
                <span className='product-price'>{prod.price}&nbsp;$</span>
              </div>
            ))}
           </div>
        </div>
        <div className="parallax-box">
            <div className="parallax-section-1">
                <div className="parallax-text-box">
                <h2>Stylish chairs</h2>
                <span>
                    Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco ommodo consequat. Duis aute irure.
                </span>
                <button className='slider-btn order'>View more &nbsp;<span className='qty-arrow slider-arrow order-arrow'>5</span></button>
                </div>
                <div className="parallax-bg-1" >
                    <div className="parallax-items">
                        <div className="parallax-item-1" ></div>
                        <div className="parallax-item-2" ></div>
                    </div>
                    <div className="parallax-item-bg-1" ></div>   
                </div>
            </div>

            <div className="parallax-section-2">           
                <div className="parallax-bg-1" >
                    <div className="parallax-items">
                        <div className="parallax-item-3" ></div>
                        <div className="parallax-item-4" ></div>
                    </div>
                    <div className="parallax-item-bg-1" ></div>   
                </div>
                <div className="parallax-text-box">
                <h2>Contemporary lamps</h2>
                <span>
                    Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco ommodo consequat. Duis aute irure.
                </span>
                <button className='slider-btn order'>View more &nbsp;<span className='qty-arrow slider-arrow order-arrow'>5</span></button>
                </div>
            </div>

            <div className="parallax-section-3">
              <div className="parallax-text-box">
                <h2>Stylish tea set</h2>
                <span>
                    Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco ommodo consequat. Duis aute irure.
                </span>
                <button className='slider-btn order'>View more &nbsp;<span className='qty-arrow slider-arrow order-arrow'>5</span></button>
                </div>
                <div className="parallax-bg-1" >
                    <div className="parallax-items">
                        <div className="parallax-item-5" ></div>
                        <div className="parallax-item-6" ></div>
                    </div>
                    <div className="parallax-item-bg-1" ></div>   
                </div>
            </div>
   
        </div>
        <div className="order-banner-container">
        <div className="order-now-banner">
            <span>Order now for an express delivery in 24h!</span>
            <button className='slider-btn order'>Order now &nbsp;<span className='qty-arrow slider-arrow order-arrow'>5</span></button>
        </div>
        </div>  
        {/* <div className="methods-section">
                <div className="method">
                    <div className="method-title">
                    <img src={cartImg} className="method-img"/>
                    <h2>Shop online</h2>
                    </div>
                    <span>Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo consequat.</span>
                </div>
                <div className="method">
                    <div className="method-title">
                    <img src={coinImg} className="method-img"/>
                    <h2>Free shipping</h2>
                    </div>
                    <span>Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo consequat.</span>
                </div>
                <div className="method">
                    <div className="method-title">
                    <img src={timeImg} className="method-img"/>
                    <h2>Return policy</h2>
                    </div>
                    <span>Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo consequat.</span>
                </div>
                <div className="method">
                    <div className="method-title">
                    <img src={creditCard} className="method-img"/>
                    <h2>Payment methods</h2>
                    </div>
                    <span>Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo consequat.</span>
                </div>


        </div>    */}
    </div>
  )
}

