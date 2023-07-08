import { createContext, useContext, useEffect, useState } from "react";
import { listenToAuthChanges } from "../functions/authFunctions";

const userAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = listenToAuthChanges(setUser, setIsLoggedIn);

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <userAuthContext.Provider
      value={{
        user,
        isLoggedIn,
        setUser,
        setIsLoggedIn,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
