import { db, storage } from "../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, collection, getDoc } from "firebase/firestore";

// Function to upload an image to Firebase Storage
export const uploadImage = async (file) => {
  try {
    console.log("Uploading image to Firebase Storage...");
    const storageRef = ref(storage, "images/" + file.name);
    await uploadBytes(storageRef, file);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);

    console.log("Image upload successful. Download URL:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to Firebase Storage:", error);
    throw error;
  }
};

// Function to update the profilePicUrl in Firestore
export const updateProfilePicUrl = async (userId, profilePicUrl) => {
  try {
    console.log(
      "Updating profilePicUrl in Firestore for user with ID:",
      userId
    );
    const usersCollectionRef = collection(db, "users");
    const userDocRef = doc(usersCollectionRef, userId);

    await updateDoc(userDocRef, {
      profilePicUrl: profilePicUrl,
    });

    console.log("ProfilePicUrl updated successfully.");
  } catch (error) {
    console.error("Error updating profilePicUrl in Firestore:", error);
    throw error;
  }
};

// Function to get the profilePicUrl of a user
export const getProfilePicUrl = async (userId) => {
  try {
    console.log(
      "Fetching profilePicUrl from Firestore for user with ID:",
      userId
    );
    const usersCollectionRef = collection(db, "users");
    const userDocRef = doc(usersCollectionRef, userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      console.log("ProfilePicUrl retrieved:", userData.profilePicUrl);
      return userData.profilePicUrl;
    } else {
      console.log("User does not exist.");
      return null;
    }
  } catch (error) {
    console.error("Error getting profilePicUrl:", error);
    return null;
  }
};
