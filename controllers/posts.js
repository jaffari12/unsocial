const Post = require('../models/Post');
const mongoose = require('mongoose');

//get all the posts data (this works fine)
const getPosts = async (req, res, next) => {
    try {
      const posts = await Post.find({isDeleted: false});
      res.json({ success: true, msg: 'show all posts', data: posts })
    } catch(err) {
      next(err)
    }
  };

  //get specific post by id (okay now)
  const getPost = async (req, res, next) =>{
    try{
      const { id } = req.params;
      const post = await Post.findById({_id: id, isDeleted: false});
      console.log(id);
      res.json({ success: true, msg: `posts with post id ${id} retrieved`, data: post})
    } catch(err) {
      next(err)
    }
  };
   
  // get all posts of a specific user (getting null )
  const getUserPosts = async (req, res, next) => {
    try {
      const { id } = req.params;  
      const posts = await Post.find({ _userId: id, isDeleted: false })
      res.json({ success: true, msg: `posts of user with user id ${id} retrieved`, data: posts})
    } catch(err) {
      next(err)
    }
  };

//Submit a new post (working)
  const submitNewPost = async (req, res, next) => {
    try {
    const { title, link, text, _userId } = req.body;
    
    const post = await Post.insertMany({ title, link, text, _userId},  {new: true});
    res.json({ success: true, msg: `submitted new post  ${text} `, data: post })
} catch(err) {
    next(err)
  }
};

//Edit a post (working)
const editPost = async (req, res, next) => {
  try {
    const patchPost = req.body;
    const _id = req.params.id
    const post = await Post.updateOne({_id: _id}, patchPost, { new: true });
    res.json({ success: true, msg: `post edited ${post.text}`, data: post })
  } catch(err) {
    next(err)
  }
};

//Delete a post ( working)
const deletePost = async (req, res, next) =>{
try{
  const id= req.params.id;
  const post = await Post.findByIdAndDelete(id);
  res.json({ success: true, msg: `post with id ${id} deleted`, data: post })
  } catch(err) {
    next(err) 
  }
};

module.exports = {
    getPosts,
    getPost,
    getUserPosts,
    submitNewPost,
    editPost,
    deletePost
};