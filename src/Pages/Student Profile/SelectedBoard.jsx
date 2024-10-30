import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const SelectedBoard = () => {
  const { student_id } = useParams();
  const [thesisDetail, setThesisDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThesisDetails = async () => {
      try {
        const response = await fetch('/thesisdetail.json'); 
        const data = await response.json();
        const detail = data.find(thesis => thesis.student_ids.includes(student_id));
        setThesisDetail(detail);
      } catch (error) {
        console.error("Error fetching thesis details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThesisDetails();
  }, [student_id]);

  if (loading) {
    return <Loading></Loading>
  }

  if (!thesisDetail) {
    return <div className="p-4">No thesis details found for this student ID.</div>;
  }

  const {
    proposal_board,
    proposal_date,
    proposal_status,
    pre_defense_board,
    pre_defense_date,
    pre_defense_status,
    defense_board,
    defense_date,
    defense_status
  } = thesisDetail;

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'text-green-500 font-bold'; 
      case 'Pending':
        return 'text-orange-500 font-bold'; 
      case 'Rejected':
        return 'text-red-500 font-bold'; 
      default:
        return 'text-gray-500 font-bold';
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center text-purple-800">Selected Board</h2>
      <div className="mt-4">
        <div className="bg-white text-black p-4 rounded-lg shadow-md mb-4">
          <strong>Proposal Board:</strong> {proposal_board}<br />
          <strong>Proposal Date:</strong> {proposal_date}<br />
          <strong>Status:</strong> <span className={getStatusTextColor(proposal_status)}>{proposal_status}</span>
        </div>
        <div className="bg-white text-black p-4 rounded-lg shadow-md mb-4">
          <strong>Pre-Defense Board:</strong> {pre_defense_board}<br />
          <strong>Pre-Defense Date:</strong> {pre_defense_date}<br />
          <strong>Status:</strong> <span className={getStatusTextColor(pre_defense_status)}>{pre_defense_status}</span>
        </div>
        <div className="bg-white text-black p-4 rounded-lg shadow-md mb-4">
          <strong>Defense Board:</strong> {defense_board}<br />
          <strong>Defense Date:</strong> {defense_date}<br />
          <strong>Status:</strong> <span className={getStatusTextColor(defense_status)}>{defense_status}</span>
        </div>
      </div>
    </div>
  );
};

export default SelectedBoard;
