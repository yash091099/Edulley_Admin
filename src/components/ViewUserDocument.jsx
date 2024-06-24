import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  tenthMarksheet: Yup.mixed().required("10th Marksheet is required"),
  twelfthMarksheet: Yup.mixed().required("12th Marksheet is required"),
  passport: Yup.mixed().required("Passport is required"),
  statementOfPurpose: Yup.mixed().required("Statement of Purpose is required"),
  lettersOfRecommendation: Yup.mixed().required("Letters of Recommendation are required"),
  ielts: Yup.mixed().required("IELTS is required"),
  degree: Yup.mixed().required("Degree is required"),
  resume: Yup.mixed().required("Resume is required"),
  additionalDocuments: Yup.mixed().required("Additional Documents are required"),
  greGmat: Yup.mixed().required("GRE/GMAT is required"),
});

export default function ViewUserDocument({setFormData , formData , setState , state}) {
  return (
    <Formik
      initialValues={{
        tenthMarksheet: formData?.userDocuments?.tenthMarksheet || "",
        twelfthMarksheet: formData?.userDocuments?.twelfthMarksheet || "",
        passport: formData?.userDocuments?.passport || "",
        statementOfPurpose: formData?.userDocuments?.statementOfPurpose || "",
        lettersOfRecommendation: formData?.userDocuments?.lettersOfRecommendation || "",
        ielts: formData?.userDocuments?.ielts || "",
        degree: formData?.userDocuments?.degree || "",
        resume: formData?.userDocuments?.resume || "",
        additionalDocuments: formData?.userDocuments?.additionalDocuments || "",
        greGmat: formData?.userDocuments?.greGmat || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const isAnyFileUploaded = Object.values(values).some((value) => value !== "");

        if (!isAnyFileUploaded) {
          setSubmitting(false);
          return;
        }

        setSubmitting(true);

        setFormData(prev => ({
          ...prev,
          userDocuments: {
            ...prev.documents,
            ...values
          }
        }))
        setState(state + 1);

        setSubmitting(false);
      }}
    >
      {({ setFieldValue, errors, touched, handleSubmit, isSubmitting, values }) => (
        <Form onSubmit={handleSubmit} className="main-container">
          <h3 className="heading" style={{fontFamily: 'Gilroy-Bold'}}>Documents upload</h3>
          <div className="row">
            <FileUploadField name="tenthMarksheet" label="10th Marksheet" setFieldValue={setFieldValue} error={errors.tenthMarksheet} touched={touched.tenthMarksheet} value={values.tenthMarksheet} />
            <FileUploadField name="twelfthMarksheet" label="12th Marksheet" setFieldValue={setFieldValue} error={errors.twelfthMarksheet} touched={touched.twelfthMarksheet} value={values.twelfthMarksheet} />
            <FileUploadField name="passport" label="Passport" setFieldValue={setFieldValue} error={errors.passport} touched={touched.passport} value={values.passport} />
            <FileUploadField name="statementOfPurpose" label="Statement of Purpose" setFieldValue={setFieldValue} error={errors.statementOfPurpose} touched={touched.statementOfPurpose} value={values.statementOfPurpose} />
            <FileUploadField name="lettersOfRecommendation" label="Letters of Recommendation" setFieldValue={setFieldValue} error={errors.lettersOfRecommendation} touched={touched.lettersOfRecommendation} value={values.lettersOfRecommendation} />
            <FileUploadField name="ielts" label="IELTS" setFieldValue={setFieldValue} error={errors.ielts} touched={touched.ielts} value={values.ielts} />
            <FileUploadField name="degree" label="Degree" setFieldValue={setFieldValue} error={errors.degree} touched={touched.degree} value={values.degree} />
            <FileUploadField name="resume" label="Resume" setFieldValue={setFieldValue} error={errors.resume} touched={touched.resume} value={values.resume} />
            <FileUploadField name="additionalDocuments" label="Additional Documents" setFieldValue={setFieldValue} error={errors.additionalDocuments} touched={touched.additionalDocuments} value={values.additionalDocuments} />
            <FileUploadField name="greGmat" label="GRE/GMAT" setFieldValue={setFieldValue} error={errors.greGmat} touched={touched.greGmat} value={values.greGmat} />
          </div>
          <div className="button-container" style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button type="submit" disabled={isSubmitting} className="saveButton" style={{backgroundColor:"#FF6477", padding:"10px", borderRadius:"4px", color:"#fff", minWidth:"100px"}}>
              Save Documents
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

function FileUploadField({ name, label, setFieldValue, error, touched, value }) {
  const isImage = value && (value.endsWith('.jpg') || value.endsWith('.jpeg') || value.endsWith('.png') || value.endsWith('.gif'));

  return (
    <div className="col-md-6 formField" style={{ minHeight: '80px', marginBottom: '20px' }}>
      <label style={{fontFamily: 'Gilroy-Bold'}}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
        <input
          type="file"
          name={name}
          onChange={(event) => {
            handleFileChange(event.target.files[0], name, setFieldValue);
          }}
          className={`input ${touched && error ? "is-invalid" : ""}`}
          style={{ flex: 1 }}
        />
        {value && !isImage && (
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              marginLeft: '10px',
              padding: '5px 10px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              textDecoration: 'none',
              color: '#333',
              fontSize: '14px'
            }}
          >
            View
          </a>
        )}
      </div>
      {touched && error && <div className="error" style={{fontFamily: 'Gilroy-Medium', marginTop: '5px'}}>{error}</div>}
      {value && isImage && (
        <div className="preview-container" style={{ marginTop: '10px', maxHeight: '200px', overflow: 'hidden' }}>
          <img src={value} alt={label} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
      )}
    </div>
  );
}

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