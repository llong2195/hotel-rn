import {RootState} from '../';

export const settings = (state: RootState) => {
  console.log('state.post = ', state, state.posts);
  return state.posts;
};
