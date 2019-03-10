import axios from 'axios';
import {
  FETCH_POSTS_LOADING,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_DETAILS,
  HANDLE_SEARCH_TERM,
  HANDLE_SORTING,
  HANDLE_PERPAGE,
  HANDLE_PAGE
} from '../reducers/action-types';

const API_KEY = 'JvhgtHRn';

const fetchTiles = (perPage = 10, page = 1, query = '', sorting = '') => dispatch => {
  const url = `https://www.rijksmuseum.nl/api/nl/collection?key=${API_KEY}&format=json&p=${page}&ps=${perPage}&q=${query}&s=${sorting}&culture=en`;
  dispatch({ type: FETCH_POSTS_LOADING });
  return axios(url)
    .then(res => res.data.artObjects)
    .then(res => dispatch({ type: FETCH_POSTS_SUCCESS, payload: res }))
    .catch(err => dispatch({ type: FETCH_POSTS_ERROR }));
};

const fetchDetails = id => dispatch => {
  const url = `https://www.rijksmuseum.nl/api/nl/collection/${id}?key=${API_KEY}&culture=en&format=json`;
  return axios(url)
    .then(res => res.data)
    .then(res => dispatch({ type: FETCH_DETAILS, payload: res }))
    .catch(err => dispatch({ type: FETCH_POSTS_ERROR }));
};

const handleSearchTerm = term => dispatch => {
  dispatch({ type: HANDLE_SEARCH_TERM, payload: term });
};

const handleSorting = sort => dispatch => {
  dispatch({ type: HANDLE_SORTING, payload: sort });
};

const handlePerPage = perpage => dispatch => {
  dispatch({ type: HANDLE_PERPAGE, payload: perpage });
};

const handlePage = page => dispatch => {
  dispatch({ type: HANDLE_PAGE, payload: page });
};

export { fetchTiles, handleSearchTerm, handleSorting, handlePerPage, handlePage, fetchDetails };
