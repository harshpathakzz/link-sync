import { db } from "../firebase/firebaseConfig";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const trackLinkVisit = async (linkID) => {
  try {
    const analyticsCollectionRef = collection(db, "link-analytics");

    // Get the current timestamp from the server
    const timestamp = serverTimestamp();

    console.log("Tracking link visit:", linkID, timestamp);

    await addDoc(analyticsCollectionRef, {
      linkID,
      timestamp,
    });

    console.log("Link visit tracked:", linkID);
  } catch (error) {
    console.error("Error tracking link visit:", error);
  }
};

export const getLinkVisitorCount = async (linkID, timeFrame) => {
  const analyticsCollectionRef = collection(db, "link-analytics");

  let startDate, endDate;
  const today = new Date();
  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  switch (timeFrame) {
    case "daily":
      startDate = todayMidnight;
      endDate = new Date(todayMidnight);
      endDate.setHours(23, 59, 59, 999);
      break;
    case "weekly":
      startDate = new Date(today);
      startDate.setDate(today.getDate() - today.getDay());
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
      break;
    case "monthly":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    default:
      throw new Error("Invalid time frame");
  }

  console.log("Query start date:", startDate);
  console.log("Query end date:", endDate);

  const q = query(
    analyticsCollectionRef,
    where("linkID", "==", linkID),
    where("timestamp", ">=", startDate),
    where("timestamp", "<=", endDate)
  );

  const querySnapshot = await getDocs(q);
  console.log("Query result:", querySnapshot.docs.length);

  return querySnapshot.size;
};

export const getAllLinkVisits = async (linkID) => {
  const analyticsCollectionRef = collection(db, "link-analytics");

  const q = query(analyticsCollectionRef, where("linkID", "==", linkID));

  const querySnapshot = await getDocs(q);
  console.log("Query result:", querySnapshot.docs.length);

  return querySnapshot.size;
};
