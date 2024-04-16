import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  tenthInstitutionName: Yup.string().required('Required'),
  tenthBoard: Yup.string().required('Required'),
  tenthScore: Yup.string().required('Required'),
  tenthYearOfCompletion: Yup.string().required('Required'),
  tenthSpecialization: Yup.string().required('Required'),
  twelfthInstitutionName: Yup.string().required('Required'),
  twelfthBoard: Yup.string().required('Required'),
  twelfthScore: Yup.string().required('Required'),
  twelfthYearOfCompletion: Yup.string().required('Required'),
  twelfthSpecialization: Yup.string().required('Required'),
  ugInstitutionName: Yup.string().required('Required'),
  ugBoard: Yup.string().required('Required'),
  ugScore: Yup.string().required('Required'),
  ugYearOfCompletion: Yup.string().required('Required'),
  ugSpecialization: Yup.string().required('Required'),
  pgInstitutionName: Yup.string().required('Required'),
  pgBoard: Yup.string().required('Required'),
  pgScore: Yup.string().required('Required'),
  pgYearOfCompletion: Yup.string().required('Required'),
  pgSpecialization: Yup.string().required('Required'),
});

export default function AcademicProfile({ setFormData , formData , setState , state}) {
  return (
    <Formik
      initialValues={{
        tenthInstitutionName: formData?.academicProfile?.tenthInstitutionName || "",
        twelfthInstitutionName: formData?.academicProfile?.twelfthInstitutionName || "",
        twelfthBoard: formData?.academicProfile?.twelfthBoard || "",
        twelfthScore: formData?.academicProfile?.twelfthScore || "",
        twelfthYearOfCompletion: formData?.academicProfile?.twelfthYearOfCompletion || "",
        twelfthSpecialization: formData?.academicProfile?.twelfthSpecialization || "",
        ugInstitutionName: formData?.academicProfile?.ugInstitutionName || "",
        ugBoard: formData?.academicProfile?.ugBoard || "",
        ugScore: formData?.academicProfile?.ugScore || "",
        ugYearOfCompletion: formData?.academicProfile?.ugYearOfCompletion || "",
        ugSpecialization: formData?.academicProfile?.ugSpecialization || "",
        pgInstitutionName: formData?.academicProfile?.pgInstitutionName || "",
        pgBoard: formData?.academicProfile?.pgBoard || "",
        pgScore: formData?.academicProfile?.pgScore || "",
        pgYearOfCompletion: formData?.academicProfile?.pgYearOfCompletion || "",
        pgSpecialization: formData?.academicProfile?.pgSpecialization || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setFormData(prev => ({
          ...prev,
          academicProfile: {
            ...prev.academicProfile,
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
          {/* 10th Section */}
          <div className="main-container">
            <h3 className="heading">10th</h3>
            <div className="row">
              <div className="col-md-6 formField">
                <label>Institution Name</label>
                <Field type="text" name="tenthInstitutionName" placeholder="Enter institution name" className="input" />
                <ErrorMessage name="tenthInstitutionName" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label>Board</label>
                <Field type="text" name="tenthBoard" placeholder="Enter board name" className="input" />
                <ErrorMessage name="tenthBoard" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label>Score (%)</label>
                <Field type="text" name="tenthScore" placeholder="Enter score" className="input" />
                <ErrorMessage name="tenthScore" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label>Year of Completion</label>
                <Field type="text" name="tenthYearOfCompletion" placeholder="Enter year of completion" className="input" />
                <ErrorMessage name="tenthYearOfCompletion" component="div" className="error" />
              </div>
              <div className="col-md-12 formField">
                <label>Specialization</label>
                <Field type="text" name="tenthSpecialization" placeholder="Enter specialization" className="input" />
                <ErrorMessage name="tenthSpecialization" component="div" className="error" />
              </div>
            </div>
          </div>

          {/* 12th Section */}
          <div className="main-container">
            <h3 className="heading">Senior Secondary (11th-12th)</h3>
            <div className="row">
              <div className="col-md-6 formField">
                <label>Institution Name</label>
                <Field type="text" name="twelfthInstitutionName" placeholder="Enter institution name" className="input" />
                <ErrorMessage name="twelfthInstitutionName" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label>Board</label>
                <Field type="text" name="twelfthBoard" placeholder="Enter board name" className="input" />
                <ErrorMessage name="twelfthBoard" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label>Score (%)</label>
                <Field type="text" name="twelfthScore" placeholder="Enter score" className="input" />
                <ErrorMessage name="twelfthScore" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label>Year of Completion</label>
                <Field type="text" name="twelfthYearOfCompletion" placeholder="Enter year of completion" className="input" />
                <ErrorMessage name="twelfthYearOfCompletion" component="div" className="error" />
              </div>
              <div className="col-md-12 formField">
                <label>Specialization</label>
                <Field type="text" name="twelfthSpecialization" placeholder="Enter specialization" className="input" />
                <ErrorMessage name="twelfthSpecialization" component="div" className="error" />
              </div>
            </div>
          </div>

          {/* UG Section */}
          <div className="main-container">
            <h3 className="heading">UG (Undergraduate)</h3>
            <div className="row">
              <div className="col-md-6 formField">
                <label>Institution Name</label>
                <Field type="text" name="ugInstitutionName" placeholder="Enter institution name" className="input" />
                <ErrorMessage name="ugInstitutionName" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label>Board</label>
                <Field type="text" name="ugBoard" placeholder="Enter board name" className="input" />
                <ErrorMessage name="ugBoard" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label>Score (%)</label
                ><Field type="text" name="ugScore" placeholder="Enter score" className="input" />
                <ErrorMessage name="ugScore" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label>Year of Completion</label>
                <Field type="text" name="ugYearOfCompletion" placeholder="Enter year of completion" className="input" />
                <ErrorMessage name="ugYearOfCompletion" component="div" className="error" />
              </div>
              <div className="col-md-12 formField">
                <label>Specialization</label>
                <Field type="text" name="ugSpecialization" placeholder="Enter specialization" className="input" />
                <ErrorMessage name="ugSpecialization" component="div" className="error" />
              </div>
            </div>
          </div>

          {/* PG Section */}
          <div className="main-container">
            <h3 className="heading">PG (Postgraduate)</h3>
            <div className="row">
              <div className="col-md-6 formField">
                <label>Institution Name</label>
                <Field type="text" name="pgInstitutionName" placeholder="Enter institution name" className="input" />
                <ErrorMessage name="pgInstitutionName" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label>Board</label>
                <Field type="text" name="pgBoard" placeholder="Enter board name" className="input" />
                <ErrorMessage name="pgBoard" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label>Score (%)</label>
                <Field type="text" name="pgScore" placeholder="Enter score" className="input" />
                <ErrorMessage name="pgScore" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label>Year of Completion</label>
                <Field type="text" name="pgYearOfCompletion" placeholder="Enter year of completion" className="input" />
                <ErrorMessage name="pgYearOfCompletion" component="div" className="error" />
              </div>
              <div className="col-md-12 formField">
                <label>Specialization</label>
                <Field type="text" name="pgSpecialization" placeholder="Enter specialization" className="input" />
                <ErrorMessage name="pgSpecialization" component="div" className="error" />
              </div>
            </div>
          </div>

          <div className="button-container">
            <button type="submit" style={{backgroundColor:"#FF6477", padding:"10px", borderRadius:"4px", color:"#fff", minWidth:"100px"}} className="saveButton">
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
