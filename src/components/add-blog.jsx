import React, { useEffect, useState } from "react";
import "./overviewInstute.css";
import { addBlog, editBlog, uploadFile } from "../context/services/client";
import { toast } from "react-hot-toast";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill stylesheet
import CustomLoader from "./loader";

const AddBlog = ({ existingBlog, openAddForm }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    blogHeading: existingBlog?.heading || "",
    date: existingBlog?.date ? existingBlog?.date?.split("T")[0] : "",
    banner: existingBlog?.bannerImage || "",
    tags: existingBlog?.tags || [],
    quote: existingBlog?.quote || "",
    content: existingBlog?.content || ""
  });

  const saveBlog = () => {
    if (!data.blogHeading || !data.date || !data.content) {
      toast.error("Please fill in all required fields.");
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
    payload.blogId = existingBlog?._id;

    const action = existingBlog ? editBlog : addBlog;
    action(payload)
      .then(() => {
        openAddForm();
        toast.success(existingBlog ? "Blog updated successfully!" : "Blog added successfully!");
        resetForm();
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
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
      setLoading(true);
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
      setData((prev) => ({ ...prev, banner: uploadedUrl }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(`Error uploading file: ${error.message}`);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTagInput = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      const newTag = event.target.value;
      setData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, newTag],
      }));
      event.target.value = "";
    }
  };

  const removeTag = (indexToRemove) => {
    setData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((_, index) => index !== indexToRemove),
    }));
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];


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

            {data?.banner && (
              <img
                src={data?.banner}
                alt="Uploaded Banner"
                style={{ width: "100px", height: "100px" }}
              />
            )}
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
        <div className="textEditor col-md-12">
        <label>Content*</label>
        <ReactQuill
          theme="snow"
          value={data.content}
          onChange={(content) => setData({ ...data, content })}
          modules={modules}
          formats={formats}
        />
      </div>
      <div className="textEditor col-md-12">
        <label>Quote</label>
        <ReactQuill
          theme="snow"
          value={data.quote}
          onChange={(quote) => setData({ ...data, quote })}
          modules={modules}
          formats={formats}
        />
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
          >
            Save
          </button>
        </div>
      </div>
      {loading && <CustomLoader />}
    </>
  );
};

export default AddBlog;
