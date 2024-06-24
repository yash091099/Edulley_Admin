import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/images/Edulley-logo.png';
import dashboardIcon from "../assets/svg/dashboard-icon.svg";
import ListItem from "./ListItem";

export default function Sidebar() {
  const [selectedOption, setSelectedOption] = useState(() => {
    return localStorage.getItem("selectedSidebarOption") || "Dashboard";
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[2] || "dashboard";
    let option;
    switch (path) {
      case "dashboard":
        option = "Dashboard";
        break;
      case "reports":
        option = "Reports & Analytics";
        break;
      case "institute-management":
        option = "Institute Management";
        break;
      case "student-management":
        option = "Student Management";
        break;
      case "course-management":
        option = "Course Management";
        break;
      case "Scholarship-management":
        option = "Scholarship";
        break;
      case "Applications-management":
        option = "Applications";
        break;
      case "Blog-management":
        option = "Blog Management";
        break;
      case "Career-management":
        option = "Career path finder";
        break;
      default:
        option = "Dashboard";
    }
    setSelectedOption(option);
    localStorage.setItem("selectedSidebarOption", option);
  }, [location]);

  const handleOptionClick = (option, path) => {
    setSelectedOption(option);
    localStorage.setItem("selectedSidebarOption", option);
    navigate(path);
  };

  return (
    <div className="min-w-[19.6875rem] h-full min-h-screen bg-white shadow-xl">
      <div
        className="flex justify-between items-center text-text text-[3.5rem] font-[600] w-full px-[1.25rem] py-[2.5rem]"
        onClick={() => handleOptionClick("Dashboard", "/dashboard")}
      >
        <img className="w-[9.0625rem]" src={logo} alt="Logo" />
      </div>
      <div className="flex flex-col px-[0.75rem]">
        <ListItem
          label="Dashboard"
          image={dashboardIcon}
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => handleOptionClick("Dashboard", "/dashboard")}
        />
        <ListItem
          label="Reports & Analytics"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => handleOptionClick("Reports & Analytics", "/dashboard/reports")}
        />
        <ListItem
          label="Institute Management"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => handleOptionClick("Institute Management", "/dashboard/institute-management")}
        />
        <ListItem
          label="Student Management"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => handleOptionClick("Student Management", "/dashboard/student-management")}
        />
        <ListItem
          label="Course Management"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => handleOptionClick("Course Management", "/dashboard/course-management")}
        />
        <ListItem
          label="Scholarship"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => handleOptionClick("Scholarship", "/dashboard/Scholarship-management")}
        />
        <ListItem
          label="Applications"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => handleOptionClick("Applications", "/dashboard/Applications-management")}
        />
        <ListItem
          label="Blog Management"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => handleOptionClick("Blog Management", "/dashboard/Blog-management")}
        />
        <ListItem
          label="Career path finder"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => handleOptionClick("Career path finder", "/dashboard/Career-management")}
        />
      </div>
    </div>
  );
}