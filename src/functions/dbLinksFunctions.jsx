import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

// Add a new link
export const createLink = async (userId, title, url) => {
  const linksRef = collection(db, "links");

  const newLink = {
    userId,
    title,
    url,
    visibility: true,
  };

  const docRef = await addDoc(linksRef, newLink);

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
  const linkDocRef = doc(db, "links", id);
  await deleteDoc(linkDocRef);
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
