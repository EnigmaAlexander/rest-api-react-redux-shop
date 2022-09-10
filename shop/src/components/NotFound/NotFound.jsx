import React from 'react'
import { Link } from 'react-router-dom';
import "./NotFound.css";

export const NotFound = () => {
  return (
    <div className='notFound'>
        <div className="notFound-title">
        <h1>404</h1>
        <h2>Page can not be found!</h2>
        <p>The page you are looking for does not exist. It may have been moved, or removed altogether. Perhaps you can return back to the site's homepage and see if you can find what you are looking for.</p>
        <Link to={'/'}><button className='cart-empty-btn check-out nf-btn'>Back to home</button></Link>
        </div>
    </div>
  )
}
