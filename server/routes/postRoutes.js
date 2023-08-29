import { Router } from 'express';
const router = new Router();

import authMiddleware from '../middleware/authMiddleware.js';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/postControllers.js';

router.get('/', getPosts);
router.post('/', authMiddleware, createPost);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.patch('/:id/likePost', authMiddleware, likePost);

export default router;
