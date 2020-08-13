import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from "components/Checkout/CheckoutSteps";
import { saveOrder } from 'actions/cartActions';

const PlaceOrderScreen = (props) => {

    const cart = useSelector(state => state.cart);

    const {cartItems, shipping, payment} = cart;

    const orderSave = useSelector(state => state.orderSave);
    const {loading: loadingSave, success: successSave, error: errorSave} = orderSave;
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const {loading, error, userInfo} = userSignin;

    const itemsPrice = cartItems.reduce((a,c) => a + c.price*c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const [toggleOn, setToggleOn] = useState(true);
    const handlePlaceOrder = (name, total) => {
        setToggleOn(false);
        dispatch(saveOrder(name, total));
    }

    const handleOrderCart = () => {
        if (!userInfo) {
            props.history.push("/signin?redirect=shipping");
        }
    }

    useEffect(() => {
        console.log(cart);
        if (shipping.address == "") {
            props.history.push("/shipping");
        } else if (payment.paymentMethod == "") {
            props.history.push("/payment");
        }
        return () => {
            
        }
    }, [])

    return (
        <div>
        {   loadingSave && <div>Loading...</div> }
        {   errorSave && <div><p className="center">{errorSave}</p></div>}
        {   successSave && <div><p className="center">{successSave}</p></div>}
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="placeorder">
            <div className="placeorder-info">
                <div>
                    <h3>Shipping</h3>
                    <div>
                        {shipping.address}, {shipping.city}
                        {shipping.postalCode}, {shipping.country}
                    </div>
                </div>
                <div>
                    <h3>Payment Method</h3>
                    <div>
                        {payment}
                    </div>
                </div>
                <div>
                <ul className="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    {
                        cartItems.length === 0 ? <div>Cart empty</div> : 
                        cartItems.map(item => 
                        <li key={item.product}>
                        <div className="cart-image"><img src={`/images/${item.image}`} alt={item.name} /></div>
                            <div> 
                                <div className="cart-name">
                                    <div><Link to={"/product/"+item.product}>{item.name}</Link></div>
                                    <div>
                                        Quantity: {item.qty}
                                    </div>
                                </div> 
                                <div className="cart-price">
                                    ${item.price}
                                </div>
                            </div>
                        </li>    
                        )
                    }
                </ul>
                </div>
                
            </div>
            <div className="placeorder-action">
                <ul>
                    <li><h3>Order Summary</h3></li>
                    <li>
                        <div>Items</div>
                        <div>${itemsPrice}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>${shippingPrice}</div>
                    </li>
                    <li>
                        <div>Tax</div>
                        <div>${taxPrice}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div>${totalPrice}</div>
                    </li>
                </ul>
                {toggleOn && <button type="button" className="center button" onClick={() => handlePlaceOrder(userInfo.name,totalPrice)}>Place Order</button>}
            </div>
        </div>
        </div>
    );
}

export default PlaceOrderScreen;