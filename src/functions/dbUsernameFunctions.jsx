import { db } from "../firebase/firebaseConfig";
import {
  doc,
  collection,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const getUsername = async (userId) => {
  try {
    const usersCollectionRef = collection(db, "users");
    const userDocRef = doc(usersCollectionRef, userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return userData.username;
    } else {
      console.log("User does not exist.");
      return null;
    }
  } catch (error) {
    console.error("Error getting username:", error);
    return null;
  }
};

const isUsernameUnique = async (username) => {
  const usersCollectionRef = collection(db, "users");
  const q = query(usersCollectionRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};

export const updateUsername = async (userId, newUsername) => {
  try {
    const isUnique = await isUsernameUnique(newUsername);
    if (!isUnique) {
      throw new Error("Username is not unique.");
    }

    const usersCollectionRef = collection(db, "users");
    const userDocRef = doc(usersCollectionRef, userId);
    const userObj = { username: newUsername };

    await setDoc(userDocRef, userObj, { merge: true });
    console.log("Username updated successfully.");
    return true;
  } catch (error) {
    console.error("Error updating username:", error);
    throw error;
  }
};

export const getIdByUsername = async (username) => {
  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return userDoc.id;
    } else {
      console.log("User not found.");
      return null;
    }
  } catch (error) {
    console.error("Error getting userId by username:", error);
    return null;
  }
};
