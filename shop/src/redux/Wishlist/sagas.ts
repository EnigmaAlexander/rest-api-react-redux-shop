import axios from 'axios';
import { all, call, fork, put } from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';
import {
  getWishlist,
  setWishlist,
  addToWishlist,
  removeFromWishlist,
} from './slice';

const { takeEvery } = Eff;
const { takeLatest } = Eff;

export function* Wishlist(): any {
    try {
      const wishlist = yield call(() => {
        return axios.get('http://localhost:3001/wishlist').then((data) => {
          return data.data;
        });
      });
      yield put(setWishlist(wishlist));
    } catch (error) {
      console.log(error);
    }
  }
  
  export function* wishlistAdd(addToWishlist: any) {
    try {
      yield call(() => {
        return axios.post('http://localhost:3001/wishlist', addToWishlist.payload);
      });
      yield put(getWishlist());
    } catch (error) {
      console.log(error);
    }
  }

  export function* wishlistDelete(removeFromWishlist: any) {
    try {
      console.log(removeFromWishlist.payload);
      yield call(() => {
        return axios.delete(`http://localhost:3001/wishlist/${removeFromWishlist.payload}`);
      });
      yield put(getWishlist());
    } catch (error) {
      console.log(error);
    }
  }
  
  function* getWishlistSaga() {
    yield takeEvery(getWishlist.type, Wishlist);
  }
  function* WishlistAddSaga() {
    yield takeLatest(addToWishlist, wishlistAdd);
  }
  function* WishlistDeleteSaga() {
    yield takeLatest(removeFromWishlist, wishlistDelete);
  }
 
  export const wishlistSagas = [
    fork(getWishlistSaga),
    fork(WishlistAddSaga),
    fork(WishlistDeleteSaga),
  ];