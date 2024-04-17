import React, { useState } from "react";
import "./addproductwindow.css";
import axios from "axios";
const AddproductWindow = ({ isVisible, onClose }) => {
  const handleClose = () => {
    onClose(); // Call the onClose function passed from the parent component
  };
  const className = `${isVisible ? "addproduct-container" : ""}`;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  const username = localStorage.getItem("username");
  async function handleItem(e) {
    e.preventDefault();
    try {
      if (name === "" || image === null) {
        alert("Please fill out all fields");
      } else {
        const formData = new FormData(); // Create FormData object
        formData.append("name", name);
        formData.append("price", price);
        formData.append("image", image); // Append the image file to FormData
        formData.append("user", username);

        await axios.post(
          "http://webshop-portfolio-api.vercel.app/addproduct",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set proper content type for FormData
            },
          }
        );
        console.log(username);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImage(null);
    } else {
      setImage(file);
    }
  };

  return (
    <div className={className}>
      <h1>Hi {username}, Add Product Here</h1>
      <div className="form-control justify-content-center root-container">
        <p>Product Name: </p>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <p>Price:$</p>
        <input
          type="number"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </div>

      <div className="form-control justify-content-center root-container  ">
        <p>Image</p>
        <input
          id="fileInput"
          type="file"
          accept="image"
          onChange={handleFileChange}
        />
      </div>
      <div className="form-control justify-content-center root-container">
        <button className="btn btn-dark" onClick={handleClose}>
          CLOSE
        </button>
        <button className="btn btn-success" onClick={handleItem}>
          UPLOAD
        </button>
      </div>
    </div>
  );
};

export default AddproductWindow;
