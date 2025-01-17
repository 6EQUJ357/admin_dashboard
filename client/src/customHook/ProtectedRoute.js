import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('webtoken'); // Replace with your token storage method

    if (!token) {
      return <Navigate to="/" />;
    }
  
    return children;
};

export default ProtectedRoute;



