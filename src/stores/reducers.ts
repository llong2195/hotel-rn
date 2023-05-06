import {combineReducers} from 'redux';

import AuthReducer from './Auth/Reducers';
import PostsReducer from './Post/Reducers';
import SettingsReducer from './Settings/Reducers';
import UserInfoReducer from './UserInfo/Reducers';

export const rootReducers = combineReducers({
  auth: AuthReducer,
  settings: SettingsReducer,
  userInfo: UserInfoReducer,
  posts: PostsReducer,
});
