import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const SelectedBoard = () => {
  const { student_id } = useParams();
  const [thesisDetail, setThesisDetail] = useState(null);
  const [boardDetail, setBoardDetail] = useState([])
  const [loading, setLoading] = useState(true);


  const thesisDetailRef = useRef([]);
  const BoardDetailRef = useRef([]);

  const [title, setTitle] = useState(null);

  useEffect(() => {
    if (!student_id) {
      console.log("student_id is undefined");
      return;
    }

    const fetchThesisDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/thesis_details/${student_id}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        thesisDetailRef.current = data;
        setThesisDetail(data);
      } catch (error) {
        console.error("Error fetching thesis details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThesisDetails();
  }, [student_id]);

  useEffect(() => {
    if (thesisDetail && thesisDetail.length > 0) {
      console.log(thesisDetail[0].title);
      setTitle(thesisDetail[0].title);
    }
  }, [thesisDetail]);


  console.log("Thesis outside useEffect:", thesisDetail);

  useEffect(() => {

    const fetchBoardDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/board_details/thesis/${title}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        BoardDetailRef.current = data;
        setBoardDetail(data);
      } catch (error) {
        console.error("Error fetching thesis details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardDetails();
  }, [title]);

  useEffect(() => {
    if (boardDetail && boardDetail.length > 0) {
      console.log(boardDetail);

    }
  }, [boardDetail]);


  console.log("Board outside useEffect:", boardDetail);


  if (loading) {
    return <Loading />;
  }

  if (!thesisDetail) {
    return <div className="p-4">No thesis details found for this student ID.</div>;
  }


  const {
    proposal_board = "Pending",
    proposal_date = "Pending",

    pre_defense_board = "Pending",
    pre_defense_date = "Pending",
    pre_defense_status = "Pending",
    defense_board = "Pending",
    defense_date = "Pending",
    defense_status = "Pending",
  } = thesisDetail;

  const getStatusTextColor = (status) => {
    switch (status) {
      case "Accepted":
        return "text-green-500 font-bold";
      case "Pending":
        return "text-orange-500 font-bold";
      case "Rejected":
        return "text-red-500 font-bold";
      default:
        return "text-gray-500 font-bold";
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center text-purple-800">Selected Board</h2>
      <div className="mt-4">
        <div className="bg-white text-black p-4 rounded-lg shadow-md mb-4">
          <strong>Proposal Board:</strong>{" "}

          {boardDetail && boardDetail.type === "Proposal" ? (
            <span className="font-bold text-green-600">{boardDetail.boardName}</span>
          ) : (
            <span className={getStatusTextColor(proposal_board || "Unknown")}>
              {proposal_board || "No Date Available"}
            </span>
          )}
          <br></br>

          <strong>Proposal Date:</strong>{" "}
          {boardDetail ? (
            <>

              {boardDetail.type === "Proposal" && (
                <span className="font-bold text-green-600">{boardDetail.date}</span>
              )}
            </>
          ) : (
            <span className={getStatusTextColor(proposal_date)}>{proposal_date}</span>
          )}
          <br></br>

        </div>
        <div className="bg-white text-black p-4 rounded-lg shadow-md mb-4">
          <strong>Pre-Defense Board:</strong>{" "}
          {boardDetail && boardDetail.type === "Pre-Defense" ? (
            <span className="font-bold text-green-600">{boardDetail.boardName}</span>
          ) : (
            <span className={getStatusTextColor(pre_defense_board || "Unknown")}>
              {pre_defense_board || "No Date Available"}
            </span>
          )}
          <br></br>

          <strong>Pre-Defense Date:</strong>{" "}
          {boardDetail && boardDetail.type === "Pre-Defense" ? (
            <span className="font-bold text-green-600">{boardDetail.date}</span>
          ) : (
            <span className={getStatusTextColor(pre_defense_date || "Unknown")}>
              {pre_defense_date || "No Date Available"}
            </span>
          )}

          <br></br>

        </div>
        <div className="bg-white text-black p-4 rounded-lg shadow-md mb-4">
          <strong>Defense Board:</strong>{" "}
          {boardDetail && boardDetail.type === "Defense" ? (
            <span className="font-bold text-green-600">{boardDetail.boardName}</span>
          ) : (
            <span className={getStatusTextColor(defense_board || "Unknown")}>
              {defense_board || "No Date Available"}
            </span>
          )}
          <br></br>
          <strong>Defense Date:</strong>{" "}
          {boardDetail && boardDetail.type === "Defense" ? (
            <span className="font-bold text-green-600">{boardDetail.date}</span>
          ) : (
            <span className={getStatusTextColor(defense_date || "Unknown")}>
              {defense_date || "No Date Available"}
            </span>
          )}

          <br></br>
        </div>
      </div>
    </div>
  );
};

export default SelectedBoard;
