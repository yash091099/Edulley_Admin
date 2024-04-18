import React, { useState, useEffect } from "react";
import Table from "./Table";
import DashboardCard from "./DashboardCard";
import ReportCard from "./ReportCard";
import AddCareer from "./AddCareer";
import acceptedIcon from "../assets/svg/accepted-orders.svg";
import rejectedIcon from "../assets/svg/rejected-orders.svg";
import productsIcon from "../assets/svg/products.svg";
import revenueIcon from "../assets/svg/revenue.svg";
import graph from "../assets/Graph_1.png";
import { fetchDashboardData } from "../context/services/client";
import CustomLoader from "./loader";

export default function AdminDashboard() {
  const [data, setData] = useState({
    students: 0,
    applications: 0,
    courses: 0,
    universities: 0,
    recentStudents: [],
  });
  const [loader, setLoader] = useState(false);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const chartData = [
    { name: "Jan", students: 0 },
    { name: "Feb", students: 0 },
    { name: "Mar", students: 0 },
    { name: "Apr", students: 0 },
    { name: "May", students: 0 },
    { name: "Jun", students: 0 },
    { name: "Jul", students: 0 },
    { name: "Aug", students: 0 },
    { name: "Sep", students: 0 },
    { name: "Oct", students: 0 },
    { name: "Nov", students: 0 },
    { name: "Dec", students: 0 },
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoader(true);
      const response = await fetchDashboardData();
      if (response.status === 200) {
        setData({
          students: response?.data?.data?.students,
          applications: response?.data?.data?.applications,
          courses: response?.data?.data?.courses,
          universities: response?.data?.data?.universities,
          recentStudents: response?.data?.data?.recentStudents,
        });
      } else {
        console.error("Failed to fetch data:", response.message);
      }
      setLoader(false);
    };
    loadData();
  }, []);

  const columns = [
    { name: "NAME", enableSorting: true, searchingEnabled: true },
    { name: "EMAIL", enableSorting: true, searchingEnabled: true },
    { name: "LOCATION", enableSorting: true, searchingEnabled: true },
    { name: "PHONE", enableSorting: true, searchingEnabled: true },
    { name: "DATE JOINED", enableSorting: true, searchingEnabled: true },
  ];

  return (
    <>
      {loader && <CustomLoader />}
      <div className="flex flex-col gap-[2rem]">
        <div className="flex flex-col gap-[1.5rem] bg-white p-[2rem] rounded-[1rem]">
          <h1 className="text-[1.5rem] font-[600]">Admin Dashboard</h1>
          <div className="flex gap-[1.25rem]">
            <DashboardCard
              image={acceptedIcon}
              value={`${data.students}`}
              label="Total no of user (student)"
            />
            <DashboardCard
              image={rejectedIcon}
              value={`${data.applications}`}
              label="Total no of application"
            />
            <DashboardCard
              image={productsIcon}
              value={`${data.courses}`}
              label="Total no of courses"
            />
            <DashboardCard
              image={revenueIcon}
              value={`${data.universities}`}
              label="Total no of universities"
            />
          </div>
        </div>
        <ReportCard
          label="Total number of students"
          value={data?.students}
          filterOptions={["2020", "2021", "2022", "2023", "2024"]}
          data={chartData}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />

        <div className="flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-md">
          <h1 className="text-text text-[1.5rem] font-[600]">
            Recent Students
          </h1>
          <Table
            columns={columns}
            data={data?.recentStudents}
            mapping={["Name", "Email", "Location", "Phone", "Date Joined"]}
          />
        </div>
        <div className="flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-md">
          <h1 className="text-text text-[1.5rem] font-[600]">
            Recent Educators
          </h1>
          <Table
            columns={columns}
            data={data.recentStudents}
            mapping={["Name", "Email", "Location", "Phone", "Date Joined"]}
          />
        </div>
      </div>
    </>
  );
}
