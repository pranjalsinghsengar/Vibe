import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "./validateToken.js";
import { getCookie } from "./webStorage.js";
import { useUser } from "./userProvider.js";
import { InfiLoader } from "../components/loader.js";

const ProtectedRoute = ({ element: Element }) => {
  const { setUser, permissions } = useUser();
  const [isValidated, setIsValidated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("sctoken");
    if (!token) {
      window.location.href = "/login";
    }

    validateToken(token)
      .then((user) => {
        // console.log("user PrivateRoute", user);
        if (user?.success === true) {
          setIsValidated(true);
          setUser(user?.user);
        } else {
          setIsValidated(false);
        }
      })
      .catch((error) => {
        console.error("Token validation failed:", error);
        setIsValidated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <InfiLoader maintext="Verifying.." />;
  }
  return isValidated ? <>{Element}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
