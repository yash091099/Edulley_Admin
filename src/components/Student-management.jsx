import React, { useState, useEffect } from "react";
import addIcon from "../assets/svg/Rectangle.svg";
import filterIcon from "../assets/svg/filter-icon.svg";
import Table from "./Table";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../context/services/client";
import ViewVUser from "./ViewUser";
import CustomLoader from "./loader";

export default function StudentManagement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [add, setAdd] = useState(false);
  const [existingStudent, setExistingStudent] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const fetchStudents = async (page) => {
    setLoading(true);
    try {
      const response = await getAllStudents({ page: page, limit: 10 });
      if (response.status === 200) {
        setStudents(response.data?.data?.list);
        setFilteredStudents(response?.data?.data?.list);
        setTotalPages(Math.ceil(response?.data?.data?.totalCount / 10));
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
    { name: "gender", enableSorting: true, searchingEnabled: true },
    { name: "PHONE", enableSorting: true, searchingEnabled: true },
    { name: "DATE JOINED", enableSorting: true, searchingEnabled: true },
  ];

  const mapping = ["fullName", "email", "gender", "contactNumber", "createdAt"];

  const openAddForm = () => {
    setAdd(!add);
  };

  const handleEdit = (row) => {
    setExistingStudent(row);
    openAddForm();
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    if (value) {
      const lowercasedFilter = value.toLowerCase();
      const filteredData = students.filter(
        (item) =>
          item.fullName.toLowerCase().includes(lowercasedFilter) ||
          item.email.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredStudents(filteredData);
    } else {
      setFilteredStudents(students);
    }
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
    setFilter("");
    setFilteredStudents(students);
  };

  

  return (
    <>
      {loading && <CustomLoader />}
      <div className="flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]">
        <div className="flex justify-between">
          <h1 className="text-text text-[1.5rem] font-[600]">
            Student Management {add ? "> Add" : ""}
          </h1>
          <div className="flex justify-between gap-[0.2rem]">
            <button
              className="flex gap-[0.25rem] items-center border border-[#89BF2C] px-[1.5rem] py-[0.5rem] rounded-[0.5rem]"
              onClick={toggleFilterModal}
            >
              <img src={filterIcon} alt="filter" />
              <p className="text-text text-[0.75rem] font-[600]">Filter</p>
            </button>
            <button
              onClick={openAddForm}
              className="flex gap-[0.25rem] items-center border border-[#89BF2C] px-[1.5rem] py-[0.5rem] rounded-[0.5rem]"
            >
              <img src={addIcon} alt="add" />
              <p className="text-text text-[0.75rem] font-[600]">
                {add ? "Back" : "Add"}
              </p>
            </button>
          </div>
        </div>
        {showFilterModal && (
          <div className="modal-background">
            <div className="modal-content">
              <h2>Filter Students</h2>
              <input
                type="text"
                placeholder="Search by name or email"
                value={filter}
                onChange={handleFilterChange}
                className="filter-input"
              />
              <div className="modal-footer">
                <button onClick={toggleFilterModal} className="modal-close-btn">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {add ? (
          <ViewVUser
            handleBack={openAddForm}
            initialData={existingStudent}
          />
        ) : (
          <Table
            component="Student"
            columns={columns}
            data={filteredStudents?.map((student) => ({
              ...student,
            }))}
            mapping={mapping}
            fun={handleEdit}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}
