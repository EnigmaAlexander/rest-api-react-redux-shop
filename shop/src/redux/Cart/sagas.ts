import axios from 'axios';
import { all, call, fork, put } from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';
import {
  getCart,
  setCart,
  addToCart,
  removeFromCart,
  addQty,
  subtractQty
} from './slice';

const { takeEvery } = Eff;
const { takeLatest } = Eff;

export function* Cart(): any {
    try {
      const cart = yield call(() => {
        return axios.get('http://localhost:3001/cart').then((data) => {
          return data.data;
        });
      });
      yield put(setCart(cart));
    } catch (error) {
      console.log(error);
    }
  }
  
  export function* cartAdd(addToCart: any) {
    try {
      yield call(() => {
        return axios.post('http://localhost:3001/cart', addToCart.payload);
      });
      yield put(getCart());
    } catch (error) {
      console.log(error);
    }
  }

  export function* cartDelete(removeFromCart: any) {
    try {
      console.log(removeFromCart.payload);
      yield call(() => {
        return axios.delete(`http://localhost:3001/cart/${removeFromCart.payload}`);
      });
      yield put(getCart());
    } catch (error) {
      console.log(error);
    }
  }
  
  export function* qutyAdd(addQty: any) {
    try {
      console.log("true")
      yield call(() => {
        return axios.put(`http://localhost:3001/cart/${addQty.payload.id}` ,  addQty.payload);
      });
      yield put(getCart());
    } catch (error) {
      console.log(error);
    }
  }
  export function* qutySubstract(subtractQty: any) {
    try {
      console.log("true")
      yield call(() => {
        return axios.put(`http://localhost:3001/cart/${subtractQty.payload.id}` ,  subtractQty.payload);
      });
      yield put(getCart());
    } catch (error) {
      console.log(error);
    }
    }

  function* getCartSaga() {
    yield takeEvery(getCart.type, Cart);
  }
  function* cartAddSaga() {
    yield takeLatest(addToCart, cartAdd);
  }
  function* cartDeleteSaga() {
    yield takeLatest(removeFromCart, cartDelete);
  }
  function* qutyAddSaga() {
    yield takeLatest(addQty, qutyAdd);
  }
  function*  qutySubstractSaga() {
    yield takeLatest(subtractQty, qutySubstract);
  }
  export const сartSagas = [
    fork(getCartSaga),
    fork(cartAddSaga),
    fork(cartDeleteSaga),
    fork(qutyAddSaga),
    fork(qutySubstractSaga),
  ];