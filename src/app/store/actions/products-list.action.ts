import { createAction, props } from "@ngrx/store";

export const ADD_PRODUCT_LIST = createAction(
    '[ProductList Component] productList',
    props<{productList: any}>()
);
