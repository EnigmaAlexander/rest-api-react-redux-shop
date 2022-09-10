import React, { useEffect, useState } from 'react';
import search from '../../assets/searching.png'
import { useAppSelector, useAppDispatch } from '../../hooks/index';
import {
  getProducts,
  getProductsFilter,
  getProductsCategoryFilter,
  searchBar,
  productTitle,
} from '../../redux/Products/slice';
import {
  addToCart,
  addQty,
} from '../../redux/Cart/slice';
import "./Products.css";
import "./Products-adaptive.css"
import { Link } from 'react-router-dom';
import sad from '../../assets/sad.png';

export const Products: React.FC = () => {
  const prods = useAppSelector((state) => state.products.products);
  const cart = useAppSelector ((state) => state.cart.cart);
  const [productSearch, setProductSearch] = useState('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const cartCheck = (prod:any) => {
    const id = Object.values(cart).map((el:any) => el.id);
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

  const filltered = (type: string) => {
    dispatch(getProductsFilter(type));
  }

  const categoryFilltered = (type: string) => {
    dispatch( getProductsCategoryFilter(type));
  }

  const searcher = (type:string) => {
    console.log(type)
    dispatch(searchBar(type))
  }
  return (
    <>
    <div className='products'>
      <div className="products-render">
      <div className="products-filter-nav">
        <ul className="products-filter-nav-categories">
          <li onClick={() => dispatch(getProducts())}>All</li>
          <li onClick={() => filltered('lamp')}>Lamps</li>
          <li onClick={() => filltered('white')}>White</li>
          <li onClick={() => filltered('wooden')}>Wooden</li>
          <li onClick={() => filltered('black')}>Black</li>
          <li onClick={() => filltered('chair')}>Cahirs</li>
        </ul>
        <span className='products-filter-title'>Showing {prods.length} results</span>
      </div>
      {
        prods.length == 0 
        ?
        <div className="items-notfound">
          <img src={sad}/>
          <h3>Sorry but we can't find this items</h3> 
        </div>
        :
        prods.map((prod:any) =>(
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
      <div className="products-filter">
        <div className="products-search">
          <input type="text" placeholder='Search...'className='products-search-area' onChange={(e) => setProductSearch(e.target.value)}/>
          <img  className='products-search-btn' onClick={() => searcher(productSearch)} src={search}/>
        </div>
        <div className="categories">
          <h5>Categories</h5>
          <ul>
            <li className='cat-item' onClick={()=> categoryFilltered('Decoration')}>Decoration</li>
            <li className='cat-item' onClick={()=> categoryFilltered('Ceiling')}>Ceiling </li>
            <li className='cat-item' onClick={()=> categoryFilltered('Floor')}>Floor</li>
            <li className='cat-item' onClick={()=> categoryFilltered('LED')}>LED </li>
            <li className='cat-item' onClick={()=> categoryFilltered('Furniture')}>Furniture</li>
            <li className='cat-item' onClick={()=> categoryFilltered('Grouped')}>Grouped </li>
            <li className='cat-item' onClick={()=> categoryFilltered('Lamps')}>Lamps </li>
            <li className='cat-item' onClick={()=> categoryFilltered('Black')}>Black</li>
            <li className='cat-item' onClick={()=> categoryFilltered('White ')}>Decorative </li>
            <li className='cat-item' onClick={()=> categoryFilltered('White')}>White</li>
            <li className='cat-item' onClick={()=> categoryFilltered('Wooden')}>Wooden</li>
            <li className='cat-item' onClick={()=> categoryFilltered('Lights')}>Lights</li>
            <li className='cat-item' onClick={()=> categoryFilltered('Modern')}>Modern</li>
            <li className='cat-item' onClick={()=> categoryFilltered('Retro')}>Retro</li>
          </ul>
        </div>
        <img src={`https://arredo.qodeinteractive.com/wp-content/uploads/2018/05/shop-sidebar-banner-300x206.jpg`}/>
      </div>
    </div>
    </>
  )
}
