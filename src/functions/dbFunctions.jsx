import { db } from "../firebase/firebaseConfig";
import { doc, setDoc, collection } from "firebase/firestore";

export const addUserToCollection = async (user) => {
  try {
    const usersCollectionRef = collection(db, "users");
    const userRef = doc(usersCollectionRef, user.uid);
    const userObj = { email: user.email }; // Create a shallow copy of the user object
    await setDoc(userRef, userObj);
    console.log("User added to collection:", user);
  } catch (error) {
    console.error("Error adding user to collection:", error);
  }
};
