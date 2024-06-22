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
        tenthBoard: formData?.academicProfile?.tenthBoard || "",
        tenthScore: formData?.academicProfile?.tenthScore || "",
        tenthYearOfCompletion: formData?.academicProfile?.tenthYearOfCompletion || "",
        tenthSpecialization: formData?.academicProfile?.tenthSpecialization || "",
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
            <h3 className="heading" style={{fontFamily: 'Gilroy-Bold'}}>10th</h3>
            <div className="row">
              <div className="col-md-6 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Institution Name</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="tenthInstitutionName" placeholder="Enter institution name" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="tenthInstitutionName" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Board</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="tenthBoard" placeholder="Enter board name" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="tenthBoard" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Score (%)</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="tenthScore" placeholder="Enter score" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="tenthScore" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Year of Completion</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="tenthYearOfCompletion" placeholder="Enter year of completion" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="tenthYearOfCompletion" component="div" className="error" />
              </div>
              <div className="col-md-12 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Specialization</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="tenthSpecialization" placeholder="Enter specialization" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="tenthSpecialization" component="div" className="error" />
              </div>
            </div>
          </div>

          {/* 12th Section */}
          <div className="main-container">
            <h3 className="heading" style={{fontFamily: 'Gilroy-Bold'}}>Senior Secondary (11th-12th)</h3>
            <div className="row">
              <div className="col-md-6 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Institution Name</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="twelfthInstitutionName" placeholder="Enter institution name" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="twelfthInstitutionName" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Board</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="twelfthBoard" placeholder="Enter board name" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="twelfthBoard" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Score (%)</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="twelfthScore" placeholder="Enter score" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="twelfthScore" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Year of Completion</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="twelfthYearOfCompletion" placeholder="Enter year of completion" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="twelfthYearOfCompletion" component="div" className="error" />
              </div>
              <div className="col-md-12 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Specialization</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="twelfthSpecialization" placeholder="Enter specialization" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="twelfthSpecialization" component="div" className="error" />
              </div>
            </div>
          </div>

          {/* UG Section */}
          <div className="main-container">
            <h3 className="heading" style={{fontFamily: 'Gilroy-Bold'}}>UG (Undergraduate)</h3>
            <div className="row">
              <div className="col-md-6 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Institution Name</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="ugInstitutionName" placeholder="Enter institution name" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="ugInstitutionName" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Board</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="ugBoard" placeholder="Enter board name" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="ugBoard" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Score (%)</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="ugScore" placeholder="Enter score" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="ugScore" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Year of Completion</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="ugYearOfCompletion" placeholder="Enter year of completion" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="ugYearOfCompletion" component="div" className="error" />
              </div>
              <div className="col-md-12 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Specialization</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="ugSpecialization" placeholder="Enter specialization" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="ugSpecialization" component="div" className="error" />
              </div>
            </div>
          </div>

          {/* PG Section */}
          <div className="main-container">
            <h3 className="heading" style={{fontFamily: 'Gilroy-Bold'}}>PG (Postgraduate)</h3>
            <div className="row">
              <div className="col-md-6 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Institution Name</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="pgInstitutionName" placeholder="Enter institution name" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="pgInstitutionName" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Board</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="pgBoard" placeholder="Enter board name" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="pgBoard" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Score (%)</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="pgScore" placeholder="Enter score" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="pgScore" component="div" className="error" />
              </div>
              <div className="col-md-6 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Year of Completion</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="pgYearOfCompletion" placeholder="Enter year of completion" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="pgYearOfCompletion" component="div" className="error" />
              </div>
              <div className="col-md-12 formField">
                <label style={{fontFamily: 'Gilroy-Bold'}}>Specialization</label>
                <Field style={{fontFamily: 'Gilroy-Medium'}} type="text" name="pgSpecialization" placeholder="Enter specialization" className="input" />
                <ErrorMessage style={{fontFamily: 'Gilroy-Medium'}} name="pgSpecialization" component="div" className="error" />
              </div>
            </div>
          </div>

          <div className="button-container" style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button type="submit" style={{backgroundColor:"#FF6477", padding:"10px", borderRadius:"4px", color:"#fff", minWidth:"100px"}} className="saveButton">
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}