import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Custom validation schema including the file size check
// const validationSchema = Yup.object({
//   document1: Yup.mixed()
//     .required("A file is required")
//     .test("fileSize", "File too large", value => !value || (value && value.size <= 10485760)), // 10 MB
//   document2: Yup.mixed()
//     .required("A file is required")
//     .test("fileSize", "File too large", value => !value || (value && value.size <= 10485760)),
//   document3: Yup.mixed()
//     .required("A file is required")
//     .test("fileSize", "File too large", value => !value || (value && value.size <= 10485760)),
//   document4: Yup.mixed()
//     .required("A file is required")
//     .test("fileSize", "File too large", value => !value || (value && value.size <= 10485760)),
// });

export default function ViewUserDocument({setFormData , formData , setState , state}) {
  return (
    <Formik
      initialValues={{
        document1: formData?.userDocuments?.document1 || "",
        document2: formData?.userDocuments?.document2 || "",
        document3: formData?.userDocuments?.document3 || "",
        document4: formData?.userDocuments?.document4 || "",
      }}
      // validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setFieldValue }) => {
        setSubmitting(true);

        setFormData(prev => ({
          ...prev,
          userDocuments: {
            ...prev.documents,
            ...values
          }
        }))
        setState(state + 1);

        // Assuming an asynchronous function handleFileChange is defined elsewhere
        setSubmitting(false);
      }}
    >
      {({ setFieldValue, errors, touched, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="main-container">
          <h3 className="heading">Documents uploaded by Student</h3>
          <div className="row">
            <FileUploadField name="document1" label="Document 1" setFieldValue={setFieldValue} error={errors.document1} touched={touched.document1} />
            <FileUploadField name="document2" label="Document 2" setFieldValue={setFieldValue} error={errors.document2} touched={touched.document2} />
            <FileUploadField name="document3" label="Document 3" setFieldValue={setFieldValue} error={errors.document3} touched={touched.document3} />
            <FileUploadField name="document4" label="Document 4" setFieldValue={setFieldValue} error={errors.document4} touched={touched.document4} />
          </div>
          <div className="button-container">
            <button type="submit" disabled={isSubmitting} className="saveButton" style={{backgroundColor:"#FF6477", padding:"10px", borderRadius:"4px", color:"#fff", minWidth:"100px"}}>
              Save Documents
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

function FileUploadField({ name, label, setFieldValue, error, touched }) {
  return (
    <div className="col-md-6 formField">
      <label>{label}</label>
      <input
        type="file"
        name={name}
        onChange={(event) => {
          handleFileChange(event.target.files[0], name, setFieldValue);
        }}
        className="input"
      />
      {touched && error && <div className="error">{error}</div>} 
    </div>
  );
}


// Handle file upload and set URL in formik values
async function handleFileChange(file, fieldName, updateFieldValue) {
  try {
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
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }
    const responseData = await response.json();
    const uploadedUrl = responseData.publicUrl;
    updateFieldValue(fieldName, uploadedUrl);
  } catch (error) {
    console.error("Error uploading file:", error.message);
  }
}
