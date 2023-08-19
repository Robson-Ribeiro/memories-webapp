import { Router } from 'express';
const router = new Router();

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/postControllers.js';

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;
