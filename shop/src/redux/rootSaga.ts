import { all } from 'redux-saga/effects';
import { productsSagas } from './Products/sagas';
import { сartSagas } from './Cart/sagas';
import { wishlistSagas } from './Wishlist/sagas';

export default function* rootSaga() {
    yield all([...productsSagas, ...сartSagas, ...wishlistSagas]);
  }