import { Post } from "../models/post.model.js";

//create a post
const createPost = async(req, res) => {
    try {
        const { name, description, age} = req.body;
        if (!name || !description || !age){
            return res.status(400).json({
                message: "All fields are required!"
            });
        }
        const post = await Post.create({ name, description, age});
        res.status(201).json({
            message: "Post created successfully", post
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!", error
        })
    }
}

//read post 
const getPosts = async(req, res) => {
    
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Internal Sever Error.", error
        })
    }
}
//update posts

const updatePost = async(req, res) => {
    try {
        if(Object.keys(req.body).length === 0) {
            res.status(400).json({
                message: "No data provided"
            });
        }
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true} );
        if (!post) return res.status(404).json({
            message: "Post not found!"
        })
        res.status(200).json({
            message: "Post updated successfully!"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",error
        })
    }
}

//delete post
const deletePost = async(req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({
            message: "Post not found"
        })
        res.status(200).json({
            message: "Post successfully deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error
        })
    }
}
export {
    createPost,
    getPosts,
    updatePost,
    deletePost
}