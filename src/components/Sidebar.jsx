import React, { useState } from "react";
import logo from '../assets/images/Edulley-logo.png';
import dashboardIcon from "../assets/svg/dashboard-icon.svg";
import RighttArrowIcon from "../assets/svg/right-arrow-light-icon.svg";
import ListItem from "./ListItem";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const [selectedOption, setSelectedOption] = useState("Dashboard");
  const navigate = useNavigate();
  return (
    <div className="min-w-[19.6875rem] h-full min-h-screen bg-white shadow-xl">
      <div
        className="flex justify-between items-center text-text text-[3.5rem] font-[600] w-full px-[1.25rem] py-[2.5rem]"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        <img className="w-[7.0625rem]" src={logo} alt="Logo" />
       
      </div>
      <div className="flex flex-col px-[0.75rem]">
        <ListItem
          label="Dashboard"
          image={dashboardIcon}
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => {
            navigate("/dashboard");
          }}
        ></ListItem>
        <ListItem
          label="Reports & Analytics"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => {
            navigate("/dashboard/reports");
          }}
        />

        <ListItem
          label="Institute Management"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => {
            navigate("/dashboard/institute-management");
          }}
        ></ListItem>
        <ListItem
          label="Student Management"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => {
            navigate("/dashboard/student-management");
          }}
        ></ListItem>
        <ListItem
          label="Course Manangement"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => {
            navigate("/dashboard/course-management");
          }}
        ></ListItem>
        <ListItem
          label="Scholarship"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => {
            navigate("/dashboard/Scholarship-management");
          }}
        ></ListItem>
        <ListItem
          label="Applications"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => {
            navigate("/dashboard/Applications-management");
          }}
        ></ListItem>
        <ListItem
          label="Blog Manangement"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => {
            navigate("/dashboard/Blog-management");
          }}
        ></ListItem>
          <ListItem
          label="Career path finder"
          activeOption={selectedOption}
          setActive={setSelectedOption}
          action={() => {
            navigate("/dashboard/Career-management");
          }}
        ></ListItem>
      </div>
    </div>
  );
}
