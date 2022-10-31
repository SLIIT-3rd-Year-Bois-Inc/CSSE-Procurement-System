import { configureStore } from "@reduxjs/toolkit";
import selectProductReducer from "./product-store";

export const store = configureStore({
    reducer: {
        product: selectProductReducer
    }
});