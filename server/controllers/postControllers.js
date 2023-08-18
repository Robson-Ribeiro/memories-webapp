import PostModel from '../models/postModel.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find();
        if(!posts) return res.status(500).json({ message: "An internal error had occurred. Please, try later!" });

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    if(!post) return res.status(500).json({ message: "An internal error had occurred. Please, try later!" });

    const newPost = new PostModel(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!_id) return res.status(404).json({ message: "No param received!" });
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: "No valid param received!" });

    if(!post) return res.status(400).json({ message: "No post received!" });
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(_id, post, { new: true });
        return res.status(200).json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
