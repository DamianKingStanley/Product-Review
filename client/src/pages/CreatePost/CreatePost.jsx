import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaImages, FaChevronDown } from "react-icons/fa";
import "./CreatePost.css";

const CreatePost = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedFiles = e.target.files;
    setImages(selectedFiles);
    setFileNames([...selectedFiles].map((file) => file.name));

    // Create previews for images
    const previews = [...selectedFiles].map((file) => {
      return URL.createObjectURL(file);
    });
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const customer = JSON.parse(sessionStorage.getItem("ProductReview"));
    if (!customer || !customer.token || !customer.result) {
      setErrorMessage("User is not authenticated.");
      setLoading(false);
      return;
    }

    const token = customer.token;
    const userId = customer.result.id;

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/share-review",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Failed to create post";
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createPostContainer">
      <form className="createPostForm" onSubmit={handleSubmit}>
        <h1>Share a Product/Service Review</h1>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="formGroup">
          <label htmlFor="name">Product/Service Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="description">Your Review:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="category">Category:</label>
          <div className="dropdown">
            <button className="dropbtn">
              {category || "Select Category"}
              <FaChevronDown />
            </button>
            <div className="dropdown-content">
              {/* Category Options */}
              {[
                "packaged-foods",
                "fresh-produce",
                "snacks",
                "beverages",
                "skin-care",
                "hair-care",
                "fragrances",
                "cosmetics",
                "phones",
                "laptops",
                "tVs",
                "home-appliances",
                "wearables",
                "men-Fashion",
                "women-fashion",
                "footwear",
                "accessories",
                "furniture",
                "kitchen-appliances",
                "decor-lighting",
                "bedding",
                "supplements",
                "fitness-equipment",
                "vehicles",
                "car-accessories",
                "spare-parts",
                "local-restaurants",
                "food-delivery",
                "hotels",
                "guesthouses",
                "travel-agencies",
                "clinics",
                "pharmacies",
                "telemedicine",
              ].map((categoryOption) => (
                <a
                  key={categoryOption}
                  onClick={() => setCategory(categoryOption)}
                >
                  {categoryOption}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="formGroup">
          <label htmlFor="images">
            <FaImages /> Upload Images (4 max):
          </label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageChange}
            required
          />
          <div className="imagePreviews">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                className="imagePreview"
              />
            ))}
          </div>
        </div>

        <button type="submit" className="submitButton" disabled={loading}>
          {loading ? "Submitting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
