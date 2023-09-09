import * as constants from '../constants/actionTypes';
import * as api from '../api';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: constants.FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getPostBySearch = (searchQuery) => async(dispatch) => {
    try {
        const { data } = await api.searchPosts(searchQuery);

        dispatch({ type: constants.FETCH_ALL, payload: data });
    } catch (error) {
        
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: constants.CREATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (post, id) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(post, id);
        dispatch({ type: constants.UPDATE, payload: data});
        
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