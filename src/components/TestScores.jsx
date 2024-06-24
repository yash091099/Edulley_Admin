import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema for the test scores
const validationSchema = Yup.object({
  ieltsOverall: Yup.string().required("Overall score is required"),
  
  ieltsDateOfExam: Yup.date()
    .required("Date of exam is required")
    .typeError("Invalid date format"),

});

export default function TestScores({setFormData , formData , setState , state}) {
  return (
    <Formik
      initialValues={{
        ieltsOverall: formData?.testScores?.ieltsOverall || "",
       
        ieltsDateOfExam: formData?.testScores?.ieltsDateOfExam?.split("T")[0] || "",
        ieltsYetToTake: formData?.testScores?.ieltsYetToTake || false,
        ieltsLookingForWaiver: formData?.testScores?.ieltsLookingForWaiver || false,
       
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setFormData(prev => ({
          ...prev,
          testScores: {
            ...prev.testScores,
            ...values
          }
        }))
        setState(state + 1);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
        <Form className="test-scores-container">
          <div className="overview-container mb-4">
            <h3 style={{fontFamily: 'Gilroy-Bold'}}>IELTS</h3>
            <div className="row">
              <FieldComponent
                name="ieltsOverall"
                label="Overall Score"
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
              />
              <FieldComponent
                name="ieltsDateOfExam"
                label="Date of Exam"
                type="date"
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
              />
              
             
              <CheckboxComponent
                name="ieltsYetToTake"
                label="Yet to take this test"
                setFieldValue={setFieldValue}
                values={values}
              />
              <CheckboxComponent
                name="ieltsLookingForWaiver"
                label="Looking for a Waiver"
                setFieldValue={setFieldValue}
                values={values}
              />
            </div>
          </div>

       

          <div className="button-container" style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button
              type="submit"
              style={{
                backgroundColor: "#FF6477",
                marginTop: "20px",
                padding: "10px",
                borderRadius: "4px",
                color: "#fff",
                minWidth: "100px",
              }}
              className="saveButton"
            >
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

function FieldComponent({
  name,
  label,
  type = "text",
  handleChange,
  handleBlur,
  values,
}) {
  return (
    <div className="col-md-6 formField">
      <label style={{fontFamily: 'Gilroy-Bold'}}>{label}</label>
      <Field
        type={type}
        name={name}
        placeholder={`Enter ${label.toLowerCase()}`}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
        className="input"
        style={{fontFamily: 'Gilroy-Medium'}}
      />
      <ErrorMessage name={name} component="div" className="error" style={{fontFamily: 'Gilroy-Medium'}}/>
    </div>
  );
}

function CheckboxComponent({ name, label, setFieldValue, values }) {
  return (
    <div className="col-md-6 formField">
      <label style={{fontFamily: 'Gilroy-Bold'}}>
        <Field
          type="checkbox"
          name={name}
          checked={values[name]}
          onChange={() => setFieldValue(name, !values[name])}
          className="mr-2"
        />
        {label}
      </label>
    </div>
  );
}