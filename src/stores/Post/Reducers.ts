import {Posts} from '../../entities/Post';
import * as types from '../Types';
import {INITIAL_STATE} from './InitialState';

interface getPosted {
  type: typeof types.GET_POSTED;
}
interface getPostedComplete {
  type: typeof types.GET_POSTED_COMPLETE;
  payload: {posts: Posts};
}
interface getSearch {
  type: typeof types.GET_SEARCH;
}
interface getSearchComplete {
  type: typeof types.GET_SEARCH_COMPLETE;
  payload: {posts: Posts};
}
interface updateSavePost {
  type: typeof types.UPDATE_SAVE_POST;
  payload: {
    id: number;
    status: number;
  };
}

export type PostActions =
  | getPostedComplete
  | getSearchComplete
  | getPosted
  | getSearch
  | updateSavePost;

export default function (state = INITIAL_STATE, action: PostActions) {
  switch (action.type) {
    case types.GET_POSTED:
      return {
        ...state,
      };
    case types.GET_POSTED_COMPLETE:
      console.log('getpost', action);
      return {
        ...state,
        posteds: action.payload.posts,
      };

    case types.GET_SEARCH:
      return {
        ...state,
      };
    case types.GET_SEARCH_COMPLETE:
      console.log('getsearch', action);

      return {
        ...state,
        search: action.payload.posts,
      };
    case types.UPDATE_SAVE_POST:
      console.log('updateSave', action);
      return {
        ...state,
        posteds: state.posteds.map((i: any) =>
          i.id === action.payload.id
            ? {...i, isSave: action.payload.status}
            : i,
        ),
        search: state.search.map((i: any) =>
          i.id === action.payload.id
            ? {...i, isSave: action.payload.status}
            : i,
        ),
      };
    default:
      return state;
  }
}
