import React, { useState } from "react";
import styles from "./PastJounal.module.css";
// MUI componets
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// Components imports
import NoData from "./NoData";
import { getJournalHistory } from "../helper/db";
import nodatasearch from "../assets/nodata-search.png";
import { useGetUserData } from "../hooks/useGetUserDetails";

function PastJournal({ setShowPastModal }) {
  const [history, setHistory] = useState(null); // State to store previous data
  const [noData, setNoData] = useState(null); // State to check if data is available or not

  const userDetails = useGetUserData();
  const handleChange = async (e) => {
    getJournalHistory(e.$d.toString(), setHistory, setNoData, userDetails.uid);
  };
  return (
    <div className={styles.form}>
      <div style={{ marginLeft: "15px", marginBottom: "20px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DesktopDatePicker
              label="Select The Date "
              onChange={(e) => handleChange(e)}
              sx={{
                width: "95%",
                maxWidth: "800px",
                margin: " 70px auto 1rem auto",
              }}
              disableFuture
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      {/* Initial Page : No Data Fallback */}
      {!history && !noData && <NoData />}
      {/* 
       // ***********************
      //* Result Part 
      // ************************
      */}
      {history && (
        <div
          style={{ width: "100vw", display: "flex", justifyContent: "center" }}
        >
          <Card className={styles.journal}>
            <CardActionArea>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWlW6wI75l-uxSuvzBLQasW0YhqNHkerecng&s"
                style={{ objectFit: "cover", height: "180px", width: "90vw" }}
                alt="cover_image"
              />
              <CardContent>
                <div dangerouslySetInnerHTML={{ __html: history }} />
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      )}
      {/* 
      // ***********************
      //* No Data Part
      // ************************
      */}
      {noData && (
        <div
          style={{ height: "70vh", textAlign: "center", paddingTop: "3rem" }}
        >
          <img alt="no data" src={nodatasearch} />
          <h3 style={{ padding: "1rem", fontSize: "1rem" }}>
            Nothing no show.
            <br />
            Are you sure you wrote your story that day?
          </h3>
        </div>
      )}
    </div>
  );
}

export default PastJournal;
