import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch} from 'react-redux';
import { addToCart, removeFromCart } from 'actions/cartActions';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
    },
  },
}));

const CartScreen = (props) => {
    const classes = useStyles();
    const cart = useSelector(state => state.cart);

    const {cartItems} = cart;

    const productId = props.match.params.id;

    const qty = props.location.search? props.location.search.split("=")[1] : 1;

    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const {loading, error, userInfo} = userSignin;

    
    const handleOrderCart = () => {
        if (!userInfo) {
            props.history.push("/signin?redirect=shipping");
        } else {
            props.history.push("/shipping");
        }
    }

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
        return () => {
            
        }
    }, [])

    const removeFromCartHander = (productId) => {
        dispatch(removeFromCart(productId));
    }

    return (
        <div className="cart">
            <div className="cart-list">
            {loading && <div>Loading...</div>}
            {error && <div className={classes.root}>
                    <Alert severity="danger">Error 500! Please reload page</Alert>
                </div>
            }
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
                                        Quantity:
                                        <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))} >
                                        {[...Array(item.countInStock).keys()].map(x =>
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        )}
                                        </select>
                                        <button type="button" className="button" onClick={() => removeFromCartHander(item.product)}>
                                            Delete
                                        </button>
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
            <div className="cart-action">
                <h3>Subtotal ( {cartItems.reduce((a, b) => a + Number(b.qty),0)} items) : 
                    ${cartItems.reduce((a,b) => a +  b.price * b.qty,0)}
                </h3>
                <button className="button" onClick={handleOrderCart} disabled={cartItems.length === 0}>
                    Proceed to checkout
                </button>
            </div>
        </div>
    );
}

export default CartScreen;