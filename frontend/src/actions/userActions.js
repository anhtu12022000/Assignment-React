import axios from "axios";
import { USER_SIGNIN_REQUEST,USER_SIGNIN_SUCCESS,USER_SIGNIN_FAIL } from "../constants/userConstants";
import { USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL } from "../constants/userConstants";
import { USER_LIST_REQUEST,USER_LIST_SUCCESS,USER_LIST_FAIL } from "constants/userConstants";
import { USER_CONTACT_REQUEST,USER_CONTACT_SUCCESS,USER_CONTACT_FAIL } from "constants/userConstants";
import { LIST_CONTACT_REQUEST,LIST_CONTACT_SUCCESS,LIST_CONTACT_FAIL } from "constants/userConstants";
import { DELMUTIL_CONTACT_REQUEST,DELMUTIL_CONTACT_SUCCESS,DELMUTIL_CONTACT_FAIL } from "constants/userConstants";
import { USER_UPDATE_REQUEST,USER_UPDATE_SUCCESS,USER_UPDATE_FAIL } from "constants/userConstants";


import Cookie from "js-cookie";

const signin = (email, password) => async (dispatch) =>{
    dispatch( {type: USER_SIGNIN_REQUEST, payload: {email, password}} );
    try {
        const {data} = await axios.post("/api/users/signin", {email, password});
        dispatch( {type: USER_SIGNIN_SUCCESS, payload: data} );
        Cookie.set("userInfo", JSON.stringify(data));
    } catch (error) {
        
        dispatch( {type: USER_SIGNIN_FAIL, payload: error.message} );
    }
}

const registerUser = (name, email, password) => async (dispatch) =>{
    dispatch( {type: USER_REGISTER_REQUEST, payload: {name, email, password}} );
    try {
        const {data} = await axios.post("/api/users/register", {name, email, password});
        dispatch( {type: USER_REGISTER_SUCCESS, payload: data} );
        Cookie.set("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch( {type: USER_REGISTER_FAIL, payload: error.message} );
    }
}

const listUsers = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });
            const {data} = await axios.get("/api/users");
            console.log(data);
            dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: USER_LIST_FAIL, payload: error.message});
    }
    
}

const saveContact = (name, email, subject, context) => async (dispatch) => {
    try {
        dispatch({type: USER_CONTACT_REQUEST});
        const {data} = await axios.post("/api/contact", {name, email, subject, context});
        dispatch({type: USER_CONTACT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: USER_CONTACT_FAIL, payload: error.message});
    }
}

const listContact = () => async (dispatch) => {
    try {
        dispatch({type: LIST_CONTACT_REQUEST});
        const {data} = await axios.get("/api/contact");
        dispatch({type: LIST_CONTACT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: LIST_CONTACT_FAIL, payload: error.message});
    }
}

const delMutil = (selected) => async (dispatch) => {
    try {
        dispatch({type: DELMUTIL_CONTACT_REQUEST});
        const {data} = await axios.post("/api/contact/delmutil", selected);
        dispatch({type: DELMUTIL_CONTACT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: DELMUTIL_CONTACT_FAIL, payload: error.message});
    }
}

const changeAdmin = (id) => async (dispatch,getState) => {
    dispatch( {type: USER_UPDATE_REQUEST} );
    try {
        const {userSignin:{userInfo}} = getState();
        const {data} = await axios.patch("/api/users/"+id, {id}, {headers: {
            'Authorization': 'Bearer '+ userInfo.token,
        }});
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch( {type: USER_UPDATE_FAIL, payload: error.message} );
    }
}

export { signin, registerUser, listUsers, saveContact, listContact, delMutil, changeAdmin };