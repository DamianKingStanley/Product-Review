import express from "express";
import upload from "../multer.js";

const router = express.Router();

import {
  createPost,
  fetchAllPost,
  getSinglePost,
  Vote,
  fetchFilteredPosts,
  getPostsByCategory,
  searchPosts,
  editPost,
  deletePost,
  getPostsByUser,
  postCount,
} from "../controllers/postController.js";

import auth from "../middleware/auth.js";

router.post("/share-review", auth, upload.array("images", 4), createPost);
router.get("/all-products", fetchAllPost);
router.get("/post/:postId", getSinglePost);
router.post("/update-vote/:postId", auth, Vote);
router.get("/filtered-posts", fetchFilteredPosts);
router.get("/:category", getPostsByCategory);
router.get("/book/search", searchPosts);
router.get("/posts/count", postCount);
router.put("/posts/edit/:id", auth, editPost);
router.delete("/posts/edit/:id", auth, deletePost);
router.get("/posts/:userId", getPostsByUser);

export default router;
