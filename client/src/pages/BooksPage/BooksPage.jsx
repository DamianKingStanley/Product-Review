import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BooksPage.css";
import TopHeader from "../../component/TopHeader/TopHeader";
import Navibar from "../../component/Navibar/Navibar";
import { useNavigate } from "react-router-dom";
import convertDate from "../../utils/convertDate";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const BooksPage = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { category, type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      let url = `http://localhost:5000/${category}?type=${type}`;

      try {
        const response = await axios.get(url);

        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchPosts();
  }, [category, type]);

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

  return (
    <div>
      <TopHeader />
      <Navibar />
      <div className="BooksPageComponent">
        <h1>Products on {type.replace("-", " ")}</h1>
        <div className="BooksPageComponentbooks-list">
          {posts?.length > 0 ? (
            posts?.map((post) => (
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
                    {post.reviews.reduce(
                      (acc, review) => acc + review.agree,
                      0
                    )}
                    )
                  </button>
                  <button
                    id="disagreeBtn"
                    onClick={() => handleVote(post._id, "disagree")}
                  >
                    Disagree <FaThumbsDown /> (
                    {post.reviews.reduce(
                      (acc, review) => acc + review.disagree,
                      0
                    )}
                    )
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No product yet.</p>
          )}
        </div>

        {showModal && (
          <div className="BooksPagemodal">
            <p>{modalMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksPage;
