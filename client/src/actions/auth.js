import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signIn = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        history.push('/');
        
        dispatch({ type: AUTH, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        history.push('/');

        dispatch({ type: AUTH, payload: data });
    } catch (error) {
        console.log(error);
    }
}
