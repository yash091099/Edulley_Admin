import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FileUploadField from "./FileUploadField";

const ApplicationStatus = () => {
    
  const { data } = useParams();
  const [applicationData, setApplicationData] = useState(null);
  const [formData, setFormData] = useState({
    status: "",
    applicationFee: "",
    document1: "",
    document2: "",
    document3: "",
    document4: "",
  });

  useEffect(() => {
    try {
      const decodedData = decodeURIComponent(data);
      const parsedData = JSON.parse(decodedData);
      setApplicationData(parsedData);
      setFormData({
        status: parsedData.status,
        applicationFee: parsedData.courseId?.uniqueCourseInfo?.applicationFee,
        document1: "",
        document2: "",
        document3: "",
        document4: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to server)
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]">
      <div className="flex justify-between">
        <h1 className="text-text text-[1.5rem] font-[600]">Applied status</h1>
      </div>

      <div className="application-card">
        <div className="student-info">
          <p className="timestamp text-[#666666]">
            {new Date(applicationData?.createdAt).toLocaleString()}
          </p>
          <div className="status">
            <p className="status-label">Status:</p>
            <p className="status-value">{applicationData?.status}</p>
          </div>
        </div>
        <div className="application-details">
          <p className="application-number">{applicationData?._id}</p>
          <p className="course-info">{applicationData?.courseId.courseName}</p>
          <div className="university-info">
            <span className="location-icon">📍</span>
            <p className="university-name">
              {applicationData?.courseId.universityName}
            </p>
          </div>
          <p className="campus">
            CU: {applicationData?.courseId.uniqueCourseInfo.studyMode}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="overview-container">
          <h2 className="heading">No Application Fee</h2>
          <div className="row col-md-6 formField">
            <label htmlFor="status" className="form-label">
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="input"
              required
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
            <label htmlFor="applicationFee" className="form-label">
              Application Fee:
            </label>
            <input
              type="text"
              id="applicationFee"
              name="applicationFee"
              value={formData.applicationFee}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
        </div>

        <div className="main-container">
          <h3 className="heading">upload Documents</h3>
          <div className="row">
            {[1, 2, 3, 4].map((index) => (
              <FileUploadField
                key={index}
                name={`document${index}`}
                label={`Document ${index}`}
                setFieldValue={(name, value) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value,
                  }))
                }
                value={formData[`document${index}`]}
              />
            ))}
          </div>
        </div>
        <div className="button-container">
          <button
            style={{
              backgroundColor: "#FF6477",
              padding: "10px",
              borderRadius: "4px",
              color: "#fff",
              minWidth: "100px",
            }}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationStatus;
