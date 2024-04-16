import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import filterIcon from "../assets/svg/filter-icon.svg";
import addIcon from "../assets/svg/Rectangle.svg";
import AddInstituteForm from "./AddInstitute";
import InstitutionTable from "./institution-table";
import { getAllInstitutes } from "../context/services/client";
import TableButton from "./TableButton";

export default function InstituteManagement() {
  const navigate = useNavigate();
  const [isAdd, setIsAdd] = useState(false);
  const [data, setData] = useState([]);
  const [existingInstitute, setExistingInstitute] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Adjust pageSize according to your requirement

  const columns = [
    { name: "NAME", enableSorting: true, searchingEnabled: true },
    { name: "CITY", enableSorting: true, searchingEnabled: true },
    { name: "COUNTRY", enableSorting: true, searchingEnabled: true },
    { name: "BROUCHER", enableSorting: true, searchingEnabled: true },
  ];

  const mapping = ["universityName", "city", "country", "brochure"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = { page: currentPage, limit: pageSize };
        const response = await getAllInstitutes(queryParams);
        if (response.status === 200) {
          console.log(response?.data?.data?.list);
          setData(response?.data?.data?.list);
          setTotalCount(response?.data?.data?.totalCount);
          setTotalPages(Math.ceil(response?.data?.data?.totalCount / pageSize));
        } else {
          console.error("Failed to fetch data:", response?.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage, pageSize]);

  const openAddForm = (row) => {
    console.log(row);
    setIsAdd(!isAdd);
    if (row) {
      setExistingInstitute(row);
    }
  };

  return (
    <div className="flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]">
      <div className="flex justify-between">
        <h1 className="text-text text-[1.5rem] font-[600]">
          Institute Management {isAdd ? "> Add" : ""}
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
        <AddInstituteForm
          openAddForm={openAddForm}
          initialFormData={existingInstitute}
        />
      ) : (
        <>
          <InstitutionTable
            columns={columns}
            data={data}
            mapping={mapping}
            fun={openAddForm}
          />
          <div className="w-full flex justify-between items-center">
            <p className="text-[#4B465C]/50 text-[1rem] font-[400] leading-[1.4675rem]">
              Showing {(currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, totalCount)} of {totalCount}
            </p>
            <div className="flex gap-[0.31rem]">
              <TableButton
                label="Previous"
                action={() =>
                  setCurrentPage(
                    currentPage > 1 ? currentPage - 1 : currentPage
                  )
                }
              />
              {[...Array(totalPages)].map((_, index) => (
                <TableButton
                  key={index}
                  label={index + 1}
                  activeButton={currentPage}
                  action={() => setCurrentPage(index + 1)}
                />
              ))}
              <TableButton
                label="Next"
                action={() =>
                  setCurrentPage(
                    currentPage < totalPages ? currentPage + 1 : currentPage
                  )
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
