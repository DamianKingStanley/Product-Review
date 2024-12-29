import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  username: { type: String, required: true },
  agree: { type: Number, default: 0 },
  disagree: { type: Number, default: 0 },
});

const postSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: [{ type: String, required: true }],
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);
