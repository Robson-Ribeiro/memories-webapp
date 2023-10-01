import { Router } from 'express';
const router = new Router();

import authMiddleware from '../middleware/authMiddleware.js';

import { getPosts, getPost, createPost, updatePost, deletePost, likePost, getPostsBySearch, commentPost } from '../controllers/postControllers.js';


router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.post('/', authMiddleware, createPost);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.patch('/:id/likePost', authMiddleware, likePost);
router.post('/:id/commentPost', authMiddleware, commentPost);


export default router;
