import React, { useState, useEffect } from "react";
import "./overviewInstute.css";
import {
  addCareerDetails,
  editCareerDetails,
} from "../context/services/client";
import "./addCareer.css";
import toaster from "../Shared/toaster";

const AddCareer = ({ initialData, fetchCareers, handleBack }) => {
  const [data, setData] = useState({
    latestQualification: "",
    specialization: "",
    coursesName: [],
  });

  useEffect(() => {
    if (initialData) {
      setData({
        latestQualification: initialData?.latestQualification || "",
        specialization: initialData?.specialization || "",
        coursesName: initialData?.coursesName || [],
      });
    }
  }, [initialData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseInput = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission on Enter key
      const newCourse = event.target.value.trim();
      if (newCourse) {
        setData((prev) => ({
          ...prev,
          coursesName: [...prev.coursesName, newCourse],
        }));
        event.target.value = ""; // Clear the input after adding to the list
      }
    }
  };

  const saveData = async () => {
    if (!data?.latestQualification || !data?.specialization || data?.coursesName.length === 0) {
      toaster.error("Please fill in all required fields.");
      return;
    }

    const payload = {
      latestQualification: data.latestQualification,
      specialization: data.specialization,
      coursesName: data.coursesName,
    };


    if (initialData) {
      payload.careerPathId = initialData?._id;
    }

    try {
      const response = initialData
        ? await editCareerDetails(payload, initialData._id)
        : await addCareerDetails(payload);
      if (response.status === 200) {
        handleBack();
        fetchCareers(1);
        setData({
          latestQualification: "",
          specialization: "",
          coursesName: [],
        });
        toaster.success(
          `Career details ${initialData ? "updated" : "added"} successfully!`
        );
      } else {
        toaster.error(`Error: ${response.message}`);
      }
    } catch (error) {
      toaster.error(`Error saving career details: ${error.message}`);
      console.error("Error saving career details:", error);
    }
  };

  const removeCourse = (index) => {
    setData((prev) => ({
      ...prev,
      coursesName: prev.coursesName.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="overview-container">
      <h3 className="heading">Career Details</h3>
      <div className="row">
        <div className="col-md-6 formField">
          <label>Latest Qualification *</label>
          <input
            className="input"
            type="text"
            name="latestQualification"
            placeholder="Add Qualification name"
            value={data.latestQualification}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6 formField">
          <label>Specialization *</label>
          <input
            className="input"
            type="text"
            name="specialization"
            placeholder="Add Specialization"
            value={data.specialization}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 formField">
          <label>Course Names *</label>
          <input
            className="input"
            type="text"
            placeholder="Type course name and press Enter"
            onKeyDown={handleCourseInput}
          />
          {data?.coursesName?.length > 0 && (
            <div className="tags-container">
              {data?.coursesName?.map((course, index) => (
                <div key={index} className="tag">
                  {course}
                  <button
                    onClick={() => removeCourse(index)}
                    className="remove-tag-btn"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
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
          onClick={saveData}
        >
          Save Career
        </button>
      </div>
    </div>
  );
};

export default AddCareer;
