/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./accountwindow.css";
import axios from "axios";

const AccountWindow = ({ isVisible, onClose }) => {
  const handleClose = () => {
    onClose(); // Call the onClose function passed from the parent component
  };
  const className = `${isVisible ? "accountwindow-container" : ""}`;

  const usernameToken = localStorage.getItem("username");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await axios.post("http://3.25.143.30:3001/accountinfo", {
          username: usernameToken,
        });

        setUserData(res.data);
        setCurrPass(res.data.password);
      } catch (error) {
        // Handle errors
      }
    }
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function updatePassword() {
      if (!currPass) {
        setCurrPass(userData[0]?.password);
      } else {
      }
    }
    updatePassword();
  });

  const [btnText, setBtnTxt] = useState("Change Password");
  const [isDisabled, setIsDisabled] = useState(true);
  const [currPass, setCurrPass] = useState("");
  function handlePassword() {
    if (btnText === "Change Password") {
      setIsDisabled(false);
      setBtnTxt("Submit Change");
    } else if (currPass === "") {
      alert("Empty Password");
    } else {
      setIsDisabled(true);
      setBtnTxt("Change Password");

      async function savePassword() {
        try {
          const res = await axios.post("http://3.25.143.30:3001/savepassword", {
            username: userData.username,
            newPassword: currPass,
          });
        } catch (error) {
          console.error("Error updating password:", error);
        }
      }
      savePassword();
    }
  }
  ////////End of user validation
  /////////////////////////////////////////////////////////////////////////
  //Fetch user product
  const [userProduct, setUserProduct] = useState([]);

  useEffect(() => {
    async function fetchUserProduct(e) {
      try {
        const res = await axios.post("http://3.25.143.30:3001/getuserproduct", {
          user: usernameToken,
        });

        setUserProduct(res.data);
      } catch (error) {}
    }
    fetchUserProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [productId, setProductId] = useState([]);
  useEffect(() => {
    const ids = userProduct.map((product) => product._id);
    setProductId(ids);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProduct]);

  function handleUserProduct() {
    return userProduct.map((product, index) => (
      <div key={index} className="product-data-container form-control ">
        <div>
          <p>{product.name}</p>
        </div>
        <div>
          <p>{product.price}</p>
        </div>
        <div>
          <button
            className="btn btn-warning"
            onClick={() => handleRemoveProduct(index)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  }

  //remove product

  async function handleRemoveProduct(index) {
    try {
      const res = await axios.post(
        "http://3.25.143.30:3001/removeuserproduct",
        {
          _id: productId[index],
        }
      );

      setUserProduct((prevUserProduct) => {
        const updatedUserProduct = [...prevUserProduct];
        updatedUserProduct.splice(index, 1); // Remove the product at the specified index
        return updatedUserProduct;
      });
      alert("Removed Succesfull Refresh to update marketplace");
    } catch (error) {
      console.error("Error removing product:", error);
    }
  }

  ///////////End of User Product Validation
  ///////////////////////////////////////////////////

  return (
    <div className={className}>
      <div className="password-main-container">
        <h1>Welcome "{usernameToken}"</h1>
        <button className="btn btn-dark" onClick={handleClose}>
          Close
        </button>
      </div>

      <p>Your Information: </p>
      <div>
        <div className="account-info-container form-control">
          <p>Username: {userData.username}</p>
          <div>
            <div className="input-pass-container">
              <p>Password :</p>
              <input
                type="text"
                disabled={isDisabled}
                onChange={(e) => setCurrPass(e.target.value)}
                placeholder={currPass}
              />
            </div>

            <button
              className="btn btn-outline-success btn-pwd"
              onClick={handlePassword}
            >
              {btnText}
            </button>
          </div>

          <p>Email: {userData.email}</p>
        </div>
      </div>
      <div className="userProduct-container form-control">
        <div className="product-label-container form-control">
          <div>Name</div>
          <div>Price</div>
          <div>Action</div>
        </div>
        <div>{handleUserProduct()}</div>
      </div>
    </div>
  );
};

export default AccountWindow;
