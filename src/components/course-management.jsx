import React, { useState, useEffect } from "react";
import filterIcon from "../assets/svg/filter-icon.svg";
import addIcon from "../assets/svg/Rectangle.svg";
import { useNavigate } from "react-router-dom";
import AddCourse from "./AddCourse";
import CourseTable from "./CourseTable";
import { getCourses } from "../context/services/client";
import CustomLoader from "./loader";

export default function CourseManagement() {
  const navigate = useNavigate();
  const [existingCourse, setExistingCourse] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, [currentPage , isAdd]);

  const fetchCourses = async () => {
    setLoading(true);
    const queryParams = { page: currentPage, limit: 10 };
    try {
      const response = await getCourses(queryParams);
      if (response.status === 200) {
        setData(response?.data?.data?.list);
        setTotalCount(response?.data?.data?.totalCount);
        setTotalPages(
          Math.ceil(response?.data?.data?.totalCount / queryParams.limit)
        );
      } else {
        console.error("Failed to fetch courses:", response.message);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setData([]);
    }
    setLoading(false);
  };

  const openAddForm = () => {
    setExistingCourse(null);
    setIsAdd(!isAdd);
  };

  const editCourse = (course, index) => {
    const updatedData = [...data];
    updatedData[index] = course;
    setData(updatedData);
    setExistingCourse(course);
    setIsAdd(true);
  };

  const handleBack = () => {
    setIsAdd(false);
    setExistingCourse(null);
  };

  return (
    <>
      {loading && <CustomLoader />}
      <div className="flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]">
        <div className="flex justify-between">
          <h1 className="text-text text-[1.5rem] font-[600]">
            Course Management
          </h1>
          <div className="flex justify-between gap-[0.2rem]">
            <button
              onClick={openAddForm}
              className="flex gap-[0.25rem] items-center border border-[#89BF2C] px-[1.5rem] py-[0.5rem] rounded-[0.5rem]"
            >
              <img src={addIcon} alt="add" />
              <p className="text-text text-[0.75rem] font-[600]">
                {isAdd ? "Back" : "Add"}
              </p>
            </button>
          </div>
        </div>
        {isAdd ? (
          <AddCourse initialData={existingCourse} handleBack={handleBack} />
        ) : (
          <CourseTable
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
            data={data.map((course) => ({
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
            fun={editCourse}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}
