import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomLoader from "./loader";

// Define the validation schema using Yup
const rankingValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  rank: Yup.number()
    .required('Rank is required')
    .positive('Rank must be a positive number')
    .integer('Rank must be an integer'),
});

const Ranking = ({ onDataChange, initialData }) => {

  const [loading , setLoading] = useState(false);
  
  // Handle file changes for the logo
  const handleFileChange = async (event, setFieldValue) => {
    const file = event.target.files[0];
    if (!file) return; // Exit if no file is selected
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("https://api.mymultimeds.com/api/file/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }
      const responseData = await response.json();
      const uploadedUrl = responseData.publicUrl;
      setFieldValue("logo", uploadedUrl); // Update Formik state
      onDataChange({ ...initialData, logo: uploadedUrl }); // Update parent component's state
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error uploading file:", error.message);
    }
  };

  return (

    <>
    <Formik
      initialValues={{
        logo: initialData?.logo || "",
        name: initialData?.name || "",
        rank: initialData?.rank || ""
      }}
      validationSchema={rankingValidationSchema}
      onSubmit={(values) => {
        onDataChange(values);
      }}
      enableReinitialize
    >
      {({ setFieldValue, values, handleChange }) => (
        <Form className="overview-container">
          <h3 className="heading">Ranking</h3>
          <div className="row">
            <div className="col-md-6 formField">
              <label>Logo</label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="file-upload"
                onChange={(event) => handleFileChange(event, setFieldValue)}
              />
              {values.logo && (
                <img src={values.logo} alt="Uploaded Logo" style={{ width: '100px', height: '100px' }} />
              )}
            </div>
            <div className="col-md-6 formField">
              <label>Name</label>
              <Field type="text" name="name" placeholder="Add name" className="input" onChange={(e) => {
                handleChange(e); // This is Formik's handleChange
                onDataChange({ ...values, name: e.target.value }); // Also update parent component's state
              }} />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 formField">
              <label>Rank</label>
              <Field type="number" name="rank" placeholder="Add rank" className="input" onChange={(e) => {
                handleChange(e); // This is Formik's handleChange
                onDataChange({ ...values, rank: e.target.value }); // Also update parent component's state
              }} />
              <ErrorMessage name="rank" component="div" className="error" />
            </div>
          </div>
          <h3 className="AddMore">Add more in Ranking</h3>
          {/* Removed the Save button to reflect updates via onChange */}
        </Form>
      )}
    </Formik>

    {loading && <CustomLoader/>}
    </>
  );
};

export default Ranking;
