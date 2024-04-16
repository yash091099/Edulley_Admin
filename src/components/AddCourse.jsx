import React, { useRef, useState } from "react";
import { addCourse, editCourse } from "../context/services/client";

const AddCourse = ({ initialData , handleBack }) => {
  const [data, setData] = useState({
    courseName: initialData?.courseName || "",
    universityName: initialData?.universityName || "",
    level: initialData?.level || "",
    courseLogo: initialData?.courseLogo || "",
    bannerImage: initialData?.bannerImage || "",
    overview: initialData?.overview || "",
    modules: initialData?.modules || "",
    requirements: initialData?.requirements || "",
    fee: initialData?.fee || "",
    duration: initialData?.duration || "",
    applicationDeadline: initialData?.applicationDeadline || "",
    applicationFee: initialData?.applicationFee || "",
    upcomingIntake: initialData?.upcomingIntake || "",
    studyMode: initialData?.studyMode || "",
  });

  const fileInputRefs = {
    courseLogo: useRef(null),
    bannerImage: useRef(null),
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const saveData = async () => {
    // Construct the payload
    const payload = {
      courseName: data.courseName,
      universityName: data.universityName,
      level: data.level,
      courseLogo: data.courseLogo,
      bannerImage: data.bannerImage,
      overview: data.overview,
      modules: data.modules,
      requirements: data.requirements,
      uniqueCourseInfo: {
        fee: data.fee,
        duration: data.duration,
        applicationDeadline: data.applicationDeadline,
        applicationFee: data.applicationFee,
        upcomingIntake: data.upcomingIntake,
        studyMode: data.studyMode,
      },
    };

    // Determine whether to add a new course or edit an existing one
    try {
      if (initialData) {
        await editCourse(payload); // Replace with actual API call
      } else {
        await addCourse(payload); // Replace with actual API call
      }
      // Show success message
      console.log(`Course ${initialData ? "updated" : "added"} successfully!`);
      handleBack();
      // Reset the form or handle post-save actions
      setData({
        courseName: "",
        universityName: "",
        level: "",
        courseLogo: "",
        bannerImage: "",
        overview: "",
        modules: "",
        requirements: "",
        fee: "",
        duration: "",
        applicationDeadline: "",
        applicationFee: "",
        upcomingIntake: "",
        studyMode: "",
      });
    } catch (error) {
      // Handle error scenarios
      console.error(`Error saving course: ${error.message}`);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
        "https://api.mymultimeds.com/api/file/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`⁠Failed to upload file: ${response.statusText}`);
      }
      const responseData = await response.json();
      const uploadedUrl = responseData.publicUrl;
      setData((prev) => ({ ...prev, [event.target.name]: uploadedUrl }));
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  return (
    <>
      <div className="overview-container">
        <h3 className="heading">Overview</h3>
        <div className="row">
          <div className="col-md-6 formField">
            <label>Course Name</label>
            <input
            className="input"
              type="text"
              name="courseName"
              placeholder="Add Course Name"
              value={data.courseName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 formField">
            <label>University Name</label>
            <input
              type="text"
              className="input"
              name="universityName"
              placeholder="Add university name"
              value={data.universityName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="formField col-md-6 formField">
            <label htmlFor="bannerImage">Banner Image</label>
            <input
              type="file"
              name="bannerImage"
              accept="image/*"
              ref={fileInputRefs.bannerImage}
              onChange={handleFileChange}
            />
            
          </div>
          <div className="formField col-md-6 formField">
            <label htmlFor="courseLogo">Course Logo</label>
            <input 
              type="file"
              name="courseLogo"
              accept="image/*"
              ref={fileInputRefs.courseLogo}
              onChange={handleFileChange}
            />

            
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 formField">
            <label>Level</label>
            <input
              type="text"
              className="input"
              name="level"
              placeholder="Add Level"
              value={data.level}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 formField">
            <label>Overview</label>
            <textarea
              name="overview"
              className="p-2"
              value={data.overview}
              placeholder="Add Overview"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 formField">
            <label>Modules</label>
            <textarea
              name="modules"
              className="p-2"
              value={data.modules}
              placeholder="Add Modules"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 formField">
            <label>Requirements</label>
            <textarea
              name="requirements"
              className="p-2"
              value={data.requirements}
              placeholder="Add Requirements"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="overview-container">
        <h3 className="heading">Unique University Info</h3>
        <div className="row">
          <div className="col-md-6 formField">
            <label>Fee</label>
            <input
              type="text"
              className="input"
              name="fee"
              placeholder="Add Fee"
              value={data.fee}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 formField">
            <label>Duration</label>
            <input
              type="text"
              className="input"
              name="duration"
              placeholder="Add Duration"
              value={data.duration}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 formField">
            <label>Application Deadline</label>
            <input
              className="input"
              type="text"
              name="applicationDeadline"
              placeholder="Add Application Deadline"
              value={data.applicationDeadline}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 formField">
            <label>Application Fee</label>
            <input
              className="input"
              type="text"
              name="applicationFee"
              placeholder="Add Application Fee"
              value={data.applicationFee}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 formField">
            <label>Upcoming Intakes</label>
            <input
              className="input"
              type="text"
              name="upcomingIntakes"
              placeholder="Add Upcoming Intakes"
              value={data.upcomingIntakes}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 formField">
            <label>Mode of study</label>
            <input
              className="input"
              type="text"
              name="modeOfStudy"
              placeholder="Add Mode of study"
              value={data.modeOfStudy}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="button-container">
        <button
          onClick={saveData}
          style={{
            backgroundColor: "#FF6477",
            padding: "10px",
            borderRadius: "4px",
            color: "#fff",
            minWidth: "100px",
          }}
          className="saveButton"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default AddCourse;
