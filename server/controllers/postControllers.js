import mongoose from 'mongoose';
import PostModel from '../models/postModel.js';

export const getPosts = async (req, res) => {
    let { page } = req.query;
    if(!page) page = 1;

    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostModel.countDocuments( {} );

        const posts = await PostModel.find().sort({ _id: -1 }).skip(startIndex).limit(LIMIT);
        if(!posts) return res.status(500).json({ message: "An internal error had occurred. Please, try later!" });

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    if(!req.userId) return res.status(401).json({ message: "Unauthenticated" });

    const post = req.body;
    
    if(!post) return res.status(500).json({ message: "An internal error had occurred. Please, try later!" });

    const { title, message, tags, selectedFile } = post;
    if(!title || !message || !tags || !selectedFile) return res.status(400).json({ message: "The form must be completed in order to submit a post!" });

    const newPost = new PostModel({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    if(!req.userId) return res.status(401).json({ message: "Unauthenticated" });

    const { id: _id } = req.params;
    const post = req.body;

    if(!_id) return res.status(404).json({ message: "No param received!" });
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: "No valid param received!" });

    if(!post) return res.status(400).json({ message: "No post received!" });
    try {
        const postToBeUpdated = await PostModel.findById(_id);
        if(!postToBeUpdated.creator === req.userId) {
            return res.status(401).json({ message: "Only the owner can update this post!"});
        }
        
        const updatedPost = await PostModel.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
        return res.status(200).json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    if(!req.userId) return res.status(401).json({ message: "Unauthenticated" });

    const { id: _id } = req.params;
    if(!_id) return res.status(404).json({ message: "No param received!" });
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: "No valid param received!" });
    
    try {
        const postToBeDeleted = await PostModel.findById(_id);
        if(postToBeDeleted.creator === req.userId){
            const deletedPost = await PostModel.findByIdAndDelete(_id);
            return res.status(200).json(deletedPost);
        }
        return res.status(401).json({ message: "Only the owner can delete this post!" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const likePost = async (req, res) => {
    if(!req.userId) return res.status(401).json({ message: "Unauthenticated" });

    const { id: _id } = req.params;

    if(!_id) return res.status(404).json({ message: "No param received!" });
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: "No valid param received!" });

    try {
        const post = await PostModel.findById(_id);

        const index = post.likes.findIndex((id) => id === String(req.userId)); 

        if(index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostModel.findByIdAndUpdate(_id, post, { new: true });

        res.json(updatedPost).status(200);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i');

        const posts = await PostModel.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ] });
        res.status(200).json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
