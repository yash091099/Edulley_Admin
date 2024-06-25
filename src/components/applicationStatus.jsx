import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateApplicationStatus } from "../context/services/client";
import CustomLoader from "./loader";

const ApplicationStatus = () => {
  const navigate=useNavigate();
  const { data } = useParams();
  const [applicationData, setApplicationData] = useState(null);
  const [formData, setFormData] = useState({
    status: "",
    applicationFee: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const decodedData = decodeURIComponent(data);
      const parsedData = JSON.parse(decodedData);
      setApplicationData(parsedData);
      setFormData({
        status: parsedData.status,
        applicationFee: parsedData.courseId?.uniqueCourseInfo?.applicationFee,
      });
    } catch (error) {
      console.error("Error parsing application data:", error);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        status: formData.status,
        applicationId: applicationData._id,
      };
      await updateApplicationStatus(payload);

      toast.success("Application status updated successfully");
      navigate("/dashboard/Applications-management");
    } catch (error) {
      console.error("Error updating application status:", error);
      toast.error("Failed to update application status");
    } finally {
      setLoading(false);
    }
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
    <div className="flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]">
      {loading && <CustomLoader />}
      <div className="flex justify-between">
        <h1 className="text-text text-[1.5rem] font-[600]" style={{ fontFamily: "Gilroy-Bold" }}>
          Applied status
        </h1>
      </div>

      <div className="application-card">
        <div className="student-info">
          <p className="timestamp text-[#666666]" style={{ fontFamily: "Gilroy-Medium" }}>
            {new Date(applicationData?.createdAt).toLocaleString()}
          </p>
          <div className="status">
            <p className="status-label" style={{ fontFamily: "Gilroy-Bold" }}>Status:</p>
            <p className="status-value" style={{ fontFamily: "Gilroy-Medium" }}>{applicationData?.status}</p>
          </div>
        </div>
        <div className="application-details">
          <p className="application-number" style={{ fontFamily: "Gilroy-Medium" }}>
            {applicationData?._id}
          </p>
          <p className="course-info" style={{ fontFamily: "Gilroy-Medium" }}>{applicationData?.courseId.courseName}</p>
          <div className="university-info">
            <span className="location-icon">📍</span>
            <p className="university-name" style={{ fontFamily: "Gilroy-Medium" }}>
              {applicationData?.courseId.universityName}
            </p>
          </div>
          <p className="campus" style={{ fontFamily: "Gilroy-Medium" }}>
            CU: {applicationData?.courseId.uniqueCourseInfo.studyMode}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="overview-container">
          <h2 className="heading" style={{ fontFamily: "Gilroy-Bold" }}>Update Application Status</h2>
          <div className="row col-md-6 formField">
            <label htmlFor="status" className="form-label" style={{ fontFamily: "Gilroy-Bold" }}>
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="input"
              required
              style={{ fontFamily: "Gilroy-Medium", cursor: "pointer" }}
            >
              <option value="">Select status</option>
              <option value="APPLIED_CONDITIONAL_OFFER">APPLIED_CONDITIONAL_OFFER</option>
              <option value="UNCONDITIONAL_OFFER">UNCONDITIONAL_OFFER</option>
              <option value="ACCEPTED">ACCEPTED</option>
              <option value="DEPOSIT_PAID">DEPOSIT_PAID</option>
              <option value="CAS_LETTER">CAS_LETTER</option>
              <option value="VISA_LETTER_ARRIVED">VISA_LETTER_ARRIVED</option>
            </select>
          </div>
          <div className="row col-md-6 formField">
            <label htmlFor="applicationFee" className="form-label" style={{ fontFamily: "Gilroy-Bold" }}>
              Application Fee:
            </label>
            <input
              type="text"
              disabled
              id="applicationFee"
              name="applicationFee"
              value={formData.applicationFee}
              onChange={handleInputChange}
              className="input"
              required
              style={{ fontFamily: "Gilroy-Medium", cursor: "not-allowed" }}
            />
          </div>
        </div>

        <div className="button-container" style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px'
        }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              backgroundColor: "#FF6477",
              padding: "10px 20px",
              borderRadius: "4px",
              color: "#fff",
              minWidth: "120px",
              fontFamily: "Gilroy-Medium",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              opacity: loading ? 0.7 : 1,
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#FF4757"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#FF6477"}
            disabled={loading}
          >
            {loading ? "Updating..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationStatus;