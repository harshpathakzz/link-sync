import { db } from "../firebase/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";

// Function to add a theme to the collection
export const addThemeToCollection = async (userId) => {
  const themeObj = {
    userId: userId,
    backgroundImageUrl:
      "https://firebasestorage.googleapis.com/v0/b/link-sync-64286.appspot.com/o/background%2Fmountains.png?alt=media&token=a52a821a-2b17-4f47-ac8e-a513f7af3a7d",
    glassmorphism: true,
    buttonColor: "#333",
    buttonRadius: "10px",
  };
  const docRef = await addDoc(collection(db, "themes"), themeObj);
  return docRef.id;
};

// Function to get a theme by userId
export const getThemeByUserId = async (userId) => {
  const themesQuery = query(
    collection(db, "themes"),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(themesQuery);

  if (querySnapshot.empty) {
    return null; // No theme found for the userId
  }

  const themeDoc = querySnapshot.docs[0];
  return themeDoc.data();
};

// Function to update a theme by userId
export const updateThemeByUserId = async (userId, updatedThemeData) => {
  const themesQuery = query(
    collection(db, "themes"),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(themesQuery);

  if (querySnapshot.empty) {
    throw new Error("Theme not found for the userId");
  }

  const themeDoc = querySnapshot.docs[0];
  const themeRef = doc(collection(db, "themes"), themeDoc.id);

  await updateDoc(themeRef, updatedThemeData);
};

// Function to upload an image to Firebase Storage
export const uploadBackground = async (file) => {
  try {
    console.log("Uploading image to Firebase Storage...");
    const storageRef = ref(storage, "background/" + file.name); // Corrected the folder name
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
