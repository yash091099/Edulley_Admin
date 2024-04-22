import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema for the test scores
const validationSchema = Yup.object({
  ieltsOverall: Yup.string().required("Overall score is required"),
  ieltsQuantitative: Yup.string().required("Quantitative score is required"),
  ieltsVerbal: Yup.string().required("Verbal score is required"),
  ieltsAnalytical: Yup.string().required(
    "Analytical writing score is required"
  ),
  ieltsDateOfExam: Yup.date()
    .required("Date of exam is required")
    .typeError("Invalid date format"),
  greOverall: Yup.string().required("Overall score is required"),
  greQuantitative: Yup.string().required("Quantitative score is required"),
  greVerbal: Yup.string().required("Verbal score is required"),
  greAnalytical: Yup.string().required("Analytical writing score is required"),
  greDateOfExam: Yup.date()
    .required("Date of exam is required")
    .typeError("Invalid date format"),
});

export default function TestScores({setFormData , formData , setState , state}) {
  return (
    <Formik
      initialValues={{
        ieltsOverall: formData?.testScores?.ieltsOverall || "",
        ieltsQuantitative: formData?.testScores?.ieltsQuantitative || "",
        ieltsAnalytical: formData?.testScores?.ieltsAnalytical || "",
        ieltsVerbal: formData?.testScores?.ieltsVerbal || "",
        ieltsDateOfExam: formData?.testScores?.ieltsDateOfExam.split("T")[0] || "",
        ieltsYetToTake: formData?.testScores?.ieltsYetToTake || false,
        ieltsLookingForWaiver: formData?.testScores?.ieltsLookingForWaiver || false,
        greOverall: formData?.testScores?.greOverall || "",
        greQuantitative: formData?.testScores?.greQuantitative || "",
        greAnalytical: formData?.testScores?.greAnalytical || "",
        greVerbal: formData?.testScores?.greVerbal || "",
        greDateOfExam: formData?.testScores?.greDateOfExam.split("T")[0] || "",
        greYetToTake: formData?.testScores?.greYetToTake || false,
        greLookingForWaiver: formData?.testScores?.greLookingForWaiver || false,
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
            <h3>IELTS</h3>
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
              <FieldComponent
                name="ieltsQuantitative"
                label="Quantitative"
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
              />
              <FieldComponent
                name="ieltsVerbal"
                label="Verbal"
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
              />
              <FieldComponent
                name="ieltsAnalytical"
                label="Analytical Writing"
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

          <div className="overview-container">
            <h3>GRE</h3>
            <div className="row">
              <FieldComponent
                name="greOverall"
                label="Overall Score"
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
              />
              <FieldComponent
                name="greDateOfExam"
                label="Date of Exam"
                type="date"
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
              />
              <FieldComponent
                name="greQuantitative"
                label="Quantitative"
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
              />
              <FieldComponent
                name="greVerbal"
                label="Verbal"
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
              />
              <FieldComponent
                name="greAnalytical"
                label="Analytical Writing"
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
              />
              <CheckboxComponent
                name="greYetToTake"
                label="Yet to take this test"
                setFieldValue={setFieldValue}
                values={values}
              />
              <CheckboxComponent
                name="greLookingForWaiver"
                label="Looking for a Waiver"
                setFieldValue={setFieldValue}
                values={values}
              />
            </div>
          </div>

          <div className="button-container">
            <button
              type="submit"
              style={{
                backgroundColor: "#FF6477",
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
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
      <label>{label}</label>
      <Field
        type={type}
        name={name}
        placeholder={`Enter ${label.toLowerCase()}`}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
        className="input"
      />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
}

function CheckboxComponent({ name, label, setFieldValue, values }) {
  return (
    <div className="col-md-6 formField">
      <label>
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
