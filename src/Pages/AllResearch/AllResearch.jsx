import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaSearch, FaFilter } from 'react-icons/fa';

const AllResarch = () => {
  const [thesisData, setThesisData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; 
  
  useEffect(() => {
    fetch('/thesisdetail.json')
      .then(response => response.json())
      .then(data => setThesisData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleViewDetails = (item) => {
    Swal.fire({
      title: item.title,
      html: `<div style="text-align: left;">
        <p><strong>Abstract:</strong> ${item.abstract}</p>
        <p><strong>Student ID:</strong> ${item.student_ids}</p>
        <p><strong>Name:</strong> ${item.student_name}</p>
        <p><strong>Supervisor:</strong> ${item.supervisor}</p>
        <p><strong>Completion Date:</strong> ${item.year_of_Completion}</p>
      </div>`,
      confirmButtonText: 'Close',
      width: '80%',
      padding: '1rem',
    });
  };

  const filteredData = thesisData.filter(item =>
    ((selectedDept === null || selectedDept === "All") || item.dept === selectedDept) &&
    ((selectedType === null || selectedType === "All") || item.type === selectedType) &&
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.area_of_research.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supervisor.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const departments = [
    "All",
    "CSE",
    "EEE",
    "CCE",
    "ETE",
    "CE",
    "Pharmacy",
    "BBA",
    "Law",
    "ELL",
    "ALL",
    "EB",
    "Library & Information Science",
    "QSIS",
    "DIS",
    "SHIS"
  ];

  const types = ["All", "Thesis", "Project"];

  return (
    <div className="mx-auto bg-gray-100 h-[800px] overflow-auto">
    <div className="container bg-gray-100 pt-44 mb-26 p-4">
        <div className="flex flex-col md:flex-row justify-center items-center mb-4">
          <div className="w-full md:w-1/3 mb-2 md:mb-0 mx-2 flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded-md w-full"
            />
            <button
              className="ml-2 p-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 flex items-center"
              onClick={() => {
                console.log("Search clicked with query:", searchQuery);
              }}
            >
              <FaSearch className="m-1" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <button
                onClick={() => setShowDeptDropdown(!showDeptDropdown)}
                className={`p-2 border rounded-md cursor-pointer bg-purple-700 font-bold text-white flex items-center`}
              >
                <FaFilter className="mr-2" />
                {selectedDept ? selectedDept : "Choose department"}
              </button>
              {showDeptDropdown && (
                <div className="absolute mt-1 w-40 bg-white border rounded-md shadow-md z-10">
                  {departments.map(dept => (
                    <div
                      key={dept}
                      onClick={() => {
                        setSelectedDept(dept);
                        setShowDeptDropdown(false);
                      }}
                      className="p-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {dept}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className={`p-2 border rounded-md cursor-pointer bg-purple-700 font-bold text-white flex items-center`}
              >
                <FaFilter className="mr-2" />
                {selectedType ? selectedType : "Choose type"}
              </button>
              {showTypeDropdown && (
                <div className="absolute mt-1 w-40 bg-white border rounded-md shadow-md z-10">
                  {types.map(type => (
                    <div
                      key={type}
                      onClick={() => {
                        setSelectedType(type);
                        setShowTypeDropdown(false);
                      }}
                      className="p-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border">SL</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Area of Research</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Supervisor</th>
                <th className="px-4 py-2 border">Year of Completion</th>
                <th className="px-4 py-2 border">Department</th>
                <th className="px-4 py-2 border">Details</th>
                <th className="px-4 py-2 border">Document</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 border text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-4 py-2 border">{item.title}</td>
                  <td className="px-4 py-2 border">{item.area_of_research}</td>
                  <td className="px-4 py-2 border">{item.type}</td>
                  <td className="px-4 py-2 border">{item.supervisor}</td>
                  <td className="px-4 py-2 border text-center">{item.year_of_Completion}</td>
                  <td className="px-4 py-2 border">{item.dept}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <a
                      href={item.defence}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            className="px-4 py-2 bg-gray-300 rounded mt-1 hover:bg-gray-400 btn btn-sm"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
            className="px-4 py-2 bg-gray-300 mt-1 rounded hover:bg-gray-400 btn btn-sm"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllResarch;
