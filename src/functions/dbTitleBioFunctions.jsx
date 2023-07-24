import { db } from "../firebase/firebaseConfig";
import { doc, collection, getDoc, writeBatch } from "firebase/firestore";

export const getUserTitleAndBio = async (userId) => {
  try {
    const usersCollectionRef = collection(db, "users");
    const userDocRef = doc(usersCollectionRef, userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const { title, bio } = userData;
      return { title, bio };
    } else {
      console.log("User does not exist.");
      return null;
    }
  } catch (error) {
    console.error("Error getting title and bio:", error);
    return null;
  }
};

export const updateUserTitleAndBio = async (userId, newTitle, newBio) => {
  try {
    const usersCollectionRef = collection(db, "users");
    const userDocRef = doc(usersCollectionRef, userId);
    const batch = writeBatch(db);

    batch.set(userDocRef, { title: newTitle, bio: newBio }, { merge: true });

    await batch.commit();
    console.log("Title and bio updated successfully.");
    return true;
  } catch (error) {
    console.error("Error updating title and bio:", error);
    throw error;
  }
};
