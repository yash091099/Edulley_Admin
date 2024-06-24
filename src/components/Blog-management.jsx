import React, { useState, useEffect } from "react";
import Table from "./Table";
import filterIcon from "../assets/svg/filter-icon.svg";
import addIcon from "../assets/svg/Rectangle.svg";
import AddBlog from "./add-blog";
import { getAllBlogs } from "../context/services/client";
import { useNavigate } from "react-router-dom";
import CustomLoader from "./loader";
import { AddCircle, Backspace } from "@material-ui/icons";

export default function BlogManagement() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [existingBlog, setExistingBlog] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage , isAdd]);

  const fetchBlogs = async () => {
    setLoading(true);
    const response = await getAllBlogs({ page: currentPage, limit: 10 });
    if (response.status === 200) {
      setBlogs(response?.data?.data?.list);
      setTotalPages(Math.ceil(response?.data?.data?.totalCount / 10));
      // setTotalPages(Math.ceil(response.data.totalCount / 10));
    } else {
      console.error("Failed to fetch blogs:", response.message);
      setBlogs([]);
    }
    setLoading(false);
  };

  const openAddForm = () => {
    setIsAdd(true);
  };


  const handleBack = () => {
    setIsAdd(false);
    setExistingBlog(null);
  };

  const editBlog = (blog) => {
    setIsAdd(true);
    setExistingBlog(blog);
  };

  return (
    <>
    {loading && <CustomLoader />}
    <div className="flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]">
      <div className="flex justify-between">
        <h1 style={{fontFamily:"Gilroy-Bold"}} className="text-text text-[1.5rem] font-[600]">
          {isAdd ? "Edit Blog" : "Blog Management"}
        </h1>
        <div className="flex justify-between gap-[0.2rem]">
          {/* <button className="flex gap-[0.25rem] items-center border border-[#89BF2C] px-[1.5rem] py-[0.5rem] rounded-[0.5rem]">
            <img src={filterIcon} alt="Filter" />
            <p className="text-text text-[0.75rem] font-[600]">Filter</p>
          </button> */}
          <button style={{fontFamily:"Gilroy-Bold"}}
            onClick={() => (isAdd ? handleBack() : openAddForm(null))}
            className="flex gap-[0.25rem] items-center border border-[#89BF2C] px-[1.5rem] py-[0.5rem] rounded-[0.5rem]"
          >
            {isAdd ? <Backspace /> : <AddCircle/>}
            <p className="text-text text-[0.75rem] font-[600]">
              {isAdd ? "Back" : "Add"}
            </p>
          </button>
        </div>
      </div>

      {isAdd ? (
        <AddBlog existingBlog={existingBlog} openAddForm={handleBack} />
      ) : (
        <Table
          columns={[
            { name: "Date", enableSorting: true, searchingEnabled: true },
            {
              name: "Blog Heading",
              enableSorting: true,
              searchingEnabled: true,
            },
            { name: "Tags", enableSorting: true, searchingEnabled: true },
          ]}
          data={blogs}
          mapping={["date", "heading", "tags"]}
          fun={editBlog}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}

        />
      )}
    </div>
    </>
  );
}
