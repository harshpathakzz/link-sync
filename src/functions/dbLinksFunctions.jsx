import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  writeBatch,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Add a new link
export const createLink = async (userId, title, url) => {
  const linksRef = collection(db, "links");

  const newLink = {
    userId,
    title,
    url,
    visibility: true,
    // Add the linkId field to the link data model
    linkId: "", // We'll fill this field with the document ID once it's created
  };

  const docRef = await addDoc(linksRef, newLink);

  // Update the linkId field with the document ID
  await updateDoc(docRef, {
    linkId: docRef.id,
  });

  return docRef.id;
};

// Get a link by ID
export const getLinkById = async (id) => {
  const linkDocRef = doc(db, "links", id);
  const docSnap = await getDoc(linkDocRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // handle error
    return null; // Return null to indicate link not found
  }
};

// Delete a link
export const deleteLink = async (id) => {
  try {
    const linkDocRef = doc(db, "links", id);
    await deleteDoc(linkDocRef);
  } catch (error) {
    console.error("Error deleting link:", error);
    throw error;
  }
};

// Update a link
export const updateLink = async (id, title, url) => {
  const linkDocRef = doc(db, "links", id);

  const batch = writeBatch(db);

  batch.update(linkDocRef, {
    title,
    url,
  });

  await batch.commit();
};

// Function to get all links for a specific user by their userId
export const getLinksByUserId = async (userId) => {
  try {
    const linksRef = collection(db, "links");
    const querySnapshot = await getDocs(
      query(linksRef, where("userId", "==", userId))
    );

    const links = querySnapshot.docs.map((doc) => doc.data());

    return links;
  } catch (error) {
    console.error("Error getting links by userId:", error);
    throw error;
  }
};

// Function to change the visibility of a link
export const changeLinkVisibility = async (linkId, visibility) => {
  try {
    const linkDocRef = doc(db, "links", linkId);
    await updateDoc(linkDocRef, { visibility });
  } catch (error) {
    console.error("Error changing link visibility:", error);
    throw error;
  }
};
