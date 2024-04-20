import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object({
  studentsPerStaff: Yup.number()
    .required('This field is required')
    .positive('Must be a positive number'),
    fulltimeStudents: Yup.number()
    .required('This field is required')
    .positive('Must be a positive number'),
    internationalStudentPercentage: Yup.number()
    .required('This field is required')
    .min(0, 'Minimum 0')
    .max(100, 'Maximum 100'),
    studentSatisfactionRate: Yup.number()
    .required('This field is required')
    .min(0, 'Minimum 0')
    .max(100, 'Maximum 100'),
});

const UniversityStats = ({ onDataChange, initialData }) => {
  console.log(initialData);
  return (
    <Formik
      initialValues={{
        studentsPerStaff: initialData?.studentsPerStaff || 0,
        fulltimeStudents: initialData?.fulltimeStudents || 0,
        internationalStudentPercentage: initialData?.internationalStudentPercentage || '',
        studentSatisfactionRate: initialData?.studentSatisfactionRate || ''
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Submitting form:", values);
        onDataChange(values); // Call the provided onDataChange function on submit
      }}
      enableReinitialize={true}  // Ensure form reinitializes with new initialData
    >
      {formik => (
        <Form className="overview-container">
          <h3 className="heading">University Stats</h3>
          <div className="row">
            <CustomInputField label="No. of students per staff" name="studentsPerStaff" placeholder="Enter number" onDataChange={onDataChange} formik={formik} />
            <CustomInputField label="No. of full-time students" name="fulltimeStudents" placeholder="Enter number" onDataChange={onDataChange} formik={formik} />
            <CustomInputField label="Percentage of International students" name="internationalStudentPercentage" placeholder="Enter percentage" onDataChange={onDataChange} formik={formik} />
            <CustomInputField label="Student Satisfaction Rate" name="studentSatisfactionRate" placeholder="Enter percentage" onDataChange={onDataChange} formik={formik} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

const CustomInputField = ({ label, name, placeholder, onDataChange, formik }) => (
  <div className="col-md-6 formField">
    <label>{label}</label>
    <Field 
      type="text" 
      name={name} 
      placeholder={placeholder} 
      className="form-control"
      onChange={e => {
        formik.handleChange(e); // This is Formik's handleChange
        onDataChange({ ...formik.values, [name]: e.target.value }); // Also pass updated values up to parent
      }}
    />
    <ErrorMessage name={name} component="div" className="error" />
  </div>
);

export default UniversityStats;
