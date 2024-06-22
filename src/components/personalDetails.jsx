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
          <h3 className="heading" style={{fontFamily: 'Gilroy-Bold'}}>Personal Information</h3>
          <div className="row">
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Full Name</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}} name="name" type="text" placeholder="Full Name" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="name" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Gender</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}} as="select" name="gender" className="input">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="gender" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Contact Number</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="contactNumber" type="text" placeholder="Contact Number" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="contactNumber" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Email ID</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="emailID" type="email" placeholder="Email Address" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="emailID" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Date of Birth</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="dob" type="date" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="dob" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Marital Status</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="maritalStatus" type="text" placeholder="Marital Status" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="maritalStatus" component="div" className="error" />
            </div>
          </div>

          <h3 className="heading" style={{fontFamily: 'Gilroy-Bold'}}>Mailing Address</h3>
          <div className="row">
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Address Line 1</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="mailingAddressLine1" type="text" placeholder="Address Line 1" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="mailingAddressLine1" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Address Line 2</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="mailingAddressLine2" type="text" placeholder="Address Line 2" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="mailingAddressLine2" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Country</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="mailingCountry" type="text" placeholder="Country" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="mailingCountry" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>State</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="mailingState" type="text" placeholder="State" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="mailingState" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>City</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="mailingCity" type="text" placeholder="City" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="mailingCity" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Pincode</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="mailingPincode" type="text" placeholder="Pincode" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="mailingPincode" component="div" className="error" />
            </div>
          </div>

          <h3 className="heading" style={{fontFamily: 'Gilroy-Bold'}}>Permanent Address</h3>
          <div className="row">
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Address Line 1</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="permanentAddressLine1" type="text" placeholder="Address Line 1" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="permanentAddressLine1" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Address Line 2</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="permanentAddressLine2" type="text" placeholder="Address Line 2" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="permanentAddressLine2" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Country</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="permanentCountry" type="text" placeholder="Country" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="permanentCountry" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>State</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="permanentState" type="text" placeholder="State" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="permanentState" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>City</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="permanentCity" type="text" placeholder="City" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="permanentCity" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Pincode</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="permanentPincode" type="text" placeholder="Pincode" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="permanentPincode" component="div" className="error" />
            </div>
          </div>

          <h3 className="heading" style={{fontFamily: 'Gilroy-Bold'}}>Passport Information</h3>
          <div className="row">
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Passport Number</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="passportNumber" type="text" placeholder="Passport Number" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="passportNumber" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Issue Country</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="passportIssueCountry" type="text" placeholder="Issue Country" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="passportIssueCountry" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Issue Date</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="passportIssueDate" type="date" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="passportIssueDate" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Expiry Date</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}  name="passportExpiryDate" type="date" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}}  name="passportExpiryDate" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
            <label style={{fontFamily: 'Gilroy-Bold'}}>State of Birth</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}}name="passportStateOfBirth" type="text" placeholder="State of Birth" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="passportStateOfBirth" component="div" className="error" />
            </div>
            <div className="col-md-6 formField">
              <label style={{fontFamily: 'Gilroy-Bold'}}>Country of Birth</label>
              <Field style={{fontFamily: 'Gilroy-Medium'}} name="passportCountryOfBirth" type="text" placeholder="Country of Birth" className="input" />
              <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="passportCountryOfBirth" component="div" className="error" />
            </div>
          </div>

          <div className="button-container" style={{display: 'flex', justifyContent: 'flex-end'}}>
        <button type="submit" className="saveButton" style={{fontFamily: 'Gilroy-Bold', backgroundColor: "#FF6477", padding: "10px", borderRadius: "4px", color: "#fff", minWidth: "100px" }}>
          Next
        </button>
      </div>
        </form>
      )}
    </Formik>
  );
};

export default PersonalDetails;
