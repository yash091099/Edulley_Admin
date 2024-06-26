import React, { useState, useEffect } from "react";
import "./overviewInstute.css";
import {
  addCareerDetails,
  editCareerDetails,
  getCoursesWithoutPagination
} from "../context/services/client";
import "./addCareer.css";
import { toast } from "react-hot-toast";

const AddCareer = ({ initialData, fetchCareers, handleBack }) => {
  const [data, setData] = useState({
    latestQualification: "",
    specialization: "",
    coursesName: [],
  });
  const [courses, setCourses] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    getCoursesWithoutPagination().then((res) => {
      setCourses(res.data?.data || []);
    });
  }, []);

  useEffect(() => {
    console.log(courses, "courses");
  }, [courses]);

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

  const handleCourseChange = (courseName) => {
    setData((prev) => {
      const updatedCoursesName = prev.coursesName.includes(courseName)
        ? prev.coursesName.filter((course) => course !== courseName)
        : [...prev.coursesName, courseName];
      return { ...prev, coursesName: updatedCoursesName };
    });
  };

  const saveData = async () => {
    if (!data?.latestQualification || !data?.specialization || !data?.coursesName.length) {
      toast.error("Please fill in all required fields.");
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
        toast.success(
          `Career details ${initialData ? "updated" : "added"} successfully!`
        );
      } else {
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      toast.error(`Error saving career details: ${error.message}`);
      console.error("Error saving career details:", error);
    }
  };

  return (
    <div className="overview-container">
      <h3 className="heading" style={{ fontFamily: 'Gilroy-Bold' }}>Career Details</h3>
      <div className="row">
        <div className="col-md-6 formField">
          <label style={{ fontFamily: 'Gilroy-Bold' }}>Latest Qualification *</label>
          <select
            className="input"
            name="latestQualification"
            value={data.latestQualification}
            onChange={handleInputChange}
            style={{ fontFamily: 'Gilroy-Medium' }}
          >
            <option value="">Select Qualification</option>
            <option value="12th (High School Completed)">12th (High School Completed)</option>
            <option value="Bachelors of Technology">Bachelors of Technology</option>
            <option value="Bachelors of Arts">Bachelors of Arts</option>
            <option value="Bachelors of Business Administration">Bachelors of Business Administration</option>
            <option value="Bachelors of Architecture">Bachelors of Architecture</option>
            <option value="Bachelors of Science">Bachelors of Science</option>
            <option value="Bachelors of Commerce">Bachelors of Commerce</option>
            <option value="Bachelors of Law">Bachelors of Law</option>
            <option value="MBBS">MBBS</option>
            <option value="Bachelors of Engineering">Bachelors of Engineering</option>
            <option value="Bachelor of Pharmacy (B.Pharm.)">Bachelor of Pharmacy (B.Pharm.)</option>
          </select>
        </div>
        <div className="col-md-6 formField">
          <label style={{ fontFamily: 'Gilroy-Bold' }}>Specialization *</label>
          <select
            className="input"
            name="specialization"
            value={data.specialization}
            onChange={handleInputChange}
            style={{ fontFamily: 'Gilroy-Medium' }}
          >
            <option value="">Select Specialization</option>
            <option value="Business and Management">Business and Management</option>
            <option value="Computer Science and IT">Computer Science and IT</option>
            <option value="Engineering">Engineering</option>
            <option value="Social Science">Social Science</option>
            <option value="Architecture">Architecture</option>
            <option value="Professional Studies">Professional Studies</option>
            <option value="Hospitality and Tourism">Hospitality and Tourism</option>
            <option value="Science">Science</option>
            <option value="Sports Studies">Sports Studies</option>
            <option value="Fine Arts">Fine Arts</option>
            <option value="Law">Law</option>
            <option value="Education">Education</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Medicine">Medicine</option>
            <option value="Journalism and Media">Journalism and Media</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Arts">Arts</option>
            <option value="Commerce">Commerce</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 formField">
          <label style={{ fontFamily: 'Gilroy-Bold' }}>Course Names *</label>
          <div className="custom-dropdown">
            <div 
              className="dropdown-header" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ fontFamily: 'Gilroy-Medium', cursor: 'pointer', border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}
            >
              {data.coursesName.length > 0 ? `${data.coursesName.length} course(s) selected` : 'Select Courses'}
            </div>
            {dropdownOpen && (
              <div className="dropdown-list" style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', borderTop: 'none', borderRadius: '0 0 4px 4px' }}>
                {courses.map((course) => (
                  <label key={course._id} style={{ display: 'block', padding: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={data.coursesName.includes(course.courseName)}
                      onChange={() => handleCourseChange(course.courseName)}
                    />
                    <span style={{ marginLeft: '8px' }}>{course.courseName}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          style={{
            backgroundColor: "#FF6477",
            padding: "10px",
            borderRadius: "4px",
            color: "#fff",
            fontFamily: "Gilroy-Bold",
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