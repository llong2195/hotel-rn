import {put} from 'redux-saga/effects';

import postServices from '../services/PostServices';
import * as PostActions from '../stores/Post/Actions';

export function* getPostedSaga() {
  console.log('PostActions.getPostedSaga');
  const post = yield postServices.searchPost({postType: 0, status: 0});
  if (!post.errorCode) {
    yield put(PostActions.getPostedComplete(post.posteds));
    return;
  }
}
export function* getSearchSaga() {
  console.log('PostActions.getSearchSaga');
  const post = yield postServices.searchPost({postType: 1, status: 0});
  if (!post.errorCode) {
    yield put(PostActions.getSearchComplete(post.posteds));
    return;
  }
}
