import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { apiurl } from "./config";
import { getCookie } from "./webStorage.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [storeData, setStoreData] = useState("");
  const [openProfile, setCloseProfile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [permissions, setPermissions] = useState(false);
  const [isPersonalize, setIsPersonalize] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  const token = getCookie("sctoken");

  const setUser = (user) => {
    setUserData(user);
  };
  useEffect(() => {
    setPermissions(userData?.permission);
    // console.log("userData?.user?.permission");
  }, [userData]);

  const [showInternetStatus, setShowInternetStatus] = useState(false);

  useEffect(() => {
    if (!navigator.onLine) {
      setShowInternetStatus(true);
    } else {
      setTimeout(() => {
        setShowInternetStatus(false);
      }, 10000);
    }
  }, [navigator.onLine]);

  console.log("userDatauserData",userData)
  return (
    <UserContext.Provider
      value={{
        token,
        userData,
        setUser,
        storeData,
        setStoreData,
        openProfile,
        setCloseProfile,
        isMenuOpen,
        setIsMenuOpen,
        permissions,
        setPermissions,
        showInternetStatus,
        isPersonalize,
        setIsPersonalize,
        showSearch,
        setShowSearch,
      }}a
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
