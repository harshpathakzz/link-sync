import { db } from "../firebase/firebaseConfig";
import { doc, setDoc, collection } from "firebase/firestore";
import { addThemeToCollection } from "./dbThemeFunctions";

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
    await addThemeToCollection(user.uid);
    console.log("Theme added to collection");
  } catch (error) {
    console.error("Error adding user to collection:", error);
  }
};
