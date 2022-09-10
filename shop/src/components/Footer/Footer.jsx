import React from 'react'
import './Footer.css';
import './Footer-adaptive.css';

export const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-links">
            <div>
            <div className="about">
                <h3>About us</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi</p>
            </div>
            <div className="link-list">
            <h3>Useful links</h3>
            <ul>
                <li>Downloadable product</li>
                <li>On sale product</li>
                <li>Our new product</li>
                <li>Order tracking</li>
                <li>Payment methods</li>
            </ul>
        </div>
        </div>
        <div>
        <div className="link-list">
            <h3>Download</h3>
            <ul>
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Pinterest</li>
                <li>Youtube</li>
            </ul>
        </div>
        <div className="link-list">
            <h3>Call center</h3>
            <ul>
                <li>Monday to Friday: 9-20</li>
                <li>Saturday to Sunday: closed</li>
                <li>&nbsp;</li>
                <li>arredo@example.com</li>
                <li>+1 333 555</li>
            </ul>
        </div>
        </div>
        </div>
        
    </div>
  )
}
