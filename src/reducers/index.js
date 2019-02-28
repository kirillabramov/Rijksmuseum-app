import { FETCH_POSTS_LOADING, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR } from './action-types';

const initialState = {
  posts: [],
  loading: true,
  error: false
};

const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_POSTS_LOADING:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: payload
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: false
      };
    default:
      return state;
  }
};

export default reducer;
