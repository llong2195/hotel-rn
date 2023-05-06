import {User} from '../../entities/User';
import * as types from '../Types';

export const setUserBasicInfo = (userInfo: User) => {
  return {
    type: types.SET_USER_BASIC_INFO,
    payload: userInfo,
  };
};

export const getUserInfo = (user: User) => {
  return {
    type: types.GET_USER_INFO_SUCCESS,
    payload: user,
  };
};
export const logout = () => {
  return {
    type: types.LOGOUT_COMPLETED,
  };
};

export const reloadUser = (userCode: string) => {
  return {
    type: types.RELOAD_USER_INFO,
    payload: {userCode},
  };
};
