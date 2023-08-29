import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        
        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
        if(error.code === "ERR_BAD_REQUEST") {
            window.alert('Já existe uma conta com esse e-mail!');
        }
        console.log(error);
    }
}
