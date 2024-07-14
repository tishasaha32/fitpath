import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { formatDate, formatDateForHistory } from "./formatDate";

const db = getFirestore();
export const getJournalHistory = async (
  date,
  setHistory,
  setNoData,
  userId
) => {
  const formattedDate = formatDateForHistory(date);

  try {
    const q = query(
      collection(db, "journal"),
      where("id", "==", userId),
      where("title", "==", formattedDate)
    );

    const querySnapshot = await getDocs(q);

    console.log("get journal");

    if (querySnapshot.empty) {
      setNoData(true);
      setHistory(null);
    } else {
      setNoData(false);
      const historyData = querySnapshot.docs.map((doc) => doc.data());
      console.log(historyData[0].journal);
      setHistory(historyData[0].journal);
    }
  } catch (error) {
    console.log(error, "GET JOURNAL HISTORY");
  }
};

export const isJournalAlreadyDone = async (userId) => {
  const db = getFirestore();
  const formattedDate = formatDate(new Date());

  try {
    const q = query(
      collection(db, "journal"),
      where("id", "==", userId),
      where("title", "==", formattedDate)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error, "JOURNAL ALREADY DONE");
    return false; // Ensure a boolean is returned in case of an error
  }
};
