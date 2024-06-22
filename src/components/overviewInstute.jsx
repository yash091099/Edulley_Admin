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
        
        // If the uploaded file is a PDF, display a preview
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
          <h3 className="heading" style={{fontFamily:"Gilroy-Bold"}}>Overview</h3>
          <div className="row">
            <div className="col-md-6 formField">
              <label style={{fontFamily:"Gilroy-Bold"}}>University Name</label>
              <Field style={{fontFamily:"Gilroy-Medium"}}  className="input" type="text" name="universityName" placeholder="Add university name"
                onChange={e => {
                  setFieldValue("universityName", e.target.value);
                  onDataChange({...values, universityName: e.target.value});
                }} />
              <ErrorMessage style={{fontFamily:"Gilroy-Medium"}} name="universityName" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily:"Gilroy-Bold"}}>Logo</label>
              <input style={{fontFamily:"Gilroy-Medium", display: 'none'}} className="input" type="file" name="logo" onChange={(e) => handleFileChange(e, setFieldValue, 'logo')}  id="logo-upload" />
              <label style={{fontFamily:"Gilroy-Bold"}} htmlFor="logo-upload" className="btn btn-secondary">Upload Logo</label>
              <ErrorMessage style={{fontFamily:"Gilroy-Medium"}} name="logo" component="div" className="error" />
            </div>
            <div className="col-md-6"></div>
            <div className="col-md-6 mb-3">

              {values.logo && (
                <div className="preview-container">
                  <img src={values?.logo} alt="Logo Preview" className="preview-image" />
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 formField">
              <label style={{fontFamily:"Gilroy-Bold"}}>Country</label>
              <Field style={{fontFamily:"Gilroy-Medium"}} className="input" type="text" name="country" placeholder="Select Country"
                onChange={e => {
                  setFieldValue("country", e.target.value);
                  onDataChange({...values, country: e.target.value});
                }} />
              <ErrorMessage style={{fontFamily:"Gilroy-Medium"}} name="country" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily:"Gilroy-Bold"}}>City</label>
              <Field style={{fontFamily:"Gilroy-Medium"}} className="input" type="text" name="city" placeholder="Select City"
                onChange={e => {
                  setFieldValue("city", e.target.value);
                  onDataChange({...values, city: e.target.value});
                }} />
              <ErrorMessage style={{fontFamily:"Gilroy-Medium"}} name="city" component="div" className="error" />
            </div>
          </div>

          <div className='row'>
            <div className="col-md-6 formField">
              <label style={{fontFamily:"Gilroy-Bold"}}>Banner</label>
              <input style={{fontFamily:"Gilroy-Medium",display: 'none'}} className="input" type="file" accept='image/*' name="banner" onChange={(e) => handleFileChange(e, setFieldValue, 'banner')} id="banner-upload" />
              <label style={{fontFamily:"Gilroy-Bold"}} htmlFor="banner-upload" className="btn btn-secondary">Upload Banner</label>
              {values.banner && (
                <div className="preview-container">
                  <img src={values.banner} alt="Banner Preview" className="preview-image" />
                </div>
              )}
              {/* <ErrorMessage name="banner" component="div" className="error" /> */}
            </div>

            <div className="col-md-6 formField">
              <label style={{fontFamily:"Gilroy-Bold"}}>Brochure</label>
              <input style={{fontFamily:"Gilroy-Medium"}} className="input" accept='application/pdf' type="file" name="brochure" placeholder="Add Brochure"
                onChange={e => {
                  handleFileChange(e, setFieldValue, 'brochure');
                }} />
              {/* preview */}
              {values.brochure && (
                <div className="preview-container">
                  <embed src={values.brochure} type="application/pdf" width="200" height="200" />
                </div>
              )}
            </div>
          </div>


          <div className="row">
            <div className="col-md-12 formField">
              <label style={{fontFamily:"Gilroy-Bold"}}>Overview</label>
              <Field style={{fontFamily:"Gilroy-Medium"}} as="textarea" rows="5" name="overview" className="p-2" placeholder="Add Overview"
                onChange={e => {
                  setFieldValue("overview", e.target.value);
                  onDataChange({...values, overview: e.target.value});
                }} />
              <ErrorMessage style={{fontFamily:"Gilroy-Medium"}} name="overview" component="div" className="error" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 formField">
              <label style={{fontFamily:"Gilroy-Bold"}}>Admission Requirements</label>
              <Field style={{fontFamily:"Gilroy-Medium"}} as="textarea" rows="5" name="requirements" className="p-2" placeholder="Add Admission Requirements"
                onChange={e => {
                  setFieldValue("requirements", e.target.value);
                  onDataChange({...values, requirements: e.target.value});
                }} />
              <ErrorMessage style={{fontFamily:"Gilroy-Medium"}} name="requirements" component="div" className="error" />
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
