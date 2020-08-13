import { CART_ADD_ITEM,REMOVE_CART_ITEM,CART_SAVE_SHIPPING,CART_SAVE_PAYMENT } from "../constants/cartConstants";
import { ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS, ORDER_SAVE_FAIL } from "constants/cartConstants";
import { ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL } from "constants/cartConstants";
import { ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_FAIL } from "constants/cartConstants";

function cartReducer(state = {cartItems: [], shiping: {}, payment: {}}, action) {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x.product === item.product);
            if (product) {
                return { cartItems: state.cartItems.map(x => x.product === product.product && x.qty < item.qty? item : x)};
            }
            return { cartItems: [...state.cartItems, item]};
        case REMOVE_CART_ITEM:
            return { cartItems: state.cartItems.filter(x => x.product !== action.payload)};  
        case CART_SAVE_SHIPPING:
            return { ...state, shipping: action.payload };
        case CART_SAVE_PAYMENT:
            return { ...state, payment: action.payload };  
        default:
            return state; 
    }
}       

function orderSaveReducer (state = {order: {}}, action) {
    switch (action.type) {
        case ORDER_SAVE_REQUEST:
            return {loading: true};
        case ORDER_SAVE_SUCCESS:
            return {
                success: action.payload.msg,
                loading: false,
                order: action.payload
            };
        case ORDER_SAVE_FAIL:
            return {loading: false, error: action.payload};   
        default:
            return state; 
    }
}

function orderListReducer (state = {orders: []}, action) {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {loading: true, orders: []};
        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            };
        case ORDER_LIST_FAIL:
            return {loading: false, error: action.payload};   
        default:
            return state; 
    }
}

function listOrderDetail (state = {order: []}, action) {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return {loading: true, order: []};
        case ORDER_DETAIL_SUCCESS:
            console.log(action.payload);
            return {
                loading: false,
                order: action.payload
            };
        case ORDER_DETAIL_FAIL:
            return {loading: false, error: action.payload};   
        default:
            return state; 
    }
}

export { cartReducer, orderSaveReducer, orderListReducer,listOrderDetail };