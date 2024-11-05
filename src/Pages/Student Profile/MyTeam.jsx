import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const MyTeam = () => {
  const { student_id } = useParams();
  const [members, setMembers] = useState([]);
  const [team, setTeam] = useState(""); 
  const [emailInput1, setEmailInput1] = useState("");
  const [emailInput2, setEmailInput2] = useState("");
  const emailRegex = /^[a-zA-Z0-9]+@ugrad\.iiuc\.ac\.bd$/;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/thesis_details/${student_id}`);
        const data = await response.json();
        
        if (response.ok && data[0]?.team) {
          setMembers(data[0].student_ids || []);
          setTeam(data[0].team);
          
        } else {
          setTeam("");
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [student_id]);

  const handleAddMember = async () => {
    const newMemberId1 = emailInput1.split('@')[0].toUpperCase();
    const newMemberId2 = emailInput2 ? emailInput2.split('@')[0].toUpperCase() : null;

    if (members.length >= 2) {
      Swal.fire({ icon: "error", title: "Limit reached", text: "You can add a maximum of 2 members." });
      return;
    }

    if (!emailRegex.test(emailInput1) || (emailInput2 && !emailRegex.test(emailInput2))) {
      Swal.fire({ icon: "error", title: "Invalid Email", text: "Please enter valid email(s)." });
      return;
    }

    if (emailInput1 === emailInput2) {
      Swal.fire({ icon: "error", title: "Duplicate Email", text: "Please enter different emails in both fields." });
      return;
    }

    if (members.includes(newMemberId1) || (newMemberId2 && members.includes(newMemberId2))) {
      Swal.fire({ icon: "error", title: "Duplicate Member", text: "This member has already been added." });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/add-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput1,
          email2: emailInput2,
          ownerId: student_id,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({ icon: "success", title: "Member Added", text: result.message });
        setMembers((prevMembers) => {
          const updatedMembers = [...prevMembers, newMemberId1];
          if (newMemberId2) updatedMembers.push(newMemberId2);
          return updatedMembers;
        });
        setEmailInput1("");
        setEmailInput2("");
        window.location.reload();
      } else {
        Swal.fire({ icon: "error", title: "Error", text: result.message || "An error occurred while adding the member." });
      }
    } catch (error) {
      console.error("Error adding member:", error);
      Swal.fire({ icon: "error", title: "Error", text: error.message || "An error occurred while adding the member." });
    }
  };

  const handleRemoveMember = async (memberId, index) => {
    try {
      const response = await fetch("http://localhost:5000/remove-member", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team: team,
          memberId,
          index
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire({ icon: "success", title: "Member Removed", text: result.message });
        setMembers(members.filter((member) => member !== memberId));
      } else {
        Swal.fire({ icon: "error", title: "Error", text: result.message || "An error occurred while removing the member." });
      }
    } catch (error) {
      console.error("Error removing member:", error);
      Swal.fire({ icon: "error", title: "Error", text: error.message || "An error occurred while removing the member." });
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded shadow max-w-md mx-auto md:max-w-lg lg:max-w-xl">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-purple-800 mb-5">My Team</h2>
        <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
          <input
            type="text"
            placeholder="First member (G Suite)"
            value={emailInput1}
            onChange={(e) => setEmailInput1(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded w-full md:w-auto"
          />
          <input
            type="text"
            placeholder="Second member (optional)"
            value={emailInput2}
            onChange={(e) => setEmailInput2(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded w-full md:w-auto"
          />
          <button
            onClick={handleAddMember}
            className="btn btn-sm px-4 py-2  bg-purple-600 text-white rounded hover:bg-purple-700 w-full md:w-auto"
          >
            Add Member
          </button>
        </div>
      </div>

      {team ? (
        members.length > 0 ? (
          <ul className="space-y-2">
            {members.map((member, index) => (
              <li key={member} className="flex items-center justify-between p-2 bg-white rounded shadow">
                <span>{member}</span>
                <button
                  onClick={() => handleRemoveMember(member, index)}
                  className="px-2 py-1 text-red-600 bg-red-100 rounded hover:bg-red-200"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No team members added yet.</p>
        )
      ) : (
        <p className="text-gray-600 text-center">No team exists for this student.</p>
      )}
    </div>
  );
};

export default MyTeam;
