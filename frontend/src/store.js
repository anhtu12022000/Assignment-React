import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer,productReducer,productSaveReducer, productCateReducer } from 'reducers/productReducers';
import { cartReducer, orderSaveReducer,orderListReducer,listOrderDetail } from 'reducers/cartReducers';
import { userSigninReducer, userRegisterReducer,userListReducer,userUpdateReducer,contactReducer,contactListReducer,contactDelMutilReducer } from 'reducers/userReducers';
import { cateListReducer,cateSaveReducer,delCate } from 'reducers/cateReducers';

import Cookie from "js-cookie";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = { cart: {cartItems, shipping: {}, payment: {}}, userSignin: {userInfo} };
const reducer = combineReducers({
    //products
    productList: productListReducer,
    productDetail: productReducer,
    productSave: productSaveReducer,
    productCate: productCateReducer,
    //users
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    //cart-order
    cart: cartReducer,
    orderSave: orderSaveReducer,
    orderList: orderListReducer,
    orderDetail: listOrderDetail,
    //category
    cateList: cateListReducer,
    categorySave: cateSaveReducer,
    cateDel: delCate,
    //contacts
    contactSave: contactReducer,
    contactList: contactListReducer,
    contactDel: contactDelMutilReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;