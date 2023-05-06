import {User} from '../../entities/User';

export const INITIAL_STATE: User = {
  id: 0,
  code: '',
  name: '',
  email: '',
  gender: 0,
  address: null,
  phoneNumber: '',
  avatar: '',
  isLoggedIn: false,
};
