import React, { useState } from "react";
import Table from "./Table";
import filterIcon from "../assets/svg/filter-icon.svg";
import { useNavigate } from "react-router-dom";

export default function ApplicationManagement() {
  const navigate = useNavigate();

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

  //   provide the actual table body data
  const data = [
    {
      "S.no": 1,
      "Application Number": "98765/23-24",
      "University Name": "University name Manchester UK",
      "Course Name": "MA by Research English Studies",
      Status: "Conditional Offer Received",
      Name: "Edgar Jones",
      Email: "Ejones@gmail.com",
      Phone: "+91-937373638",
      ViewProfile: true,
    },
    {
      "S.no": 2,
      "Application Number": "98765/23-24",
      "University Name": "University name Manchester UK",
      "Course Name": "MA by Research English Studies",
      Status: "Conditional Offer Received",
      Name: "Edgar Jones",
      Email: "Ejones@gmail.com",
      Phone: "+91-937373638",
      ViewProfile: true,
    },
    {
      "S.no": 3,
      "Application Number": "98765/23-24",
      "University Name": "University name Manchester UK",
      "Course Name": "MA by Research English Studies",
      Status: "Conditional Offer Received",
      Name: "Edgar Jones",
      Email: "Ejones@gmail.com",
      Phone: "+91-937373638",
      ViewProfile: true,
    },
    {
      "S.no": 4,
      "Application Number": "98765/23-24",
      "University Name": "University name Manchester UK",
      "Course Name": "MA by Research English Studies",
      Status: "Conditional Offer Received",
      Name: "Edgar Jones",
      Email: "Ejones@gmail.com",
      Phone: "+91-937373638",
      ViewProfile: true,
    },
    {
      "S.no": 5,
      "Application Number": "98765/23-24",
      "University Name": "University name Manchester UK",
      "Course Name": "MA by Research English Studies",
      Status: "Conditional Offer Received",
      Name: "Edgar Jones",
      Email: "Ejones@gmail.com",
      Phone: "+91-937373638",
      ViewProfile: true,
    },
    {
      "S.no": 6,
      "Application Number": "98765/23-24",
      "University Name": "University name Manchester UK",
      "Course Name": "MA by Research English Studies",
      Status: "Conditional Offer Received",
      Name: "Edgar Jones",
      Email: "Ejones@gmail.com",
      Phone: "+91-937373638",
      ViewProfile: true,
    },
    {
      "S.no": 7,
      "Application Number": "98765/23-24",
      "University Name": "University name Manchester UK",
      "Course Name": "MA by Research English Studies",
      Status: "Conditional Offer Received",
      Name: "Edgar Jones",
      Email: "Ejones@gmail.com",
      Phone: "+91-937373638",
      ViewProfile: true,
    },
    {
      "S.no": 8,
      "Application Number": "98765/23-24",
      "University Name": "University name Manchester UK",
      "Course Name": "MA by Research English Studies",
      Status: "Conditional Offer Received",
      Name: "Edgar Jones",
      Email: "Ejones@gmail.com",
      Phone: "+91-937373638",
      ViewProfile: true,
    },
    {
      "S.no": 9,
      "Application Number": "98765/23-24",
      "University Name": "University name Manchester UK",
      "Course Name": "MA by Research English Studies",
      Status: "Conditional Offer Received",
      Name: "Edgar Jones",
      Email: "Ejones@gmail.com",
      Phone: "+91-937373638",
      ViewProfile: true,
    },
  ];

  //   map the data to columns | note:- order matters*
  const mapping = [
    // 'S.no',
    "Application Number",
    "University Name",
    "Course Name",
    "Status",
    "Name",
    "Email",
    "Phone",
    "ViewProfile",
  ];

  const [isViewDetails, setIsViewDetails] = useState(false);

  const viewDetails = (keyIndex) => {
    console.log(keyIndex, "keyIndex");
    setIsViewDetails(!isViewDetails);
  };

  return (
    <div className="flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]">
      <div className="flex justify-between">
        <h1 className="text-text text-[1.5rem] font-[600]">
       Applied Student’s
        </h1>
        <button className="flex gap-[0.25rem] items-center border border-[#89BF2C] px-[1.5rem] py-[0.5rem] rounded-[0.5rem]">
          <img src={filterIcon} alt="filter" />
          <p className="text-text text-[0.75rem] font-[600]">Filter</p>
        </button>
      </div>
 
        <>
          <Table
            columns={columns}
            data={data}
            mapping={mapping}
            // fun={() => navigate("/dashboard/application")}
            viewDetails={viewDetails}
          />
        </>
    
    </div>
  );
}
