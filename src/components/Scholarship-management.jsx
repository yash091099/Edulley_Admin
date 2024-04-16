import React, { useState, useEffect } from "react";
import filterIcon from "../assets/svg/filter-icon.svg";
import addIcon from "../assets/svg/Rectangle.svg";
import { useNavigate } from "react-router-dom";
import AddScholarship from "./AddScholorship";
import CourseTable from "./CourseTable"; // Consider renaming this to ScholarshipTable for clarity
import { getAllScholarships } from "../context/services/client";

export default function ScholarshipManagement() {
  const navigate = useNavigate();
  const [existingScholarship, setExistingScholarship] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchScholarships();
  }, [currentPage]);

  const fetchScholarships = async () => {
    const queryParams = { page: currentPage, limit: 10 }; // Adjust according to your needs
    const response = await getAllScholarships(queryParams);
    if (response.status === 200) {
      setData(response?.data?.data?.list);
      setTotalCount(response?.data?.data?.totalCount);
      setTotalPages(Math.ceil(response?.data?.data?.totalCount / queryParams.limit));

      // setTotalCount(response.data.totalCount);
      // setTotalPages(Math.ceil(response.data.totalCount / queryParams.limit));
    } else {
      console.error("Failed to fetch scholarships:", response.message);
      setData([]); // Clear data on failure
    }
  };

  const openAddForm = (row) => {
    if (row) {
      setExistingScholarship(row);
    }
    setIsAdd(!isAdd);
  };

  const editScholarship = (scholarship) => {
    setExistingScholarship(scholarship);
    setIsAdd(true);
  };

  const handleBack = () => {
    setIsAdd(false);
    setExistingScholarship(null);
  };

  return (
    <div className="flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]">
      <div className="flex justify-between">
        <h1 className="text-text text-[1.5rem] font-[600]">
          Scholarship Management {isAdd ? "> Add" : ""}
        </h1>
        <div className="flex justify-between gap-[0.2rem]">
          <button className="flex gap-[0.25rem] items-center border border-[#89BF2C] px-[1.5rem] py-[0.5rem] rounded-[0.5rem]">
            <img src={filterIcon} alt="filter" />
            <p className="text-text text-[0.75rem] font-[600]">Filter</p>
          </button>
          <button
            onClick={openAddForm}
            className="flex gap-[0.25rem] items-center border border-[#89BF2C] px-[1.5rem] py-[0.5rem] rounded-[0.5rem]"
          >
            <img src={addIcon} alt="add" />
            <p className="text-text text-[0.75rem] font-[600]">
              {isAdd ? "Back" : "Add"}
            </p>
          </button>
        </div>
      </div>
      {isAdd ? (
        <AddScholarship
          handleBack={handleBack}
          initialData={existingScholarship}
        />
      ) : (
        <CourseTable
          columns={[
            {
              name: "Scholarship Name",
              enableSorting: true,
              searchingEnabled: true,
            },
            { name: "Amount", enableSorting: true, searchingEnabled: true },
            { name: "Deadline", enableSorting: true, searchingEnabled: true },
            { name: "University", enableSorting: true, searchingEnabled: true },
            { name: "Course", enableSorting: true, searchingEnabled: true },
          ]}
          data={data}
          mapping={["Name", "amount", "deadline", "universityName", "coursesName"]}
          editScholarship={editScholarship}
          currentPage={currentPage}
          totalPages={totalPages}
          fun={openAddForm}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}