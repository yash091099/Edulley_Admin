import React, { useEffect, useState } from "react";
import Table from "./Table";
import filterIcon from "../assets/svg/filter-icon.svg";
import { useNavigate } from "react-router-dom";
import { getApplications } from "../context/services/client";

export default function ApplicationManagement() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // columns in table | note:- order matters
  const columns = [
    // { name: "S.NO", enableSorting: true, searchingEnabled: false },
    { name: "Application number", enableSorting: true, searchingEnabled: true },
    { name: "University Name ", enableSorting: true, searchingEnabled: true },
    { name: "Course Name ", enableSorting: true, searchingEnabled: true },
    { name: "Status", enableSorting: true, searchingEnabled: true },
    { name: "Name", enableSorting: true, searchingEnabled: true },
    { name: "Email", enableSorting: true, searchingEnabled: true },
    { name: "Phone", enableSorting: true, searchingEnabled: true },
    { name: "ViewProfile", enableSorting: true, searchingEnabled: true },
  ];

  //   map the data to columns | note:- order matters*
  const mapping = [
    // 'S.no',
    "applicationNumber",
    "universityName",
    "courseName",
    "status",
    "fullName",
    "email",
    "phoneNumber",
    "ViewProfile",
  ];

  const [isViewDetails, setIsViewDetails] = useState(false);

  const viewDetails = (keyIndex) => {
    console.log(keyIndex, "keyIndex");
    setIsViewDetails(!isViewDetails);
  };

  const getApplication = async () => {
    setLoading(true);
    const reponse = await getApplications({ page: currentPage, limit: 10 });
    if (reponse.status === 200) {
      setData(reponse?.data?.data?.list);
      setTotalPages(Math.ceil(reponse?.data?.data?.totalCount / 10));
      setLoading(false);
    } else {
      setLoading(false);
      console.error("Failed to fetch data:", reponse.message);
    }
  };
  useEffect(() => {
    getApplication();
  }, []);

  return (
    <div className="flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]">
      <div className="flex justify-between">
        <h1 className="text-text text-[1.5rem] font-[600]">
          Applied Student’s
        </h1>
        {/* <button className="flex gap-[0.25rem] items-center border border-[#89BF2C] px-[1.5rem] py-[0.5rem] rounded-[0.5rem]">
          <img src={filterIcon} alt="filter" />
          <p className="text-text text-[0.75rem] font-[600]">Filter</p>
        </button> */}
      </div>

      <>
        <Table
          columns={columns}
          data={data.map((application) => ({
            applicationNumber: application?._id,
            universityName: application?.courseId?.universityName,
            courseName: application?.courseId?.courseName,
            fullName: application?.userId.fullName,
            email: application?.userId.email,
            phoneNumber: application?.userId.phoneNumber,
            ...application,
            ViewProfile: (
              <button
              onClick={() => navigate(`/dashboard/application-management/${application?.userId?._id}`)}
                className="flex gap-[0.25rem] items-center border border-[#89BF2C] px-[1.5rem] py-[0.5rem] rounded-[0.5rem]"
              >
                View Profile
              </button>
            ),
          }))}
            
          mapping={mapping}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          // fun={() => navigate("/dashboard/application")}
          // viewDetails={viewDetails}
        />
      </>
    </div>
  );
}
