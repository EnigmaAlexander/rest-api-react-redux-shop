import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import ProductsSlice from "./Products/slice"
import CartSlice from "./Cart/slice";
import WishlistSlice from "./Wishlist/slice"

const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    products: ProductsSlice,
    cart: CartSlice,
    wishlist: WishlistSlice,
  },
  middleware: [saga],
});
saga.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;