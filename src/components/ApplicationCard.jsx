import React from "react";
import "./ApplicationCard.css";

const ApplicationCard = ({ data }) => {
  return (
    <div className="application-card">
      <div className="student-info">
        {/* <h2 className="student-name">{data.userId.fullName}</h2> */}
        <p className="timestamp text-[#666666]">
          {new Date(data.createdAt).toLocaleString()}
        </p>
        <div className="status">
          <p className="status-label">Status:</p>
          <p className="status-value">{data.status}</p>
        </div>
      </div>
      <div className="application-details">
        <p className="application-number">{data._id}</p>
        <p className="course-info">{data.courseId.courseName}</p>
        <div className="university-info">
          <span className="location-icon">📍</span>
          <p className="university-name">{data.courseId.universityName}</p>
        </div>
        <p className="campus">CU: {data.courseId.uniqueCourseInfo.studyMode}</p>
      </div>
      <div className="view-details-btn-container">
      <button className="view-details-btn ">View Details</button>
      </div>
    </div>
  );
};

export default ApplicationCard;
