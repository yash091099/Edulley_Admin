import React, { useState } from "react";
import { addScholarship, editScholarship } from "../context/services/client";
import {toast} from "react-hot-toast";

export default function AddScholarship({ initialData, handleBack }) {
  const [data, setData] = useState({
    name: initialData?.name || "",
    universityName: initialData?.universityName || "",
    coursesName: initialData?.coursesName || "",
    deadline: initialData?.deadline?.split("T")[0] || "",
    level: initialData?.level || "",
    amount: initialData?.amount || "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    for (const key in data) {
      if (!data[key]) {
        toast.error(`Please fill in all fields.`);
        return false;
      }
    }
    return true;
  };

  const saveScholarship = async () => {
    if (!validateFields()) return;

    const payload = {
      name: data?.name,
      universityName: data?.universityName,
      coursesName: data?.coursesName,
      deadline: data?.deadline,
      level: data?.level,
      amount: Number(data?.amount), // Ensure amount is a number
    };

    payload.scholarshipId = initialData?._id;

    try {
      // Use the correct API function for adding or editing the scholarship
      const response = initialData
        ? await editScholarship(payload)
        : await addScholarship(payload); // Replace with actual API call for adding

      if (response.status === 200) {
        handleBack();
        toast.success(`Scholarship ${initialData ? "updated" : "added"} successfully!`);
      } else {
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      toast.error(`Error saving scholarship: ${error.message}`);
      console.error(`Error saving scholarship: ${error.message}`);
      // Handle error scenarios
    }
  };

  return (
    <>
      <div className="overview-container">
        <h3 className="heading" style={{fontFamily: 'Gilroy-Bold'}}>Overview</h3>
        <div className="row">
          <div className="col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              Scholarship Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Add Scholarship Name"
              value={data.name}
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            />
          </div>
          <div className="col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              University Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="input"
              type="text"
              name="universityName"
              placeholder="Add University Name"
              value={data.universityName}
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              Course Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="input"
              type="text"
              name="coursesName"
              placeholder="Add Course Name"
              value={data.coursesName}
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            />
          </div>
          <div className="col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              Deadline<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="input"
              type="date"
              name="deadline"
              placeholder="Add Deadline"
              value={data.deadline}
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              Level<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="input"
              type="text"
              name="level"
              placeholder="Add Level"
              value={data.level}
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            />
          </div>
          <div className="col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>
              Amount<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="input"
              type="text"
              name="amount"
              placeholder="Add Amount"
              value={data.amount}
              onChange={handleInputChange}
              style={{fontFamily: 'Gilroy-Medium'}}
            />
          </div>
        </div>
      </div>
      <div className="button-container" style={{display: 'flex', justifyContent: 'flex-end'}}>
        <button
          style={{
            backgroundColor: "#FF6477",
            padding: "10px",
            borderRadius: "4px",
            color: "#fff",
            minWidth: "100px",
          }}
          className="saveButton"
          onClick={saveScholarship}
        >
          Save
        </button>
      </div>
    </>
  );
}