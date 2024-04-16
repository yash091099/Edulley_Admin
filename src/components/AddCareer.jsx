import React, { useState, useEffect } from "react";
import "./overviewInstute.css";
import {
  addCareerDetails,
  editCareerDetails,
} from "../context/services/client";
import "./addCareer.css";
import { toast } from "react-toastify";
import toaster from "../Shared/toaster";

const AddCareer = ({ initialData = !null , fetchCareers , handleBack }) => {
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
    if (name !== "coursesName") {
      setData((prev) => ({ ...prev, [name]: value }));
    }
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
    const payload = {
      latestQualification: data.latestQualification,
      specialization: data.specialization,
      coursesName: data.coursesName,
    };

    try {
      const response = initialData
        ? await addCareerDetails(payload)
        : await addCareerDetails(payload);
      if (response.status === 200) {
        handleBack();
        setData({
          latestQualification: "",
          specialization: "",
          coursesName: [],
        })

        fetchCareers(1);

        toaster.success(
          `Career details ${initialData ? "updated" : "added"} successfully!`
        );
      } else {
        toaster.error(`Error: ${response.message}`);
      }
      console.log(
        `Career details ${initialData ? "updated" : "added"} successfully!`
      );
    } catch (error) {
      console.error("Error saving career details:", error);
      alert("Error saving career details: " + error.message);
    }
  };

  const removeTag = (index) => {
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
          <label>Latest Qualification</label>
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
          <label>Specialization</label>
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
          <label>Course Names</label>
          <input
            className="input"
            type="text"
            placeholder="Type course name and press Enter"
            onKeyDown={handleCourseInput}
          />
          {data?.coursesName?.length > 0 && (
            <p>Course Names: {data?.coursesName?.join(", ")}</p>
          )}
          {/* <div className="tags-container">
            {data.coursesName.map((course, index) => (
              <div key={index} className="tag">
                {course}
                <button
                  onClick={() => removeTag(index)}
                  className="remove-tag-btn"
                >
                  &times;
                </button>
              </div>
            ))}
          </div> */}
        </div>
      </div>
      <div className="button-container">
        <button
          disabled={
            !data.latestQualification ||
            !data.specialization ||
            !data.coursesName.length
          }
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
