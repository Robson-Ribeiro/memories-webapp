import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const getPost = (id) => API.get(`/posts/${id}`); 

export const searchPosts = (searchQuery) => API.get(`/posts/search?searchQuery=${ searchQuery.search || 'none' }&tags=${ searchQuery.tags }`);

export const createPost = (post) => API.post('/posts', post);

export const updatePost = (post, id) => API.patch(`/posts/${id}`, post);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);


export const signIn = (formData) => API.post('/user/signIn', formData);

export const signUp = (formData) => API.post('/user/signUp', formData);


export const commentPost = (comment, postId) => API.post(`/posts/${postId}/commentPost`, { comment });
