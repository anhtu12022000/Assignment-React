import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_ORDER_SUCCESS, PRODUCT_FILTER_SUCCESS } from "constants/productConstants";
import { PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCCESS,PRODUCT_DETAIL_FAIL } from "constants/productConstants";
import { PRODUCT_SAVE_REQUEST,PRODUCT_SAVE_SUCCESS,PRODUCT_SAVE_FAIL, } from "constants/productConstants";
import { PRODUCT_CATE_REQUEST,PRODUCT_CATE_SUCCESS,PRODUCT_CATE_FAIL } from "constants/productConstants";
import { PRODUCT_CATE_FILTER } from "constants/productConstants";

import axios from 'axios';
import FormData from 'form-data';

const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const {data} = await axios.get("/api/products");
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
    
}

const orderProducts = (order) => (dispatch) => {
    dispatch({ type: PRODUCT_ORDER_SUCCESS, payload: order });
}

const filterProducts = (filter) => (dispatch) => {
    if (filter) {
        dispatch({ type: PRODUCT_FILTER_SUCCESS, payload: filter });
    } else {
        dispatch(listProducts());
    }
}

const detailProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST, payload: productId });
        const {data} = await axios.get("/api/products/"+productId);
        dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: PRODUCT_DETAIL_FAIL, payload: error.message});
    }
}

const saveProduct = (product,file,files,description,id) => async (dispatch, getState) => {
    console.log(files);
    var formData  = new FormData();
    for (const key of Object.keys(files.imgCollection)) {
        formData.append('images', files.imgCollection[key])
    }
    formData.append('image', file);
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('countinstock', product.countinstock);
    formData.append('description', description);
    formData.append('brand', product.brand);
    formData.append('title', product.title);
    formData.append('category', product.category);
    try {
        dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
        const {userSignin:{userInfo}} = getState();
        if (id) {
            const {data} = await axios.put("/api/products/"+id, formData, {headers: {
                'Authorization': 'Bearer '+ userInfo.token,
            }});
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        } else {
            const {data} = await axios.post("/api/products/", formData, {headers: {
                'Authorization': 'Bearer '+ userInfo.token,
            }});
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        }
        
    } catch (error) {
        dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message});
    }
}

const delProduct = (productId) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST, payload: productId });
        const {userSignin:{userInfo}} = getState();
        const {data} = await axios.delete("/api/products/"+productId, {headers: {
            'Authorization': 'Bearer '+ userInfo.token,
        }});
        console.log(data);
        dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: PRODUCT_DETAIL_FAIL, payload: error.message});
    }
}

const listCateProducts = (cate) => async (dispatch) => {
    dispatch({ type: PRODUCT_CATE_FILTER, payload: cate });
}

const loadCateProducts = (cate) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_CATE_REQUEST, payload: cate });
        const {data} = await axios.get("/api/products/?category="+cate);
        console.log(data);
        dispatch({ type: PRODUCT_CATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: PRODUCT_CATE_FAIL, payload: error.message});
    }
}

export { listProducts, listCateProducts, detailProduct, saveProduct, 
    delProduct, loadCateProducts, orderProducts, filterProducts };