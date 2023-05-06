import {Posts} from '../../entities/Post';
import * as types from '../Types';

export const getPosted = () => {
  return {
    type: types.GET_POSTED,
  };
};
export const getPostedComplete = (posts: Posts) => {
  return {
    type: types.GET_POSTED_COMPLETE,
    payload: {posts},
  };
};
export const getSearch = () => {
  return {
    type: types.GET_SEARCH,
  };
};
export const getSearchComplete = (posts: Posts) => {
  return {
    type: types.GET_SEARCH_COMPLETE,
    payload: {posts},
  };
};

export const updatePostJob = ({id, status}: {id: number; status: number}) => {
  return {
    type: types.UPDATE_SAVE_POST,
    payload: {id, status},
  };
};
