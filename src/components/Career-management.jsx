import React, { useState, useEffect } from "react";
import Table from "./Table";
import filterIcon from "../assets/svg/filter-icon.svg";
import { useNavigate } from "react-router-dom";
import AddCareer from "./AddCareer";
import addIcon from "../assets/svg/Rectangle.svg";
import { getCareers } from "../context/services/client";

export default function CareerManagement() {
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [existingCareer, setExistingCareer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    fetchCareers(currentPage);
  }, [currentPage]);

  const fetchCareers = async (page) => {
    const response = await getCareers({ page, limit: 10 });
    if (response.status === 200) {
      setCareers(response?.data?.data?.list);
      setTotalPages(Math.ceil(response?.data?.data?.totalCount / 10));
      // setCareers(response.data.list);
      // setTotalPages(Math.ceil(response.data.totalCount / 10));
    } else {
      console.error('Failed to fetch careers:', response.message);
      setCareers([]);
    }
  };

  const openAddForm = (row) => {
    if (row) {
      setExistingCareer(row);
    }
    setIsAdd(!isAdd);
  };

  const handleBack = () => {
    setIsAdd(false);
  };

  return (
    <div className="flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]">
      <div className="flex justify-between">
        <h1 className="text-text text-[1.5rem] font-[600]">
           {isAdd ? "Add New Career Path" : "Career Management"}
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
        <AddCareer
          handleBack={handleBack}
          initialData={existingCareer}
          fetchCareers={fetchCareers}
        />
      ) : (
        <Table
          columns={[
            { name: "Latest Qualification", enableSorting: true, searchingEnabled: true },
            { name: "Specialization", enableSorting: true, searchingEnabled: true },
            { name: "Tags", enableSorting: true, searchingEnabled: true }
          ]}
          data={careers}
          mapping={["latestQualification", "specialization", "coursesName"]}
          fun={openAddForm} // Define how to handle row click
          viewDetails={() => {}} // Define how to handle view details
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}