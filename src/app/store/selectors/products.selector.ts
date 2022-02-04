import { createSelector } from "@ngrx/store";
import { ProductState } from "../reducers/product.reducer";
import { AppState } from "../state/app.state";

export const selectProductList = (state: AppState) => state.productList;
export const selectAllProductsList = createSelector(
    selectProductList,
    (state: ProductState) => state.productList
);
