import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}` ;
    }

    return req;
});

export const fetchPosts = () => API.get('/posts');

export const createPost = (post) => API.post('/posts', post);

export const updatePost = (post, id) => API.patch(`/posts/${id}`, post);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);


export const signIn = (formData) => API.post('/user/signIn', formData);

export const signUp = (formData) => API.post('/user/signUp', formData);