import { db } from "../firebase/firebaseConfig";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const trackUserVisit = async (userID) => {
  try {
    const analyticsCollectionRef = collection(db, "user-analytics");

    // Get the current timestamp from the server
    const timestamp = serverTimestamp();

    console.log("Tracking user visit:", userID, timestamp);

    await addDoc(analyticsCollectionRef, {
      userID,
      timestamp,
    });

    console.log("User visit tracked:", userID);
  } catch (error) {
    console.error("Error tracking user visit:", error);
  }
};

export const getUserVisitorCount = async (userID, timeFrame) => {
  const analyticsCollectionRef = collection(db, "user-analytics");

  let startDate, endDate;
  let daysUntilStartOfWeek, dayOfWeek;
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
      dayOfWeek = today.getDay();
      daysUntilStartOfWeek = dayOfWeek !== 0 ? dayOfWeek - 1 : 6;
      startDate.setDate(today.getDate() - daysUntilStartOfWeek);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      break;
    case "monthly":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      break;
    case "yearly":
      startDate = new Date(today.getFullYear(), 0, 1);
      endDate = new Date(today.getFullYear(), 11, 31);
      break;
    default:
      throw new Error("Invalid time frame");
  }

  console.log("Query start date:", startDate);
  console.log("Query end date:", endDate);

  const q = query(
    analyticsCollectionRef,
    where("userID", "==", userID),
    where("timestamp", ">=", startDate),
    where("timestamp", "<=", endDate)
  );

  const querySnapshot = await getDocs(q);
  console.log("Query result:", querySnapshot.docs.length);

  return querySnapshot.size;
};
