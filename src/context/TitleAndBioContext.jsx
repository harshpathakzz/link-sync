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
import {
  getUsername as dbGetUsername,
  updateUsername as dbUpdateUsername,
} from "../functions/dbUsernameFunctions";

const TitleAndBioContext = createContext();

export const TitleAndBioProvider = ({ children }) => {
  const { user } = useUserAuth();
  const [profilePicURL, setProfilePicURL] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const { title, bio } = await getUserTitleAndBio(user.uid);
          setTitle(title);
          setBio(bio);

          const profilePicUrl = await getProfilePicUrl(user.uid);
          setProfilePicURL(profilePicUrl);

          // Fetch username and set it to the state
          const fetchedUsername = await dbGetUsername(user.uid);
          setUsername(fetchedUsername);
          console.log("Username:", fetchedUsername);
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

  const handleUpdateUsername = async (newUsername) => {
    try {
      if (user) {
        await dbUpdateUsername(user.uid, newUsername);
        setUsername(newUsername);
        console.log("Username updated successfully.");
      }
    } catch (error) {
      console.error("Error updating username:", error);
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
        username,
        setUsername,
        handleUpdateTitleAndBio,
        handleUploadImage,
        handleUpdateUsername,
      }}
    >
      {children}
    </TitleAndBioContext.Provider>
  );
};

export const useTitleAndBioContext = () => useContext(TitleAndBioContext);
