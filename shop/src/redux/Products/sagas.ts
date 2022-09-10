import axios from 'axios';
import { all, call, fork, put } from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects';
import {
  getProducts,
  setProducts,
  getProductsFilter,
  getProductsCategoryFilter,
  searchBar,
} from './slice';

const { takeEvery } = Eff;
const { takeLatest } = Eff;

export function* productsFetch(): any {
    try {
      const products = yield call(() => {
        return axios.get('http://localhost:3001/products').then((data) => {
          return data.data;
        });
      });
      yield put(setProducts(products));
    } catch (error) {
      console.log(error);
    }
  }

  export function* productsFilter(getProductsFilter: any):any {
    try {
      const products = yield call(() => {
        return axios.get(`http://localhost:3001/products?type=${getProductsFilter.payload}`).then((data) => {
          return data.data;
        });
      });
      yield put(setProducts(products));
    } catch (error) {
      console.log(error);
    }
  }

  export function* productsCategoryFilter(getProductsFilter: any):any {
    try {
      const products = yield call(() => {
        return axios.get(`http://localhost:3001/products?category=${getProductsFilter.payload}`).then((data) => {
          return data.data;
        });
      });
      yield put(setProducts(products));
    } catch (error) {
      console.log(error);
    }
  }

  export function* searchBarMethod(searchBar: any):any {
    try {
      const products = yield call(() => {
        return axios.get(`http://localhost:3001/products?title_like=${searchBar.payload}`).then((data) => {
          return data.data;
        });
      });
      yield put(setProducts(products));
    } catch (error) {
      console.log(error);
    }
  }
  

  function* getProductsSaga() {
    yield takeEvery(getProducts.type, productsFetch);
  }
  function* getProductsFilterSaga() {
    yield takeEvery(getProductsFilter, productsFilter);
  }
  function* productsCategoryFilterSaga() {
    yield takeEvery(getProductsCategoryFilter, productsCategoryFilter);
  }
  function* searchBarSaga() {
    yield takeEvery(searchBar, searchBarMethod);
  }

  export const productsSagas = [
    fork(getProductsSaga),
    fork(getProductsFilterSaga),
    fork(productsCategoryFilterSaga),
    fork(searchBarSaga)
  ];