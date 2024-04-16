import React, { useEffect, useState } from "react";
import addIcon from "../assets/svg/Rectangle.svg";
import Table from "./Table";
import filterIcon from "../assets/svg/filter-icon.svg";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../context/services/client";
import ViewVUser from "./ViewUser";

export default function StudentManagement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [add, setAdd] = useState(false);
  const [existingStudent, setExistingStudent] = useState(null);

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const fetchStudents = async (page) => {
    setLoading(true);
    try {
      const response = await getAllStudents({ page: page, limit: 10 }); // Ensure this function accepts page as a parameter
      if (response.status === 200) {
        setStudents(response?.data?.data?.list);
        setTotalPages(
          Math.ceil(
            response?.data?.data?.totalCount / response?.data?.data?.limit
          )
        );
        // setTotalPages(Math.ceil(response.data.totalCount / response.data.limit));
      } else {
        console.error("Failed to fetch student data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
    setLoading(false);
  };

  const columns = [
    { name: "NAME", enableSorting: true, searchingEnabled: true },
    { name: "EMAIL", enableSorting: true, searchingEnabled: true },
    { name: "ADDRESS", enableSorting: true, searchingEnabled: true },
    { name: "PHONE", enableSorting: true, searchingEnabled: true },
    { name: "DATE JOINED", enableSorting: true, searchingEnabled: true },
  ];

  const mapping = ["Name", "Email", "Address", "Phone", "Date Joined"];

  const handleRowClick = (student) => {
    if (student) {
    setExistingStudent(student);
    }
    setAdd(!add);
  };
  return (
    <div className="flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]">
      <div className="flex justify-between">
        <h1 className="text-text text-[1.5rem] font-[600]">
          {" "}
          Student Management {add ? "> Add" : ""}
        </h1>
        <div className="flex justify-between gap-[0.2rem]">
          <button className="flex gap-[0.25rem] items-center border border-[#89BF2C] px-[1.5rem] py-[0.5rem] rounded-[0.5rem]">
            <img src={filterIcon} alt="filter" />
            <p className="text-text text-[0.75rem] font-[600]">Filter</p>
          </button>
          <button
            onClick={handleRowClick}
            className="flex gap-[0.25rem] items-center border border-[#89BF2C] px-[1.5rem] py-[0.5rem] rounded-[0.5rem]"
          >
            <img src={addIcon} alt="add" />
            <p className="text-text text-[0.75rem] font-[600]">
              {add ? "Back" : "Add"}
            </p>
          </button>
        </div>
      </div>
      {add ? (
      <ViewVUser
          handleBack={handleRowClick}
          initialData={existingStudent}
        />
      ) : (
        <Table
          component="Student"
          columns={columns}
          data={students.map((student) => ({
            Name: student?.fullName,
            Email: student?.email,
            Address: student?.mailingAddress?.addressLine1,
            Phone: student?.contactNumber,
            DateJoined:
              student?.createdAt &&
              new Date(student?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            ...student,
          }))}
          mapping={mapping}
          fun={handleRowClick}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
