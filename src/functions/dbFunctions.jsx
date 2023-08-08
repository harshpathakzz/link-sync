import { db } from "../firebase/firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const addUserToCollection = async (user) => {
  try {
    const usersCollectionRef = collection(db, "users");
    const userRef = doc(usersCollectionRef, user.uid);
    const userObj = {
      email: user.email,
      username: user.uid,
      profilePicUrl: "",
      title: "@title",
      bio: "@bio",
    };

    await setDoc(userRef, userObj);
    console.log("User added to collection:", user);
  } catch (error) {
    console.error("Error adding user to collection:", error);
  }
};

export const getDataByUsername = async (username) => {
  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      const userId = querySnapshot.docs[0].id;
      const { title, bio, profilePicUrl } = userData;
      console.log("User data retrieved:", userData);
      return { title, bio, profilePicUrl, id: userId };
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
    throw error;
  }
};
