import postModel from "../models/post.js";
import multer from "multer";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// Create Post Function
export const createPost = async (req, res) => {
  try {
    const { userId, name, description, category } = req.body;

    // Handle file upload
    // const images = req.file ? `uploads/${req.file.filename}` : null;
    const images = req.files ? req.files.map((file) => file.path) : [];

    if (!images) {
      return res.status(400).json({ error: "Cover picture is required." });
    }

    // Create a new post
    const newPost = await postModel.create({
      userId,
      name,
      description,
      category,
      images,
    });

    res.status(200).json({ message: "Post created successfully.", newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// fetch all post
export const fetchAllPost = async (req, res) => {
  try {
    // Optionally handle pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Fetch posts with pagination
    const posts = await postModel
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("reviews", "username reviewText agree disagree");

    // Total number of posts for pagination purposes
    const totalPosts = await postModel.countDocuments({});

    // Sending posts with total count
    res.status(200).json({
      message: "Posts fetched successfully",
      posts,
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// single post
export const getSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const Vote = async (req, res) => {
  const { postId } = req.params;
  const { voteType, userId, username } = req.body;

  try {
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!userId) {
      return res
        .status(401)
        .json({ message: "User must be logged in to vote" });
    }

    // Find the existing review by username
    const existingReview = post.reviews.find(
      (review) => review.username === username
    );

    if (existingReview) {
      // If user already voted, update their vote, but don't allow multiple increments
      if (voteType === "agree" && existingReview.agree === 0) {
        existingReview.agree = 1;
        existingReview.disagree = 0; // Reset disagree if they change their vote
      } else if (voteType === "disagree" && existingReview.disagree === 0) {
        existingReview.disagree = 1;
        existingReview.agree = 0; // Reset agree if they change their vote
      } else {
        // If the user tries to vote again with the same option, just ignore it
        return res
          .status(400)
          .json({ message: "User has already voted this way" });
      }
    } else {
      // If user hasn't voted, push a new review to the reviews array
      const newReview = {
        username,
        agree: voteType === "agree" ? 1 : 0,
        disagree: voteType === "disagree" ? 1 : 0,
      };
      post.reviews.push(newReview);
    }

    await post.save();

    res.status(200).json({ message: "Vote updated", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Filtered Posts

export const fetchFilteredPosts = async (req, res) => {
  try {
    const { department, college, level } = req.query;

    // Build query object based on available filters
    const query = {};
    if (department) query.selectedDepartment = department;
    if (college) query.selectedCollege = college;
    if (level) query.selectedLevel = level;

    const fetchPosts = await postModel
      .find(query)
      .populate("userId", "username");
    res.status(200).json({ message: "Successful", fetchPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all posts by categpry
export const getPostsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { type } = req.query;

    let filter = {};

    if (category === "packaged-foods") {
      filter.category = type;
    } else if (category === "fresh-produce") {
      filter.category = type;
    } else if (category === "snacks") {
      filter.category = type;
    } else if (category === "beverages") {
      filter.type = type;
    } else if (category === "skin-care") {
      filter.type = type;
    } else if (category === "hair-care") {
      filter.type = type;
    } else if (category === "fragrances") {
      filter.type = type;
    } else if (category === "cosmetics") {
      filter.type = type;
    } else if (category === "laptops") {
      filter.type = type;
    } else if (category === "tVs") {
      filter.type = type;
    } else if (category === "home-appliances") {
      filter.type = type;
    } else if (category === "wearables") {
      filter.type = type;
    } else if (category === "men-Fashion") {
      filter.type = type;
    } else if (category === "women-fashion") {
      filter.type = type;
    } else if (category === "footwear") {
      filter.type = type;
    } else if (category === "accessories") {
      filter.type = type;
    } else if (category === "furniture") {
      filter.type = type;
    } else if (category === "kitchen-appliances") {
      filter.type = type;
    } else if (category === "decor-lighting") {
      filter.type = type;
    } else if (category === "bedding") {
      filter.type = type;
    } else if (category === "supplements") {
      filter.type = type;
    } else if (category === "fitness-equipment") {
      filter.type = type;
    } else if (category === "vehicles") {
      filter.type = type;
    } else if (category === "car-accessories") {
      filter.type = type;
    } else if (category === "spare-parts") {
      filter.type = type;
    } else if (category === "local-restaurants") {
      filter.type = type;
    } else if (category === "food-delivery") {
      filter.type = type;
    } else if (category === "hotels") {
      filter.type = type;
    } else if (category === "guesthouses") {
      filter.type = type;
    } else if (category === "travel-agencies") {
      filter.type = type;
    } else if (category === "clinics") {
      filter.type = type;
    } else if (category === "pharmacies") {
      filter.type = type;
    } else if (category === "telemedicine") {
      filter.type = type;
    }

    // Find the books that match the filter
    const books = await postModel.find(filter);
    res.json(books);
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    res.status(500).json({ message: error.message });
  }
};

//SEARCH BY TILTLE
export const searchPosts = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .json({ message: "Title query parameter is required" });
    }

    const posts = await postModel.find({
      title: { $regex: title, $options: "i" }, // Case-insensitive search
    });

    if (posts.length === 0) {
      return res.status(404).json({
        message: "No Product found",
      });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const postCount = async (req, res) => {
  try {
    const postCount = await postModel.countDocuments();
    res.status(200).json({ count: postCount });
  } catch (error) {
    console.error("Error fetching post count:", error);
    res.status(500).json({ message: error.message });
  }
};

// edit post
export const editPost = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const updatePosts = await postModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updatePosts);
    res.status(200).json({ message: "Updated succesfully", updatePosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// delete post
export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await postModel.findByIdAndRemove(id);

    res.status(200).json({ message: "deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// posts by a user
export const getPostsByUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    const posts = await postModel.find({ userId: userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
