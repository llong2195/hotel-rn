import {User} from '../../entities/User';
import * as types from '../Types';
import {INITIAL_STATE} from './InitialState';

interface setUserBasicInfo {
  type: typeof types.SET_USER_BASIC_INFO;
  payload: {user: User};
}

interface getUserInfo {
  type: typeof types.GET_USER_INFO_SUCCESS;
  payload: {userInfo: User};
}
interface logout {
  type: typeof types.LOGOUT_COMPLETED;
}
interface reloadUser {
  type: typeof types.RELOAD_USER_INFO;
  payload: {userCode: string};
}

export type UserAction = setUserBasicInfo | getUserInfo | logout | reloadUser;
export default function (state = INITIAL_STATE, action: UserAction) {
  switch (action.type) {
    case types.SET_USER_BASIC_INFO:
      console.log('login completed reducer', action.payload);
      return {
        ...state,
        ...action.payload,
      };
    case types.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        user: {...action.payload.userInfo},
        loggedIn: true,
      };

    case types.LOGOUT_COMPLETED:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
}
