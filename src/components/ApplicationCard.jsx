import React from "react";
import "./ApplicationCard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ApplicationCard = ({ data }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    const dataString = encodeURIComponent(JSON.stringify(data));
    navigate(`/dashboard/application/status/${dataString}`);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Copied to clipboard");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

 
  return (
    <div className="application-card">
      <div className="student-info">
        <p style={{ fontFamily: "Gilroy-Medium" }} className="timestamp text-[#666666]">
          {new Date(data.createdAt).toLocaleString()}
        </p>
        <div className="status-badge" style={{ backgroundColor:"#ff6477",color: "#fff" }}>
          <p style={{ fontFamily: "Gilroy-Medium" }} className="status-value">
           <span style={{color: "#fff"}}>{data.status}</span> 
          </p>
        </div>
      </div>
      <div className="application-details">
        <div className="application-number-container">
          <p style={{ fontFamily: "Gilroy-Medium" }} className="application-number">
            Application Id: {data._id}
            <span
              className="copy-icon"
              onClick={() => copyToClipboard(data._id)}
              style={{ cursor: "pointer", marginLeft: "5px" }}
            >
              📋
            </span>
          </p>
        </div>
        <p style={{ fontFamily: "Gilroy-Medium" }} className="course-info">
          {data.courseId.courseName}
        </p>
        <div className="university-info">
          <span className="location-icon">📍</span>
          <p style={{ fontFamily: "Gilroy-Medium" }} className="university-name">
            {data.courseId.universityName}
            <span
              className="copy-icon"
              onClick={() => copyToClipboard(data.courseId.universityName)}
              style={{ cursor: "pointer", marginLeft: "5px" }}
            >
              📋
            </span>
          </p>
        </div>
        <div className="campus-container">
          <p style={{ fontFamily: "Gilroy-Medium" }} className="campus">
            CU: {data.courseId.uniqueCourseInfo.studyMode}
            <span
              className="copy-icon"
              onClick={() => copyToClipboard(data.courseId.uniqueCourseInfo.studyMode)}
              style={{ cursor: "pointer", marginLeft: "5px" }}
            >
              📋
            </span>
          </p>
        </div>
      </div>
      <div className="view-details-btn-container">
        <button
          style={{ fontFamily: "Gilroy-Bold" }}
          onClick={handleViewDetails}
          className="view-details-btn"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;