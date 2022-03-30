import postMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await postMessage.find({});

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new postMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    await postMessage.findByIdAndRemove(postId);
    res.status(200).json({ id: postId });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const postForUpdate = req.body;

  try {
    const updatedPost = await postMessage.findByIdAndUpdate(
      postId,
      postForUpdate,
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch {
    res.status(400).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const postId = req.params.id;
  const authenticatedUser = req.userId;
  if (!authenticatedUser) {
    return res.status(401).json({message: 'Unauthorized access.'})
  }
  try {
    const post = await postMessage.findById(postId);
    const updatedPost = await postMessage.findByIdAndUpdate(
      post._id, {likeCount: post.likeCount + 1},
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({message: "ERROR LIKES"})
  }
};
