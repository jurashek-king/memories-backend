import express from 'express';
import { getPosts, createPost, deletePost, updatePost, likePost } from '../controllers/posts.js';
const postsRoutes = express.Router();

import auth from '../middleware/auth.js'

postsRoutes.get('/', getPosts);
// postsRoutes.post('/', createPost);
postsRoutes.post('/', auth, createPost);
// postsRoutes.delete('/:id', deletePost);
postsRoutes.delete('/:id', auth, deletePost);
// postsRoutes.put('/:id', updatePost);
postsRoutes.put('/:id', auth, updatePost);
// postsRoutes.patch('/:id/likePost', likePost);
postsRoutes.patch('/:id/likePost',auth,  likePost);


export default postsRoutes;