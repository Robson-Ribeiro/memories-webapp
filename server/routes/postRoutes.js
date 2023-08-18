import { Router } from 'express';
const router = new Router();

import { getPosts, createPost, updatePost } from '../controllers/postControllers.js';

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);

export default router;
