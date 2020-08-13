import { USER_SIGNIN_REQUEST,USER_SIGNIN_SUCCESS,USER_SIGNIN_FAIL } from "constants/userConstants";
import { USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL } from "constants/userConstants";
import { USER_LIST_REQUEST,USER_LIST_SUCCESS,USER_LIST_FAIL } from "constants/userConstants";
import { USER_CONTACT_REQUEST,USER_CONTACT_SUCCESS,USER_CONTACT_FAIL } from "constants/userConstants";
import { LIST_CONTACT_REQUEST,LIST_CONTACT_SUCCESS,LIST_CONTACT_FAIL } from "constants/userConstants";
import { DELMUTIL_CONTACT_REQUEST,DELMUTIL_CONTACT_SUCCESS,DELMUTIL_CONTACT_FAIL } from "constants/userConstants";
import { USER_UPDATE_REQUEST,USER_UPDATE_SUCCESS,USER_UPDATE_FAIL } from "constants/userConstants";


function userSigninReducer (state = {}, action) {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return {loading: true};
        case USER_SIGNIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            };
        case USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload};   
        default:
            return state; 
    }
}

function userRegisterReducer (state = {}, action) {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true};
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            };
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload};   
        default:
            return state; 
    }
}

function userListReducer (state = {users: [],}, action) {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {loading: true, users: []};
        case USER_LIST_SUCCESS:
            return {
                loading: false,
                users: action.payload,
            };    
        case USER_LIST_FAIL:
            return {loading: false, error: action.payload};           
        default:
            return state; 
    }
}

function userUpdateReducer (state = {user: {}}, action) {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {update: true};
        case USER_UPDATE_SUCCESS:
            return {
                update: false,
                users: state.users,
        };    
        case USER_UPDATE_FAIL:
            return {loading: false, error: action.payload};           
        default:
            return state; 
    }
}

function contactReducer (state = {contact: {}}, action) {
    switch (action.type) {
        case USER_CONTACT_REQUEST:
            return {loading: true};
        case USER_CONTACT_SUCCESS:
            console.log(action.payload)
            return {
                success: true,
                loading: false,
                contact: action.payload
            };
        case USER_CONTACT_FAIL:
            return {loading: false, error: action.payload};   
        default:
            return state; 
    }
}

function contactListReducer (state = {contacts: []}, action) {
    switch (action.type) {
        case LIST_CONTACT_REQUEST:
            return {loading: true, contacts: []};
        case LIST_CONTACT_SUCCESS:
            return {
                loading: false,
                contacts: action.payload,
            };
        case LIST_CONTACT_FAIL:
            return {loading: false, error: action.payload};           
        default:
            return state; 
    }
}

function contactDelMutilReducer (state = {contacts: []}, action) {
    switch (action.type) {
        case DELMUTIL_CONTACT_REQUEST:
            return {loading: true, contacts: []};
        case DELMUTIL_CONTACT_SUCCESS:
            return {
                success: true,
                loading: false,
                contacts: action.payload,
            };
        case DELMUTIL_CONTACT_FAIL:
            return {loading: false, error: action.payload};           
        default:
            return state; 
    }
}

export { userSigninReducer,userRegisterReducer,userListReducer,userUpdateReducer,contactReducer,contactListReducer,contactDelMutilReducer };