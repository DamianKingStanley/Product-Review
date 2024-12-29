import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PostDetails.css";
import convertDate from "../../utils/convertDate";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null); // Stores post details, including vote counts
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/post/${postId}`
        );
        setPost(response.data.post); // Ensure response contains post with vote counts
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetails();
  }, [postId]);

  const handleVote = async (voteType) => {
    const ProductReview = JSON.parse(sessionStorage.getItem("ProductReview"));
    const token = ProductReview?.token;
    const userId = ProductReview?.result?.id;
    const username = ProductReview?.result?.username;

    if (!ProductReview || !token) {
      alert("You must log in to vote.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/update-vote/${postId}`,
        { voteType, userId, username },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Assuming the response contains updated vote counts:
      const updatedPost = response.data.updatedPost;

      // Update the post state with new vote counts
      setPost(updatedPost);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("You've already voted this way.");
      } else if (error.response && error.response.status === 401) {
        alert("Session expired. Please log in again.");
      } else {
        console.error("Failed to vote:", error.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>No post found</p>;

  return (
    <div className="postDetailsSection">
      <h3>Product Details</h3>

      <div className="postDetailsContainer">
        <div className="imageContainer">
          <img
            src={`http://localhost:5000/${post.images[0]}`} // First large image
            alt={post.name}
            className="largeImage"
          />
          <div className="smallImages">
            {post.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${image}`} // Display the rest as smaller images
                alt={`${post.name} ${index}`}
                className="smallImage"
              />
            ))}
          </div>
        </div>
        <div className="postInfo">
          <p>{convertDate(post?.createdAt)}</p>

          <h1 className="postName">{post.name}</h1>
          <p className="postDescription">{post.description}</p>
          <p className="postCategory">Category: {post.category}</p>
          <div className="voteButtons">
            <button
              className="voteButton agree"
              onClick={() => handleVote("agree")}
            >
              Agree <FaThumbsUp /> (
              {post.reviews.reduce((acc, review) => acc + review.agree, 0)})
            </button>
            <button
              className="voteButton disagree"
              onClick={() => handleVote("disagree")}
            >
              Disagree <FaThumbsDown /> (
              {post.reviews.reduce((acc, review) => acc + review.disagree, 0)})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
