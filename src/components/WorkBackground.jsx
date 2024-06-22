import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema for the work experience details
const validationSchema = Yup.object({
  jobTitle: Yup.string().required('Job title is required'),
  company: Yup.string().required('Company name is required'),
  location: Yup.string().required('Location is required'),
  jobSummary: Yup.string().required('Job summary is required'),
  joiningDate: Yup.date().required('Joining date is required').typeError('Invalid date format'),
  workedTill: Yup.date().required('End date is required or mark as current').typeError('Invalid date format')
});

export default function WorkBackground({ setFormData , formData , setState , state}) {

  console.log(formData.workExperience, "formData");
  
  return (
    <Formik
      initialValues={{
        jobTitle: formData?.workExperience[0]?.jobTitle || "",
        company: formData?.workExperience[0]?.company || "",
        location: formData?.workExperience[0]?.location || "",
        jobSummary: formData?.workExperience[0]?.jobSummary || "",
        joiningDate: formData?.workExperience[0]?.joiningDate?.split("T")[0] || "",
        workedTill: formData?.workExperience[0]?.workedTill?.split("T")[0] || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setFormData(prev => ({
          ...prev,
          workExperience: {
            ...prev.workBackground,
            ...values
          }
        }))
        setState(state + 1);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ handleSubmit }) => (
        <Form className="main-container">
          <h3 className="heading" style={{fontFamily: 'Gilroy-Bold'}}>Work Experience</h3>
          <div className="row">
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Job title</label>
              <Field
                type="text"
                name="jobTitle"
                placeholder="Enter your job title"
                className="input"
                style={{fontFamily: 'Gilroy-Medium'}}
              />
              <ErrorMessage name="jobTitle" component="div" className="error" style={{fontFamily: 'Gilroy-Medium'}} />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Company Name</label>
              <Field
                type="text"
                name="company"
                placeholder="Enter company name"
                className="input"
                style={{fontFamily: 'Gilroy-Medium'}}
              />
              <ErrorMessage name="company" component="div" className="error" style={{fontFamily: 'Gilroy-Medium'}} />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Location</label>
              <Field
                type="text"
                name="location"
                placeholder="Enter location"
                className="input"
                style={{fontFamily: 'Gilroy-Medium'}}
              />
              <ErrorMessage name="location" component="div" className="error" style={{fontFamily: 'Gilroy-Medium'}} />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Job Summary</label>
              <Field
                type="text"
                name="jobSummary"
                placeholder="Enter job summary"
                className="input"
                style={{fontFamily: 'Gilroy-Medium'}}
              />
              <ErrorMessage name="jobSummary" component="div" className="error" style={{fontFamily: 'Gilroy-Medium'}} />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Joining Date</label>
              <Field
                type="date"
                name="joiningDate"
                className="input"
                style={{fontFamily: 'Gilroy-Medium'}}
              />
              <ErrorMessage name="joiningDate" component="div" className="error" style={{fontFamily: 'Gilroy-Medium'}} />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Worked till</label>
              <Field
                type="date"
                name="workedTill"
                className="input"
                style={{fontFamily: 'Gilroy-Medium'}}
              />
              <ErrorMessage name="workedTill" component="div" className="error" style={{fontFamily: 'Gilroy-Medium'}} />
            </div>
          </div>
          <div className="button-container" style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button type="submit" className="saveButton" style={{backgroundColor:"#FF6477", padding:"10px", borderRadius:"4px", color:"#fff", minWidth:"100px"}}>
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}