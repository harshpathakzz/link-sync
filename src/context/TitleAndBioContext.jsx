import { createContext, useContext, useEffect, useState } from "react";
import { useUserAuth } from "./UserAuthContext";
import {
  getUserTitleAndBio,
  updateUserTitleAndBio,
} from "../functions/dbTitleBioFunctions";
import {
  updateProfilePicUrl,
  uploadImage,
  getProfilePicUrl,
} from "../functions/dbImageFunctions";

const TitleAndBioContext = createContext();

export const TitleAndBioProvider = ({ children }) => {
  const { user } = useUserAuth();
  const [profilePicURL, setProfilePicURL] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const { title, bio } = await getUserTitleAndBio(user.uid);
          setTitle(title);
          setBio(bio);

          const profilePicUrl = await getProfilePicUrl(user.uid);
          setProfilePicURL(profilePicUrl);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

  const handleUploadImage = async (file) => {
    try {
      const downloadURL = await uploadImage(file);

      if (downloadURL) {
        await updateProfilePicUrl(user.uid, downloadURL);
        setProfilePicURL(downloadURL);
        console.log("Image uploaded successfully.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
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
        handleUploadImage,
      }}
    >
      {children}
    </TitleAndBioContext.Provider>
  );
};

export const useTitleAndBioContext = () => useContext(TitleAndBioContext);
