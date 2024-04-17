import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        setIsLoggedIn(!!authToken);
      } catch (error) {
        console.error("Error fetching token:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();

    const clearTokenOnUnload = () => {
      localStorage.removeItem("authToken");
    };

    window.addEventListener("beforeunload", clearTokenOnUnload);

    return () => {
      window.removeEventListener("beforeunload", clearTokenOnUnload);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/loginpage" />;
};

export default PrivateRoute;
