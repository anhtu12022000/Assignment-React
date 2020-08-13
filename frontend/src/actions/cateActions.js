import { CATE_LIST_REQUEST, CATE_LIST_FAIL, CATE_LIST_SUCCESS } from "constants/cateConstants";
import { CATE_SAVE_REQUEST, CATE_SAVE_FAIL, CATE_SAVE_SUCCESS } from "constants/cateConstants";
import { CATE_DEL_REQUEST, CATE_DEL_FAIL, CATE_DEL_SUCCESS } from "constants/cateConstants";

import axios from 'axios';

const listCategory = () => async (dispatch) => {
    try {
        dispatch({type: CATE_LIST_REQUEST});
        const {data} = await axios.get("/api/category");
        console.log(data)
        dispatch({type: CATE_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CATE_LIST_FAIL, payload: error.message});
    }
}

const saveCate = (name, description, id) => async (dispatch) =>{

    dispatch( {type: CATE_SAVE_REQUEST, payload: {name, description}} );
    try {
        const {data} = await axios.post("/api/category/", {name, description});
        dispatch( {type: CATE_SAVE_SUCCESS, payload: data} );
    } catch (error) {
        dispatch( {type: CATE_SAVE_FAIL, payload: error.message} );
    }
}

const delCate = (cateId) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATE_DEL_REQUEST, payload: cateId });
        const {userSignin:{userInfo}} = getState();
        const {data} = await axios.delete("/api/category/"+cateId, {headers: {
            'Authorization': 'Bearer '+ userInfo.token,
        }});
        dispatch({ type: CATE_DEL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: CATE_DEL_FAIL, payload: error.message});
    }
}

export { listCategory,saveCate,delCate };