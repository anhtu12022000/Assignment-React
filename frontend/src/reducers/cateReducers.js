import { CATE_LIST_REQUEST, CATE_LIST_FAIL, CATE_LIST_SUCCESS } from "constants/cateConstants";
import { CATE_SAVE_REQUEST, CATE_SAVE_FAIL, CATE_SAVE_SUCCESS } from "constants/cateConstants";
import { CATE_DEL_REQUEST, CATE_DEL_FAIL, CATE_DEL_SUCCESS } from "constants/cateConstants";

function cateListReducer (state = {category: []}, action) {

    switch (action.type) {
        case CATE_LIST_REQUEST:
            return {loading: true, category: []};
        case CATE_LIST_SUCCESS:
            return {loading: false, category: action.payload};
        case CATE_LIST_FAIL:
            return {loading: false, error: action.payload};    
        default:
            return state;
    }
}

function cateSaveReducer (state = {category: {}}, action) {
    
    switch (action.type) {
        case CATE_SAVE_REQUEST:
            return {loading: true};
        case CATE_SAVE_SUCCESS:
            return {
                success: true,
                loading: false,
                category: action.payload
            };
        case CATE_SAVE_FAIL:
            return {loading: false, error: action.payload};   
        default:
            return state; 
    }
}

function delCate (state = {category: {}}, action) {

    switch (action.type) {
        case CATE_DEL_REQUEST:
            return {loading: true};
        case CATE_DEL_SUCCESS:
            return {
                success: true,
                loading: false,
                category: action.payload
            };  
        case CATE_DEL_FAIL:
            return {loading: false, error: action.payload};        
        default:
            return state;
    }
}

export { cateListReducer,cateSaveReducer,delCate }