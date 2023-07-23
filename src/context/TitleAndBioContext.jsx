import { createContext, useContext, useEffect, useState } from "react";
import { useUserAuth } from "./UserAuthContext";
import {
  getUserTitleAndBio,
  updateUserTitleAndBio,
} from "../functions/dbTitleBioFunctions";

const TitleAndBioContext = createContext();

export const TitleAndBioProvider = ({ children }) => {
  const { user } = useUserAuth();
  const [profilePicURL, setProfilePicURL] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchTitleAndBio = async () => {
      try {
        if (user) {
          const { title, bio } = await getUserTitleAndBio(user.uid);
          setTitle(title);
          setBio(bio);
        }
      } catch (error) {
        console.error("Error getting title and bio:", error);
      }
    };

    if (user) {
      fetchTitleAndBio();
    } else {
      setTitle("");
      setBio("");
    }
  }, [user]);

  const handleUpdateTitleAndBio = async (newTitle, newBio) => {
    try {
      if (user) {
        await updateUserTitleAndBio(user.uid, newTitle, newBio);
        setTitle(newTitle);
        setBio(newBio);
        console.log("Title and bio updated successfully.");
      }
    } catch (error) {
      console.error("Error updating title and bio:", error);
    }
  };

  return (
    <TitleAndBioContext.Provider
      value={{
        profilePicURL,
        setProfilePicURL,
        title,
        setTitle,
        bio,
        setBio,
        handleUpdateTitleAndBio,
      }}
    >
      {children}
    </TitleAndBioContext.Provider>
  );
};

export const useTitleAndBioContext = () => useContext(TitleAndBioContext);
