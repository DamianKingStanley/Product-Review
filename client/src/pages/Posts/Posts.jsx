import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Posts.css";
import convertDate from "../../utils/convertDate";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total number of pages
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/all-products?page=${page}`
        );
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page]);

  const handleVote = async (postId, voteType) => {
    const ProductReview = JSON.parse(sessionStorage.getItem("ProductReview")); // Retrieve user details
    const token = ProductReview?.token;
    const userId = ProductReview?.result?.id;
    const username = ProductReview?.result?.username;

    if (!ProductReview || !token) {
      alert("You must log in to vote.");
      navigate("/login"); // Redirect to login if not logged in
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/update-vote/${postId}`,
        {
          voteType,
          userId,
          username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        }
      );

      // Update the posts array with new vote counts from the response
      const updatedPost = response.data.post;
      const updatedPosts = posts.map((post) =>
        post._id === postId ? updatedPost : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("You've already voted this way.");
      } else if (error.response && error.response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else {
        console.error("Failed to vote:", error.message);
      }
    }
  };

  const openPostDetails = (postId) => {
    navigate(`/post/${postId}`);
  };

  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1); // Go to the next page if not on the last page
  };

  const goToPreviousPage = () => {
    if (page > 1) setPage(page - 1); // Go to the previous page if not on the first page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="postsContainer">
        {posts?.map((post) => (
          <div key={post._id} className="postCard">
            <p>{convertDate(post?.createdAt)}</p>
            <h2>{post.name}</h2>
            <img
              src={`http://localhost:5000/${post.images[0]}`}
              alt={post.name}
              className="postImage"
              onClick={() => openPostDetails(post._id)}
            />
            <p>
              {post.description.split(" ").length > 10
                ? `${post.description.split(" ").slice(0, 10).join(" ")}...`
                : post.description}
            </p>
            <div className="voteButtons">
              <button onClick={() => handleVote(post._id, "agree")}>
                Agree <FaThumbsUp /> (
                {post.reviews.reduce((acc, review) => acc + review.agree, 0)})
              </button>
              <button
                id="disagreeBtn"
                onClick={() => handleVote(post._id, "disagree")}
              >
                Disagree <FaThumbsDown /> (
                {post.reviews.reduce((acc, review) => acc + review.disagree, 0)}
                )
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="paginationControls">
        <button id="prevBtn" onClick={goToPreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          id="NextBtn"
          onClick={goToNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Posts;
