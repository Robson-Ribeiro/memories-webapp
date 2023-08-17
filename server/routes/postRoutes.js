import { Router } from 'express';
const router = new Router();

import { getPosts, createPost } from '../controllers/postControllers.js';

router.get('/', getPosts);
router.post('/', createPost);

export default router;
