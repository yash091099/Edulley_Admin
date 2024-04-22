import React, { useEffect } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Field is Required'),
  gender: Yup.string().required('Field is Required'),
  contactNumber: Yup.string().matches(/^[0-9]+$/, 'Invalid contact number').required('Field is Required'),
  emailID: Yup.string().email('Invalid email').required('Field is Required'),
  dob: Yup.date().required('Field is Required'),
  maritalStatus: Yup.string().required('Field is Required'),
  mailingAddressLine1: Yup.string().required('Field is Required'),
  mailingAddressLine2: Yup.string().required('Field is Required'),
  mailingCountry: Yup.string().required('Field is Required'),
  mailingState: Yup.string().required('Field is Required'),
  mailingCity: Yup.string().required('Field is Required'),
  mailingPincode: Yup.string().matches(/^[0-9]+$/, 'Invalid pincode').required('Field is Required'),
  permanentAddressLine1: Yup.string().required('Field is Required'),
  permanentAddressLine2: Yup.string().required('Field is Required'),
  permanentCountry: Yup.string().required('Field is Required'),
  permanentState: Yup.string().required('Field is Required'),
  permanentCity: Yup.string().required('Field is Required'),
  permanentPincode: Yup.string().matches(/^[0-9]+$/, 'Invalid pincode').required('Field is Required'),
  passportNumber: Yup.string().required('Field is Required'),
  passportIssueCountry: Yup.string().required('Field is Required'),
  passportIssueDate: Yup.date().required('Field is Required'),
  passportExpiryDate: Yup.date().required('Field is Required'),
  passportStateOfBirth: Yup.string().required('Field is Required'),
  passportCountryOfBirth: Yup.string().required('Field is Required'),
});

const PersonalDetails = ( { setFormData  , formData , setState , state}) => {

  return (
    <Formik
      initialValues={{
        passportCountryOfBirth: formData?.personalDetails?.passportCountryOfBirth || "",
        passportStateOfBirth: formData?.personalDetails?.passportStateOfBirth || "",
        passportExpiryDate: formData?.personalDetails?.passportExpiryDate?.split("T")[0] || "",
        passportIssueDate: formData?.personalDetails?.passportIssueDate?.split("T")[0] || "",
        passportIssueCountry: formData?.personalDetails?.passportIssueCountry || "",
        passportNumber: formData?.personalDetails?.passportNumber || "",
        permanentPincode: formData?.personalDetails?.permanentPincode || "",
        permanentCity: formData?.personalDetails?.permanentCity || "",
        permanentState: formData?.personalDetails?.permanentState || "",
        permanentCountry: formData?.personalDetails?.permanentCountry || "",
        permanentAddressLine2: formData?.personalDetails?.permanentAddressLine2 || "",
        permanentAddressLine1: formData?.personalDetails?.permanentAddressLine1 || "",
        mailingPincode: formData?.personalDetails?.mailingPincode || "",
        mailingCity: formData?.personalDetails?.mailingCity || "",
        mailingState: formData?.personalDetails?.mailingState || "",
        mailingCountry: formData?.personalDetails?.mailingCountry || "",
        mailingAddressLine2: formData?.personalDetails?.mailingAddressLine2 || "",
        mailingAddressLine1: formData?.personalDetails?.mailingAddressLine1 || "",
        maritalStatus: formData?.personalDetails?.maritalStatus || "",
        dob: formData?.personalDetails?.dob?.split("T")[0] || "",
        emailID: formData?.personalDetails?.emailID || "",
        contactNumber: formData?.personalDetails?.contactNumber || "",
        gender: formData?.personalDetails?.gender || "",
        name: formData?.personalDetails?.name || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setFormData(prev => ({ ...prev, personalDetails: values }));
        setState(state+1)
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="main-container">
          <h3 className="heading">Personal Information</h3>
          <div className="row">
            <div className="col-md-6 formField">
              <label>Full Name</label>
              <Field name="name" type="text" placeholder="Full Name" className="input" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>Gender</label>
              <Field as="select" name="gender" className="input">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>Contact Number</label>
              <Field name="contactNumber" type="text" placeholder="Contact Number" className="input" />
              <ErrorMessage name="contactNumber" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>Email ID</label>
              <Field name="emailID" type="email" placeholder="Email Address" className="input" />
              <ErrorMessage name="emailID" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>Date of Birth</label>
              <Field name="dob" type="date" className="input" />
              <ErrorMessage name="dob" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>Marital Status</label>
              <Field name="maritalStatus" type="text" placeholder="Marital Status" className="input" />
              <ErrorMessage name="maritalStatus" component="div" className="error" />
            </div>
          </div>

          <h3 className="heading">Mailing Address</h3>
          <div className="row">
            <div className="col-md-6 formField">
              <label>Address Line 1</label>
              <Field name="mailingAddressLine1" type="text" placeholder="Address Line 1" className="input" />
              <ErrorMessage name="mailingAddressLine1" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>Address Line 2</label>
              <Field name="mailingAddressLine2" type="text" placeholder="Address Line 2" className="input" />
              <ErrorMessage name="mailingAddressLine2" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>Country</label>
              <Field name="mailingCountry" type="text" placeholder="Country" className="input" />
              <ErrorMessage name="mailingCountry" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>State</label>
              <Field name="mailingState" type="text" placeholder="State" className="input" />
              <ErrorMessage name="mailingState" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>City</label>
              <Field name="mailingCity" type="text" placeholder="City" className="input" />
              <ErrorMessage name="mailingCity" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>Pincode</label>
              <Field name="mailingPincode" type="text" placeholder="Pincode" className="input" />
              <ErrorMessage name="mailingPincode" component="div" className="error" />
            </div>
          </div>

          <h3 className="heading">Permanent Address</h3>
          <div className="row">
            <div className="col-md-6 formField">
              <label>Address Line 1</label>
              <Field name="permanentAddressLine1" type="text" placeholder="Address Line 1" className="input" />
              <ErrorMessage name="permanentAddressLine1" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>Address Line 2</label>
              <Field name="permanentAddressLine2" type="text" placeholder="Address Line 2" className="input" />
              <ErrorMessage name="permanentAddressLine2" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>Country</label>
              <Field name="permanentCountry" type="text" placeholder="Country" className="input" />
              <ErrorMessage name="permanentCountry" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>State</label>
              <Field name="permanentState" type="text" placeholder="State" className="input" />
              <ErrorMessage name="permanentState" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>City</label>
              <Field name="permanentCity" type="text" placeholder="City" className="input" />
              <ErrorMessage name="permanentCity" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>Pincode</label>
              <Field name="permanentPincode" type="text" placeholder="Pincode" className="input" />
              <ErrorMessage name="permanentPincode" component="div" className="error" />
            </div>
          </div>

          <h3 className="heading">Passport Information</h3>
          <div className="row">
            <div className="col-md-6 formField">
              <label>Passport Number</label>
              <Field name="passportNumber" type="text" placeholder="Passport Number" className="input" />
              <ErrorMessage name="passportNumber" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>Issue Country</label>
              <Field name="passportIssueCountry" type="text" placeholder="Issue Country" className="input" />
              <ErrorMessage name="passportIssueCountry" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>Issue Date</label>
              <Field name="passportIssueDate" type="date" className="input" />
              <ErrorMessage name="passportIssueDate" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>Expiry Date</label>
              <Field name="passportExpiryDate" type="date" className="input" />
              <ErrorMessage name="passportExpiryDate" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>State of Birth</label>
              <Field name="passportStateOfBirth" type="text" placeholder="State of Birth" className="input" />
              <ErrorMessage name="passportStateOfBirth" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label>Country of Birth</label>
              <Field name="passportCountryOfBirth" type="text" placeholder="Country of Birth" className="input" />
              <ErrorMessage name="passportCountryOfBirth" component="div" className="error" />
            </div>
          </div>

          <div className="button-container">
            <button type="submit" className="saveButton" style={{ backgroundColor: "#FF6477", padding: "10px", borderRadius: "4px", color: "#fff", minWidth: "100px" }}>
              Next
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default PersonalDetails;
