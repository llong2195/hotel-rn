import {put} from 'redux-saga/effects';

import userService from '../services/UserService';
import * as UserActions from '../stores/UserInfo/Actions';

export function* reloadUserSaga(action: any) {
  console.log('reloadUserSaga', action);

  const userData = yield userService.getUserByCode(action.payload.userCode);
  console.log('userData', userData);

  if (!userData.errorCode) {
    yield put(UserActions.setUserBasicInfo(userData.userInfo));
    return;
  }
}
