import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getApplicationsById } from "../context/services/client";
import "./ApplicationCard.css";
import ApplicationCard from "./ApplicationCard";
import ApplicationStatus from "./applicationStatus";

const ApplicationList = () => {
  const [data, setData] = useState([]);
  const { userId } = useParams(); // If userId is passed through React Router params
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the API to fetch data based on user ID or any other parameters
        const response = await getApplicationsById( userId );
        if (response.status === 200) {
          setData(response?.data?.data);
        } else {
          console.error("Failed to fetch data:", response.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [userId]); // Fetch data when userId changes


  return (
    <div className="flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]">
      <div className="flex justify-between">
        <h1 className="text-text text-[1.5rem] font-[600]">
          Applied Student’s
        </h1>
      </div>


      {data?.map((application) => (
        <ApplicationCard key={application._id} data={application} />
      ))}
    </div>
  );
};

export default ApplicationList;
