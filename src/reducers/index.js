import {
  FETCH_POSTS_LOADING,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_DETAILS,
  HANDLE_SEARCH_TERM,
  HANDLE_SORTING,
  HANDLE_PERPAGE,
  HANDLE_PAGE
} from './action-types';

const initialState = {
  posts: [],
  details: [],
  loading: true,
  error: false,
  term: '',
  sorting: '',
  perpage: 10,
  page: 1
};

const reducer = (state = initialState, { type, payload }) => {
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
    case FETCH_DETAILS:
      return {
        ...state,
        details: payload
      };
    case HANDLE_SEARCH_TERM:
      return {
        ...state,
        term: payload
      };
    case HANDLE_SORTING:
      return {
        ...state,
        sorting: payload
      };
    case HANDLE_PAGE:
      return {
        ...state,
        page: payload
      };
    case HANDLE_PERPAGE:
      return {
        ...state,
        perpage: payload
      };
    default:
      return state;
  }
};

export default reducer;
