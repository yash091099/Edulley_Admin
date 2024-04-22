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
import { fetchDashboardData, getStudentByMonth } from "../context/services/client";
import CustomLoader from "./loader";
import TableWithoutPagination from "./tableWithoutpagination";

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

  const [chartData , setChartData] = useState([])

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
          recentCourses: response?.data?.data?.recentCourses,
        });
      } else {
        console.error("Failed to fetch data:", response.message);
      }
      setLoader(false);
    };

    const getStudentsByMonth = async () => {
      const response = await getStudentByMonth();
      if (response.status === 200) {
        setChartData(response?.data?.data)

      } else {
        console.error("Failed to fetch data:", response.message);
      }
    };
    getStudentsByMonth();
     

    loadData();
  }, []);

  const columns = [
    { name: "NAME", enableSorting: true, searchingEnabled: true },
    { name: "EMAIL", enableSorting: true, searchingEnabled: true },
    { name: "GENDER", enableSorting: true, searchingEnabled: true },
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
          <TableWithoutPagination
           columns={columns}
            data={data.recentStudents}
            mapping={["fullName", "email", "gender", "contactNumber", "createdAt"]}
            fun={console.log}
          />
        </div>
        <div className="flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-md">
          <h1 className="text-text text-[1.5rem] font-[600]">
            Recent Courses
          </h1>
          <TableWithoutPagination
          component="Course"
            columns={[
              { name: "NAME", enableSorting: true, searchingEnabled: true },
              { name: "DURATION", enableSorting: true, searchingEnabled: true },
              { name: "FEE", enableSorting: true, searchingEnabled: true },
              {
                name: "LAST DATE",
                enableSorting: true,
                searchingEnabled: true,
              },
              {
                name: "APPLICATION FEE",
                enableSorting: true,
                searchingEnabled: true,
              },
            ]}
            data={data?.recentCourses?.map((course) => ({
              courseName: course.courseName,
              duration: course.uniqueCourseInfo?.duration,
              fee: course.uniqueCourseInfo?.fee,
              applicationDeadline: new Date(
                course.uniqueCourseInfo?.applicationDeadline
              ).toLocaleDateString(),
              applicationFee: course.uniqueCourseInfo?.applicationFee,
              ...course,
            }))}
            mapping={[
              "courseName",
              "duration",
              "fee",
              "applicationDeadline",
              "applicationFee",
            ]}
            fun={console.log}
            
          />
        </div>
      </div>
    </>
  );
}
