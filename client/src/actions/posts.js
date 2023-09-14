import * as constants from '../constants/actionTypes';
import * as api from '../api';

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: constants.START_LOADING });

        const { data } = await api.fetchPosts(page);

        dispatch({ type: constants.FETCH_ALL, payload: data });
        dispatch({ type: constants.END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPost = (id) => async(dispatch) => {
    try {
        dispatch({ type: constants.START_LOADING });
        const { data } = await api.getPost(id);

        dispatch({ type: constants.FETCH_ONE, payload: data });

        dispatch({ type: constants.END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({ type: constants.START_LOADING });

        const { data: { data } } = await api.searchPosts(searchQuery);

        dispatch({ type: constants.FETCH_BY_SEARCH, payload: data });
        dispatch({ type: constants.END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: constants.START_LOADING });

        const { data } = await api.createPost(post);
        dispatch({ type: constants.CREATE, payload: data })
        dispatch({ type: constants.END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (post, id) => async (dispatch) => {
    try {
        dispatch({ type: constants.START_LOADING });

        const { data } = await api.updatePost(post, id);
        dispatch({ type: constants.UPDATE, payload: data});
        dispatch({ type: constants.END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.deletePost(id);
        dispatch({ type: constants.DELETE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: constants.LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}