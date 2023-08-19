import { Router } from 'express';
const router = new Router();

import { getPosts, createPost, updatePost, deletePost } from '../controllers/postControllers.js';

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
