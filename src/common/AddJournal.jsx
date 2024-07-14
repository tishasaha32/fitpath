import { useState } from "react";
import styles from "./AddJournal.module.css";
// Library imports
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// Custom hook imports
import { useGetUserData } from "../hooks/useGetUserDetails";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { formatDate } from "../helper/formatDate";
import { isJournalAlreadyDone } from "./../helper/db";

function AddJournal({
  setShowAddModal,
  setShowCongratsModal,
  setShowTryModal,
}) {
  const db = getFirestore();

  const [journal, setJournal] = useState("");
  // Hooks consumed
  const userDetails = useGetUserData();

  // Event Handler : Checking if the journal added for today or not
  const handleAddJournal = async (data) => {
    const journalAlreadyDone = await isJournalAlreadyDone(userDetails.uid);
    if (journalAlreadyDone) {
      setShowTryModal(true);
    } else {
      try {
        await addDoc(collection(db, "journal"), {
          id: userDetails.uid,
          journal: journal,
          title: formatDate(new Date()),
        });
      } catch (error) {
        console.log(error, "ADD JOURNAL");
      }
      setJournal("");
      setShowAddModal(false);
      setShowCongratsModal(true);
    }
  };

  return (
    <div className={styles.form}>
      <ReactQuill
        theme="snow"
        value={journal}
        onChange={setJournal}
        style={{
          height: "90vh",
          width: "100vw",
          marginTop: "-2px",
        }}
        placeholder="Write about your day in brief... Like what you learned today, your activities, about anyone you helped and charity that makes you your better self... :)"
      />
      <div className={styles.modalButtonsContainer}>
        <button
          className={styles.closeButton}
          onClick={() => {
            setShowAddModal(false);
          }}
        >
          Close
        </button>
        <button
          className={styles.addButton}
          onClick={() => handleAddJournal(journal)}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddJournal;
