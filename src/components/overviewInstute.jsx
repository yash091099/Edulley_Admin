import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./overviewInstute.css";
import CustomLoader from './loader';

// Create a validation schema using Yup
const validationSchema = Yup.object({
  universityName: Yup.string().required('University name is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  overview: Yup.string().required('Overview is required'),
  requirements: Yup.string().required('Admission requirements are required'),
});

const Overview = ({ onDataChange, initialData , resetVersion }) => {

  const [loading, setLoading] = useState(false);

  console.log(initialData);
  // Function to handle file uploads and update Formik state
  const handleFileChange = async (event, setFieldValue, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      try {
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
        setFieldValue(fieldName, uploadedUrl);
        console.log("Updated Field:", fieldName, uploadedUrl);
        
        onDataChange({...initialData, [fieldName]: uploadedUrl}); // Update the external state
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error uploading file:", error.message);
      }
    }
  };

  // resetForm();

  useEffect(() => {
    onDataChange(initialData);
  }, [resetVersion]);

  return (
    <>
    <Formik
      initialValues={{
        universityName: initialData?.universityName || "",
        country: initialData?.country || "",
        city: initialData?.city || "",
        overview: initialData?.overview || "",
        requirements: initialData?.requirements || "",
        brochure: initialData?.brochure || "",
        logo: initialData?.logo || "",
        banner: initialData?.banner || "",
      }}

      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form data submitted:", values);
        onDataChange(values);
      }}
      enableReinitialize
    >
      {({ setFieldValue, values }) => (
        <Form className="overview-container">
          <h3 className="heading">Overview</h3>
          <div className="row">
            <div className="col-md-6 formField">
              <label>University Name</label>
              <Field className="input" type="text" name="universityName" placeholder="Add university name"
                onChange={e => {
                  setFieldValue("universityName", e.target.value);
                  onDataChange({...values, universityName: e.target.value});
                }} />
              <ErrorMessage name="universityName" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>Logo</label>
              <input className="input" type="file" name="logo" onChange={(e) => handleFileChange(e, setFieldValue, 'logo')} style={{ display: 'none' }} id="logo-upload" />
              <label htmlFor="logo-upload" className="btn btn-secondary">Upload Logo</label>
              <ErrorMessage name="logo" component="div" className="error" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 formField">
              <label>Country</label>
              <Field className="input" type="text" name="country" placeholder="Select Country"
                onChange={e => {
                  setFieldValue("country", e.target.value);
                  onDataChange({...values, country: e.target.value});
                }} />
              <ErrorMessage name="country" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>City</label>
              <Field className="input" type="text" name="city" placeholder="Select City"
                onChange={e => {
                  setFieldValue("city", e.target.value);
                  onDataChange({...values, city: e.target.value});
                }} />
              <ErrorMessage name="city" component="div" className="error" />
            </div>
          </div>

          <div className='row'>
            <div className="col-md-6 formField">
              <label>Banner</label>
              <input className="input" type="file" name="banner" onChange={(e) => handleFileChange(e, setFieldValue, 'banner')} style={{ display: 'none' }} id="banner-upload" />
              <label htmlFor="banner-upload" className="btn btn-secondary">Upload Banner</label>
              <ErrorMessage name="banner" component="div" className="error" />
            </div>

            <div className="col-md-6 formField">
              <label>Brochure</label>
              <Field className="input" type="text" name="brochure" placeholder="Add Brochure"
                onChange={e => {
                  setFieldValue("brochure", e.target.value);
                  onDataChange({...values, brochure: e.target.value});
                }} />
              <ErrorMessage name="brochure" component="div" className="error" />
            </div>
          </div>


          <div className="row">
            <div className="col-md-12 formField">
              <label>Overview</label>
              <Field as="textarea" name="overview" className="p-2" placeholder="Add Overview"
                onChange={e => {
                  setFieldValue("overview", e.target.value);
                  onDataChange({...values, overview: e.target.value});
                }} />
              <ErrorMessage name="overview" component="div" className="error" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 formField">
              <label>Admission Requirements</label>
              <Field as="textarea" name="requirements" className="p-2" placeholder="Add Admission Requirements"
                onChange={e => {
                  setFieldValue("requirements", e.target.value);
                  onDataChange({...values, requirements: e.target.value});
                }} />
              <ErrorMessage name="requirements" component="div" className="error" />
            </div>
          </div>
         
        </Form>
      )}
    </Formik>

    {loading && <CustomLoader />}
    </>
  );
};

export default Overview;
