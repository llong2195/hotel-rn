import {put} from 'redux-saga/effects';

import * as AuthActions from '../stores/Auth/Actions';
import * as UserActions from '../stores/UserInfo/Actions';

export function* loginSaga(action: any): any {
  console.log('loginSaga', action);
  // yield put(SettingsAction.setSettings({demo:'done saga'}))
  yield put(UserActions.setUserBasicInfo(action.payload?.user));
}
export function* registerSaga(action: any): any {
  console.log('registerSaga', action);
  yield put(UserActions.setUserBasicInfo(action.payload?.user));
}
export function* logoutSaga(action: any): any {
  console.log('logoutSaga', action);
  yield put(UserActions.logout());
  yield put(AuthActions.logoutCompleted());
}
