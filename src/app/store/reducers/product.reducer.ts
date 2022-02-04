import { createReducer, on, State } from '@ngrx/store';
import { ADD_PRODUCT_LIST } from '../actions/products-list.action';

export interface ProductState {
    productList: any[]
}

export const initialState: ProductState = {
    productList: []
};

export const productReducer = createReducer(
    initialState,
    on(ADD_PRODUCT_LIST, (state, { productList }) => ({
        ...state,
        productList: productList 
    })),
);
