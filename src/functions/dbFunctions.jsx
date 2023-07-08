import { db } from "../firebase/firebaseConfig";
import { doc, setDoc, collection } from "firebase/firestore";
// Function to check if the username is unique
const isUsernameUnique = async (username) => {
  const usersCollectionRef = collection(db, "users");
  const querySnapshot = await usersCollectionRef
    .where("username", "==", username)
    .get();
  return querySnapshot.empty; // Returns true if no documents match the query
};

export const addUserToCollection = async (user) => {
  try {
    const usersCollectionRef = collection(db, "users");
    const userRef = doc(usersCollectionRef, user.uid);
    const userObj = { email: user.email };

    // Check if the displayName is empty or not unique
    if (!user.displayName || !(await isUsernameUnique(user.displayName))) {
      userObj.username = user.uid; // Use uid as the username
    } else {
      userObj.username = user.displayName;
    }

    await setDoc(userRef, userObj);
    console.log("User added to collection:", user);
  } catch (error) {
    console.error("Error adding user to collection:", error);
  }
};
