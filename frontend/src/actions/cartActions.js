import { CART_ADD_ITEM, REMOVE_CART_ITEM, CART_SAVE_SHIPPING,CART_SAVE_PAYMENT } from "constants/cartConstants";
import { ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS, ORDER_SAVE_FAIL } from "constants/cartConstants";
import { ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL } from "constants/cartConstants";
import { ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_FAIL } from "constants/cartConstants";

import Cookie from "js-cookie";
import axios from "axios";
import FormData from 'form-data';

const addToCart = (productId, qty) => async (dispatch, getState) => {
    console.log(productId);
    console.log(qty);
    try {
        const {data} = await axios.get("/api/products/"+productId);
        dispatch({type: CART_ADD_ITEM, payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: qty,
        }});

        const { cart: {cartItems} } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {
            
    }
}

const removeFromCart = (productId) => async (dispatch, getState) => {
    try {
        dispatch({ type: REMOVE_CART_ITEM, payload: productId });
        const { cart: {cartItems} } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {
        
    }
}

const saveShipping = (data) => async (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data });
}

const savePayment = (data) => async (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });
}

const saveOrder = (name, totalPrice) => async (dispatch, getState) => {
    let {cart:{shipping}} = getState();
    let {cart:{payment}} = getState();

    var formData = new FormData();
    formData.append('name', name);
    formData.append('address', shipping.address); 
    formData.append('city', shipping.city);
    formData.append('postal', shipping.postal);
    formData.append('country', shipping.country);
    formData.append('cartItems', Cookie.get("cartItems"));
    formData.append('payment', payment);
    formData.append('totalPrice', totalPrice); 

    try {
        dispatch({ type: ORDER_SAVE_REQUEST });
        const {userSignin:{userInfo}} = getState();
        if (name) {
            const {data} = await axios.post("/api/order", formData, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
            dispatch({ type: ORDER_SAVE_SUCCESS, payload: data });
        }
    } catch (error) {
        dispatch({type: ORDER_SAVE_FAIL, payload: error.message});
    }
}

const listOrder = () => async (dispatch) => {
    try {
        dispatch({type: ORDER_LIST_REQUEST});
        const {data} = await axios.get("/api/order");
        dispatch({type: ORDER_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ORDER_LIST_FAIL, payload: error.message});
    }
}

const listOrderDetail = (id) => async (dispatch) => {
    try {
        dispatch({type: ORDER_DETAIL_REQUEST});
        const {data} = await axios.get(`/api/order/${id}`);
        dispatch({type: ORDER_DETAIL_SUCCESS, payload: JSON.parse(data.cartItems)});
    } catch (error) {
        dispatch({type: ORDER_DETAIL_FAIL, payload: error.message});
    }
}

export { addToCart,removeFromCart,saveShipping,savePayment,saveOrder,listOrder,listOrderDetail };