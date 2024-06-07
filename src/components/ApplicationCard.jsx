import React from "react";
import "./ApplicationCard.css";
import { useNavigate } from "react-router-dom";

const ApplicationCard = ({ data  }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    const dataString = encodeURIComponent(JSON.stringify(data));
    navigate(`/dashboard/application/status/${dataString}`);
  };
  

  return (
    <div className="application-card">
      <div className="student-info">
        {/* <h2 className="student-name">{data.userId.fullName}</h2> */}
        <p style={{fontFamily:"Gilroy-Medium"}}  className="timestamp text-[#666666]">
          {new Date(data.createdAt).toLocaleString()}
        </p>
        <div className="status">
          <p style={{fontFamily:"Gilroy-Medium"}} className="status-label">Status:</p>
          <p style={{fontFamily:"Gilroy-Medium"}}  className="status-value">{data.status}</p>
        </div>
      </div>
      <div className="application-details">
        <p style={{fontFamily:"Gilroy-Medium"}}  className="application-number">{data._id}</p>
        <p style={{fontFamily:"Gilroy-Medium"}}  className="course-info">{data.courseId.courseName}</p>
        <div className="university-info">
          <span className="location-icon">📍</span>
          <p style={{fontFamily:"Gilroy-Medium"}}  className="university-name">{data.courseId.universityName}</p>
        </div>
        <p style={{fontFamily:"Gilroy-Medium"}}  className="campus">CU: {data.courseId.uniqueCourseInfo.studyMode}</p>
      </div>
      <div className="view-details-btn-container">
      <button style={{fontFamily:"Gilroy-Bold"}} onClick={handleViewDetails} className="view-details-btn ">View Details</button>
      </div>
    </div>
  );
};

export default ApplicationCard;
