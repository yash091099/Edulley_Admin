import React, { useEffect, useState } from "react";
import "./overviewInstute.css";
import { addBlog, editBlog, uploadFile } from "../context/services/client";
import toaster from "../Shared/toaster";

const AddBlog = ({ existingBlog , openAddForm }) => {
  const [data, setData] = useState({
    blogHeading: "",
    date: "",
    banner: "",
    tags: [],
    quote: "",
    content: "",
  });

  useEffect(() => {
    if (existingBlog) {
      setData({
        blogHeading: existingBlog?.heading || "",
        date: existingBlog?.date?.split("T")[0] || "",
        banner: existingBlog?.bannerImage || "",
        tags: existingBlog?.tags || [],
        quote: existingBlog?.quote || "",
        content: existingBlog?.content || "",
      });
    }
  }, [existingBlog]);

  const saveBlog = () => {
    if (!data?.blogHeading || !data?.date || !data?.content) {
      toaster.error("Please fill in all required fields.");
      return;
    }

    const payload = {
      heading: data.blogHeading,
      date: data.date,
      bannerImage: data.banner,
      tags: data.tags,
      content: data.content,
      quote: data.quote,
    };

    const action = existingBlog ? editBlog : addBlog;
    action(payload)
      .then(() => {
        openAddForm();
        toaster.success(
          existingBlog
            ? "Blog updated successfully!"
            : "Blog added successfully!"
        );
        resetForm();
      })
      .catch((error) => {
        toaster.error(`Error: ${error.message}`);
      });
  };

  const resetForm = () => {
    setData({
      blogHeading: "",
      date: "",
      banner: "",
      tags: [],
      quote: "",
      content: "",
    });
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
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }
      const responseData = await response.json();
      const uploadedUrl = responseData.publicUrl;
      setData((prev) => ({ ...prev, banner: uploadedUrl }));
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagInput = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      const newTag = event.target.value;
      setData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag], // Adds new tag to array
      }));
      event.target.value = ""; // Clear input after adding tag
    }
  };

  const removeTag = (index) => {
    setData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, idx) => idx !== index), // Removes tag by index
    }));
  };

  return (
    <>
      <div className="overview-container">
        <h3 className="heading">Add Blog</h3>
        <div className="row">
          <div className="col-md-6 formField">
            <label>Blog Heading*</label>
            <input
              className="input"
              type="text"
              name="blogHeading"
              placeholder="Add Blog Heading"
              value={data?.blogHeading}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 formField">
            <label>Date*</label>
            <input
              className="input"
              type="date"
              name="date"
              value={data?.date}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 formField">
            <label>Banner Image</label>
            <input
              className="input"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <label
              onClick={() =>
                document.querySelector('input[type="file"]').click()
              }
              htmlFor="banner-upload"
              className="btn btn-secondary"
            >
              Upload Banner
            </label>
          </div>
          <div className="col-md-6 formField">
            <label>Tags</label>
            <input
              className="input"
              type="text"
              placeholder="Add Tags"
              onKeyPress={handleTagInput}
            />
            {data?.tags?.length > 0 && (
              <div className="tags-container">
                {data?.tags?.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                    <button
                      className="remove-tag"
                      onClick={() => removeTag(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 formField">
            <label>Content*</label>
            <textarea
              name="content"
              value={data?.content}
              placeholder="Add Content"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 formField">
            <label>Quote</label>
            <textarea
              name="quote"
              value={data?.quote}
              placeholder="Add Quote"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="button-container">
          <button
            className="saveButton"
            style={{
              backgroundColor: "#FF6477",
              padding: "10px",
              borderRadius: "4px",
              color: "#fff",
              minWidth: "100px",
            }}
            onClick={saveBlog}
            // disabled={!data?.blogHeading || !data?.date || !data?.content}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
