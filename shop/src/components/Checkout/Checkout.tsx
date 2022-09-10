import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/index';
import { Link } from 'react-router-dom';
import {
    removeFromCart,
  } from '../../redux/Cart/slice';
import "./Checkout.css";
import './Checkout-adaptive.css';

const useValidation = (value:any, validations:any) => {
    const [isEmpty, setEmpty] = useState(true)
    const [minLength, setMinLength] = useState(true)
    const [emailError, setEmailError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [inputValid, setInputValid] = useState(false)
    useEffect(()=>{
        for (const validtion in validations) {
            switch(validtion) {
                case 'minLength':
                    value.length < validations[validtion] ? setMinLength(true) : setMinLength(false)
                break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                break;
                case 'isEmail':
                    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                break;
                case 'isPhone':
                    const num = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
                    num.test(String(value).toLowerCase()) ? setPhoneError(false) : setPhoneError(true)
                break;
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || minLength || emailError || phoneError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty,minLength, emailError, phoneError])

    return{
        isEmpty,
        minLength,
        emailError,
        phoneError,
        inputValid
    }
}

const useInput = (initialValue:any , validations:any) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation (value, validations)
    const onChange = (e:any) => {
        setValue(e.target.value)
    }
    const onBlur = (e:any) => {
        setDirty(true)
    }
    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

export const Checkout: React.FC = () => {
    const cart = useAppSelector ((state) => state.cart.cart);
    const email = useInput('', {isEmpty: true, minLength:1, isEmail: true });
    const phone = useInput('', {isEmpty: true, minLength: 5, isPhone: true });
    const FirstName = useInput('', {isEmpty: true,  minLength: 1,});
    const LastName = useInput('', {isEmpty: true, minLength: 1});
    const street = useInput('', {isEmpty: true,minLength: 1});
    const appartments = useInput('', {isEmpty: true,minLength: 1});
    const town = useInput('', {isEmpty: true,minLength: 1});
    const zip = useInput('', {isEmpty: true,minLength: 1});
    const [cardSpace, setCardSpace] = useState('');
    const [cardMonth, setCardMonth] = useState('');
    const [cardYear, setCardYar] = useState('');
    const [cvv, setCvv] = useState('');
    const [finOrder, setFinOrder] = useState(false);
    const dispatch = useAppDispatch();
    const card = (number:any) => {
        // setCardSpace(number.replace(/(\d{4})(?!\s|$)/gm, `$1 `))
        if (number>=0)
        setCardSpace(number)
    }
    const month = (el:any) => {
        if (el <= 12)
        setCardMonth(el)
    }
    const year = (el:any) => {
        if (el >= 0 && el <= 99 )
        setCardYar(el)
    }
    const cvvInput = (el:any) => {
        if (el >= 0 && el <= 999 )
        setCvv(el)
    }
    const removeAll = () => {
        setFinOrder(false);
        cart.map((el:any) => dispatch(removeFromCart(el.id)))
    }
   return (
    <div className='checkout-section'>
        <div className="checkout-banner">
            <span>Checkout</span>
        </div>
        {
            finOrder
            ?
            <div className="ready-order">
                <div className="ready-order-info">
                    <div className="success"></div>
                    <h1>Your order created!</h1>
                    <span>Wait to be contacted for details</span>
                    <Link to={'/products'}><button onClick={() => removeAll()} className='cart-empty-btn check-out' >Continue shopping</button></Link>
                </div>
                <div className="gooey">
                <span className="dot"></span>
                <div className="dots">
                    <span className='dots-span'></span>
                    <span className='dots-span'></span>
                    <span className='dots-span'></span>
                </div>
                </div>
            </div>
            :
        <div className="wrapper">
        <div className="checkout-details">
            <ul>
                <h4>Billing details</h4>
                <li className='name-inputs'>
                    <div>
                        <div className="form-title">
                        <label>First Name *</label>
                        {(FirstName.isDirty && FirstName.isEmpty) && <p style={{color:"red"}}>First name is a required field.</p>}
                        </div>
                        <input type='text'  onChange={e => FirstName.onChange(e)} onBlur={e => FirstName.onBlur(e)} value={FirstName.value}/>
                    </div>
                    <div>
                    <div className="form-title">
                    <label>Last Name *</label>
                    {(LastName.isDirty && LastName.isEmpty) && <p style={{color:"red"}}>Last name is a required field.</p>}
                    </div>
                        <input type='text'  onChange={e => LastName.onChange(e)} onBlur={e => LastName.onBlur(e)} value={LastName.value}/>
                    </div>
                </li>
                <li>
                    <label>Country *</label>
                    <select className='country-select'>
                        <option value="arm">Armenia</option>
                        <option value="bru">Belarus</option>
                        <option value="ft">France</option>
                        <option value="gr">Germany</option>
                        <option value="ru">Russia</option>
                        <option value="uk">UK</option>
                        <option value="ukr">Ukraine</option>
                        <option value="us">USA</option>
                    </select>
                </li>
                <li>
                    <label>Street address *</label>
                    {(street.isDirty && street.isEmpty) && <p style={{color:"red"}}>Street address is a required field.</p>}
                    <input type='text' placeholder="House number and street name"  onChange={e => street.onChange(e)} onBlur={e => street.onBlur(e)} value={street.value}/>
                    {(appartments.isDirty && appartments.isEmpty) && <p style={{color:"red"}}>Appartment address is a required field.</p>}
                    <input type='text' placeholder="Apartment, suite, unit etc. (optional)"  onChange={e => appartments.onChange(e)} onBlur={e => appartments.onBlur(e)} value={appartments.value}/>
                </li>
                <li>
                {(town.isDirty && town.isEmpty) && <p style={{color:"red"}}>Town / City is a required field.</p>}
                    <label>Town / City *</label>
                    <input type='text'  onChange={e => town.onChange(e)} onBlur={e => town.onBlur(e)} value={town.value}/>
                </li>
                <li>
                {(zip.isDirty && zip.isEmpty) && <p style={{color:"red"}}>Postcode / ZIP is a required field.</p>}
                    <label>Postcode / ZIP *</label>
                    <input type='text' onChange={e => zip.onChange(e)} onBlur={e => zip.onBlur(e)} value={zip.value}/>
                </li>
                <li>
                    <label>Phone *</label>
                    {(phone.isDirty && phone.isEmpty) && <p style={{color:"red"}}>Phone is a required field.</p>}
                    {(phone.isDirty && phone.minLength) && <p style={{color:"red"}}>Field size must be about 11</p>}
                    {(phone.isDirty && phone.phoneError) && <p style={{color:"red"}}>Field must contain phone number</p>}
                    <input type='tel'onChange={e => phone.onChange(e)} onBlur={e => phone.onBlur(e)} value={phone.value}/>
                </li>
                <li>
                    {(email.isDirty && email.isEmpty) && <p style={{color:"red"}}>Email is a required field.</p>}
                    {(email.isDirty && email.emailError) && <p style={{color:"red"}}>Field must contain email</p>}
                    <label>Email address *</label>
                    <input type='email' onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} value={email.value}/>
                </li>
            </ul>
            <div className="additional-checkout-details">
                <h4>Additional information</h4>
                <label>Order notes (optional)</label>
                <textarea placeholder='Notes about your order, e.g. special notes for delivery.' />
                <div className="credit-card">
                    <label>Card number</label>
                    <input type="text" placeholder='**** **** **** ****' className='credit-card-number' value={cardSpace} maxLength={16} onChange={(e) => card(e.target.value) }/>
                    <div className="credit-card-data">
                    <div>
                        <label>Expiry Date</label>
                        <div>
                        <input type="text" placeholder='00' maxLength={2} value={cardMonth} onChange={(e) => month(e.target.value)} onBlur={e => phone.onBlur(e)} className='credit-card-name'/>
                        <span className='card-date-dash'>/</span>
                        <input type="text" placeholder='00' maxLength={2} value={cardYear} onChange={(e) => year(e.target.value)} className='credit-card-name'/>
                        </div> 
                    </div>   
                    <div>
                        <label>CVV/CVC</label>
                        <input type="text"  value={cvv} onChange={(e) => cvvInput(e.target.value)} placeholder='123' maxLength={3} className='credit-card-cvv'/>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        <div className='checkout'>
          <span> Cart totals</span>
          <tbody className='total-table'>
            <tr>
                <th>Product	</th>
                <th>Total</th>
            </tr>
            {
                cart.map((cart_item:any) => (
                <tr key={cart_item.id}>
                <td className='total-item'>{cart_item.title} <strong> × {cart_item.quantity}</strong></td>
                <td className='total-price'>{Number(cart_item.price * cart_item.quantity)}&nbsp;$</td>
                </tr>
                 )
            )}
            <tr>
              <th className='total-title'>Total</th>
              <td className='total-price'><strong>
                {
                  cart.map((qty:any) => qty.quantity*qty.price).reduce((a:any , b:any) => a + b, 0)
                }
                &nbsp;$</strong></td>
            </tr>
          </tbody>
          <button  
          disabled={
          !FirstName.inputValid || 
          !LastName.inputValid || 
          !street.inputValid || 
          !appartments.inputValid || 
          !town.inputValid || 
          !phone.inputValid || 
          !email.inputValid ||
          cardSpace.toString().length<16 || 
          cardMonth.length==0 || 
          cardYear.toString().length ==0 || 
          cvv.toString().length == 0
        
        } 
        onClick={e => setFinOrder(true)}
        className='cart-empty-btn check-out'>Place order</button>
        </div> 
        </div>  
        }
       
    </div>
  )
}
