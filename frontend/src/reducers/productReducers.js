import { PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL,PRODUCT_CATE_FILTER,PRODUCT_ORDER_SUCCESS,PRODUCT_FILTER_SUCCESS } from "constants/productConstants";
import { PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCCESS,PRODUCT_DETAIL_FAIL } from "constants/productConstants";
import { PRODUCT_SAVE_REQUEST,PRODUCT_SAVE_SUCCESS,PRODUCT_SAVE_FAIL } from "constants/productConstants";
import { PRODUCT_CATE_REQUEST,PRODUCT_CATE_SUCCESS,PRODUCT_CATE_FAIL } from "constants/productConstants";

function productListReducer (state = {products: [], sibar: []}, action) {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: [], sibar: []};
        case PRODUCT_LIST_SUCCESS:
            action.payload.map(x => state.sibar.push(x.category));
            state.sibar = [...new Set(state.sibar)];
            return {
                loading: false,
                products: action.payload,
                sibar: state.sibar
            };
        case PRODUCT_CATE_FILTER:
            console.log(state.products);
            const datafilter = state.products.filter(x => x.category === action.payload);
            return {
                loading: false,
                filter: datafilter,
                products: state.products,
                sibar: state.sibar,
                category: action.payload
            };
        case PRODUCT_ORDER_SUCCESS:
            const sortedProducts = state.products;
            console.log(sortedProducts);
            if (action.payload === "latest") {
                sortedProducts.sort(( a,b) => (a.price > b.price? -1 : 1));
            } else {
                sortedProducts.sort(( a,b ) => (a.price > b.price? 1 : -1));
            }
            return {
                loading: false,
                products: sortedProducts,
                sibar: state.sibar
            };
            case PRODUCT_FILTER_SUCCESS:
                const filteredProducts = state.products;
                const data = filteredProducts.filter(el => {
                    var name = el.name.toLowerCase();
                    return name.indexOf(action.payload) !== -1;
                });
                console.log(data);
                return {
                    loading: false,
                    products: data,
                    sibar: state.sibar
                };        
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};           
        default:
            return state; 
    }
}


function productCateReducer (state = {productscate: []}, action) {
    switch (action.type) {
        case PRODUCT_CATE_REQUEST:
            return {loading: true, productscate: []};
        case PRODUCT_CATE_SUCCESS:
            console.log(action.payload);
            return {
                loading: false,
                productscate: action.payload
            };  
        case PRODUCT_CATE_FAIL:
            return {loading: false, error: action.payload};           
        default:
            return state; 
    }
}

function productReducer (state = {product: {}}, action) {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {loading: true};
        case PRODUCT_DETAIL_SUCCESS:
            return {
                success: true,
                loading: false,
                product: action.payload,
            };
        case PRODUCT_DETAIL_FAIL:
            return {loading: false, error: action.payload};   
        default:
            return state; 
    }
}

function productSaveReducer (state = {product: {}}, action) {
    
    switch (action.type) {
        case PRODUCT_SAVE_REQUEST:
            return {loading: true};
        case PRODUCT_SAVE_SUCCESS:
            return {
                success: true,
                loading: false,
                product: action.payload
            };
        case PRODUCT_SAVE_FAIL:
            return {loading: false, error: action.payload};   
        default:
            return state; 
    }
}

export { productListReducer, productReducer, productSaveReducer, productCateReducer };