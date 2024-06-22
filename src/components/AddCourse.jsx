import React, { useRef, useState } from "react";
import { addCourse, editCourse } from "../context/services/client";
import {toast} from "react-hot-toast";

const AddCourse = ({ initialData, handleBack }) => {

  console.log(initialData)
  const [data, setData] = useState({
    courseName: initialData?.courseName || "",
    universityName: initialData?.universityName || "",
    level: initialData?.level || "",
    courseLogo: initialData?.courseLogo || "",
    bannerImage: initialData?.bannerImage || "",
    overview: initialData?.overview || "",
    modules: initialData?.modules || "",
    requirements: initialData?.requirements || "",
    fee: initialData?.uniqueCourseInfo?.fee || "",
    duration: initialData?.duration || "",
    applicationDeadline: initialData?.uniqueCourseInfo?.applicationDeadline?.split("T")[0] || "",
    applicationFee: initialData?.uniqueCourseInfo?.applicationFee || "",
    upcomingIntakes: initialData?.uniqueCourseInfo?.upcomingIntake || "",
    modeOfStudy: initialData?.uniqueCourseInfo?.studyMode || "",
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
    // Check if any required fields are empty
    const requiredFields = ["courseName", "universityName", "level", "overview", "modules", "requirements", "fee", "duration", "applicationDeadline", "applicationFee", "upcomingIntakes", "modeOfStudy"];
    const emptyFields = requiredFields.filter(field => !data[field]);
    if (emptyFields.length > 0) {
      toast.error("Please fill all required fields");
      return;
    }

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
        fee: parseInt(data.fee),
        duration: parseInt(data.duration),
        applicationDeadline: data.applicationDeadline?.split("T")[0], // Convert to Date object
        applicationFee: parseInt(data.applicationFee),
        upcomingIntake: data.upcomingIntakes,
        studyMode: data.modeOfStudy,
      },
    };

    // Determine whether to add a new course or edit an existing one
    try {
      if (initialData) {
        await editCourse({ ...payload, courseId: initialData._id });
      } else {
        await addCourse(payload); // Replace with actual API call
      }
      // Show success message
      toast.success(`Course ${initialData ? "updated" : "added"} successfully!`);
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
        applicationDeadline: new Date(),
        applicationFee: "",
        upcomingIntakes: "",
        modeOfStudy: "",
      });
    } catch (error) {
      // Handle error scenarios
      toast.error(`Error saving course: ${error.message}`);
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
        <h3 className="heading" style={{fontFamily: 'Gilroy-Bold'}}>Overview</h3>
        <div className="row">
          <div className="col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              Course Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="input"
              type="text"
              name="courseName"
              placeholder="Add Course Name"
              value={data.courseName}
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            />
          </div>
          <div className="col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              University Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="input"
              name="universityName"
              placeholder="Add university name"
              value={data.universityName}
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            />
          </div>
        </div>
        <div className="row">
          <div className="formField col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}} htmlFor="bannerImage">Banner Image</label>
            <input
              type="file"
              name="bannerImage"
              accept="image/*"
              ref={fileInputRefs.bannerImage}
              onChange={handleFileChange}
            />
           {data.bannerImage && <img src={data.bannerImage} style={{ width: "100px", height: "100px" }} alt="Banner Image" />}
          </div>
          <div className="formField col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}} htmlFor="courseLogo">Course Logo</label>
            <input
              type="file"
              name="courseLogo"
              accept="image/*"
              ref={fileInputRefs.courseLogo}
              onChange={handleFileChange}
            />
            {data.courseLogo && <img src={data.courseLogo} style={{ width: "100px", height: "100px" }} alt="Course Logo" />}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              Level<span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="level"
              className="input"
              value={data.level}
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            >
              <option value="">Select Level</option>
              <option value="UG">UG</option>
              <option value="PG">PG</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              Overview<span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              name="overview"
              className="p-2"
              rows="3"
              value={data.overview}
              placeholder="Add Overview"
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              Modules<span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              name="modules"
              className="p-2"
              rows="3"
              value={data.modules}
              placeholder="Add Modules"
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              Requirements<span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              name="requirements"
              className="p-2"
              rows="3"
              value={data.requirements}
              placeholder="Add Requirements"
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            />
          </div>
        </div>
      </div>
      <div className="overview-container">
        <h3 className="heading" style={{fontFamily: 'Gilroy-Bold'}}>Unique University Info</h3>
        <div className="row">
          <div className="col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              Fee<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="number"
              className="input"
              name="fee"
              placeholder="Add Fee"
              value={data.fee}
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            />
          </div>
          <div className="col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              Duration (Years)<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="number"
              className="input"
              name="duration"
              placeholder="Add Duration"
              value={data.duration}
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              Application Deadline<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="input"
              type="date"
              name="applicationDeadline"
              placeholder="Add Application Deadline"
              value={data.applicationDeadline}
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            />
          </div>
          <div className="col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              Application Fee<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="input"
              type="number"
              name="applicationFee"
              placeholder="Add Application Fee"
              value={data.applicationFee}
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              Upcoming Intakes<span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="input"
              name="upcomingIntakes"
              value={data.upcomingIntakes}
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            >
              <option value="">Select Intake</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div className="col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              Mode of Study<span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="input"
              name="modeOfStudy"
              value={data.modeOfStudy}
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            >
              <option value="">Select Mode of Study</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
            </select>
          </div>
        </div>
      </div>

      <div className="button-container" style={{display: 'flex', justifyContent: 'flex-end'}}>
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