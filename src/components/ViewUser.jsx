import React, { useEffect, useState } from "react";
import userIcon from "../assets/svg/users.svg";
import documentsIcon from "../assets/svg/documents.svg";
import dollorIcon from "../assets/svg/dollor.svg";
import PersonalDetails from "./personalDetails";
import AcademicProfile from "./AcademicProfile";
import WorkBackground from "./WorkBackground";
import TestScores from "./TestScores";
import ViewUserDocument from "./ViewUserDocument";
import { FormDataProvider } from "./FormDataContext.jsx";
import toaster from "../Shared/toaster.jsx";
import { addStudent, editStudent } from "../context/services/client";

export default function ViewVUser({ handleBack, initialData }) {
  const [state, setState] = useState(1);

  const localStorageData = localStorage.getItem("studentFormData");
  const initialFormData = localStorageData
    ? JSON.parse(localStorageData)
    : {
        personalDetails: {},
        academicProfile: {},
        workExperience: {},
        testScores: {},
        userDocuments: {},
      };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    formData &&
      localStorage.setItem("studentFormData", JSON.stringify(formData));

    return () => {
      if (initialData) {
        saveData();
      }
      localStorage.removeItem("studentFormData");
    };
  }, [formData]);

  useEffect(() => {
    initialData && setFormData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (state === 6) {
      saveData();
    }
  }, [state]);

  const saveData = async () => {
    let dataToSend = {
      fullName: formData.personalDetails.name,
      gender: formData.personalDetails.gender,
      contactNumber: formData.personalDetails.contactNumber,
      email: formData.personalDetails.emailID,
      dob: formData.personalDetails.dob,
      maritalStatus: formData.personalDetails.maritalStatus,
      mailingAddress: {
        addressLine1: formData.personalDetails.mailingAddressLine1,
        addressLine2: formData.personalDetails.mailingAddressLine2,
        country: formData.personalDetails.mailingCountry,
        state: formData.personalDetails.mailingState,
        pinCode: formData.personalDetails.mailingPincode,
      },
      permanentAddress: {
        addressLine1: formData.personalDetails.permanentAddressLine1,
        addressLine2: formData.personalDetails.permanentAddressLine2,
        country: formData.personalDetails.permanentCountry,
        state: formData.personalDetails.permanentState,
        pinCode: formData.personalDetails.permanentPincode,
      },
      passportInformation: {
        passportNumber: formData.personalDetails.passportNumber,
        issueCountry: formData.personalDetails.passportIssueCountry,
        issueDate: formData.PersonalDetails.passportExpiryDate,
        expiryDate: formData.personalDetails.passportIssueDate,
        birthState: formData.personalDetails.passportStateOfBirth,
        birthCountry: formData.personalDetails.passportCountryOfBirth,
      },
      academicProfile: {
        secondary: {
          instituteName: formData.academicProfile.tenthInstitutionName,
          board: formData.academicProfile.tenthBoard,
          score: formData.academicProfile.tenthScore,
          completionYear: formData.academicProfile.tenthYearOfCompletion,
          specialization: formData.academicProfile.tenthSpecialization,
        },
        seniorSecondary: {
          instituteName: formData.academicProfile.twelfthInstitutionName,
          board: formData.academicProfile.twelfthBoard,
          score: formData.academicProfile.twelfthScore,
          completionYear: formData.academicProfile.twelfthYearOfCompletion,
          specialization: formData.academicProfile.twelfthSpecialization,
        },
        UG: {
          instituteName: formData.academicProfile.ugInstitutionName,
          board: formData.academicProfile.ugBoard,
          score: formData.academicProfile.ugScore,
          completionYear: formData.academicProfile.ugYearOfCompletion,
          specialization: formData.academicProfile.ugSpecialization,
        },
        PG: {
          instituteName: formData.academicProfile.pgInstitutionName,
          board: formData.academicProfile.pgBoard,
          score: formData.academicProfile.pgScore,
          completionYear: formData.academicProfile.pgYearOfCompletion,
          specialization: formData.academicProfile.pgSpecialization,
        },
      },
      workExperience: [
        {
          jobTitle: formData.workExperience.jobTitle,
          company: formData.workExperience.company,
          location: formData.workExperience.location,
          jobSummary: formData.workExperience.jobSummary,
          joiningDate: formData.workExperience.joiningDate,
          workedTill: formData.workExperience.workedTill,
        },
      ],
      testScores: formData.testScores,
      documents: {
        document1: formData.userDocuments.document1,
        document2: formData.userDocuments.document2,
        document3: formData.userDocuments.document3,
        document4: formData.userDocuments.document4,
      },
    };

    if (initialData) {
      dataToSend.studentId = initialData._id;
    }

    // add and update on initialData
    try {
      const response = initialData
        ? await editStudent(dataToSend)
        : await addStudent(dataToSend);
      if (response.status === 200) {
        setFormData(initialFormData);
        handleBack();
      } else {
        toaster.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="row mb-4">
        <h1 className="text-text text-[1.5rem] font-[600] tracking-[0.07813rem]"></h1>
      </div>
      <div className="row  flex-grow">
        <div className="col-md-3">
          <div className="flex flex-col gap-[1.5rem] border-r border-[#4B465C]">
            {/* Personal Details */}
            <div
              className="cursor-pointer flex gap-[1rem] items-center"
              onClick={() => setState(1)}
            >
              <img
                className={`p-[0.5rem] rounded-[0.375rem] ${
                  state === 1 ? "bg-primary-brand" : "bg-[#F1F1F2]"
                }`}
                src={userIcon}
              />
              <div>
                <h1
                  className={`text-[0.9375rem] font-[600] leading-[1.3125rem] ${
                    state === 1 ? "text-[#4B465C]" : "text-[#4B465C]/50"
                  }`}
                >
                  Personal Details
                </h1>
                <p className="text-[#4B465C]/50 text-[0.8125rem] font-[400] leading-[1.25rem]">
                  Name/Email/Contact
                </p>
              </div>
            </div>
            {/* Academic Profile */}
            <div
              className="cursor-pointer flex gap-[1rem] items-center"
              onClick={() => setState(2)}
            >
              <img
                className={`p-[0.5rem] rounded-[0.375rem] ${
                  state === 2 ? "bg-primary-brand" : "bg-[#F1F1F2]"
                }`}
                src={documentsIcon}
              />
              <div>
                <h1
                  className={`text-[0.9375rem] font-[600] leading-[1.3125rem] ${
                    state === 2 ? "text-[#4B465C]" : "text-[#4B465C]/50"
                  }`}
                >
                  Academic Profile
                </h1>
                <p className="text-[#4B465C]/50 text-[0.8125rem] font-[400] leading-[1.25rem]">
                  Completed
                </p>
              </div>
            </div>
            {/* Work Background */}
            <div
              className="cursor-pointer flex gap-[1rem] items-center"
              onClick={() => setState(3)}
            >
              <img
                className={`p-[0.5rem] rounded-[0.375rem] ${
                  state === 3 ? "bg-primary-brand" : "bg-[#F1F1F2]"
                }`}
                src={dollorIcon}
              />
              <div>
                <h1
                  className={`text-[0.9375rem] font-[600] leading-[1.3125rem] ${
                    state === 3 ? "text-[#4B465C]" : "text-[#4B465C]/50"
                  }`}
                >
                  Work Backgrounds
                </h1>
                <p className="text-[#4B465C]/50 text-[0.8125rem] font-[400] leading-[1.25rem]">
                  Completed
                </p>
              </div>
            </div>
            {/* Tests */}
            <div
              className="cursor-pointer flex gap-[1rem] items-center"
              onClick={() => setState(4)}
            >
              <img
                className={`p-[0.5rem] rounded-[0.375rem] ${
                  state === 4 ? "bg-primary-brand" : "bg-[#F1F1F2]"
                }`}
                src={dollorIcon}
              />
              <div>
                <h1
                  className={`text-[0.9375rem] font-[600] leading-[1.3125rem] ${
                    state === 4 ? "text-[#4B465C]" : "text-[#4B465C]/50"
                  }`}
                >
                  Tests
                </h1>
                <p className="text-[#4B465C]/50 text-[0.8125rem] font-[400] leading-[1.25rem]">
                  Completed
                </p>
              </div>
            </div>
            {/* Documents */}
            <div
              className="cursor-pointer flex gap-[1rem] items-center"
              onClick={() => setState(5)}
            >
              <img
                className={`p-[0.5rem] rounded-[0.375rem] ${
                  state === 5 ? "bg-primary-brand" : "bg-[#F1F1F2]"
                }`}
                src={dollorIcon}
              />
              <div>
                <h1
                  className={`text-[0.9375rem] font-[600] leading-[1.3125rem] ${
                    state === 5 ? "text-[#4B465C]" : "text-[#4B465C]/50"
                  }`}
                >
                  Documents
                </h1>
                <p className="text-[#4B465C]/50 text-[0.8125rem] font-[400] leading-[1.25rem]">
                  Completed
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          {state === 1 && (
            <PersonalDetails
              setFormData={setFormData}
              formData={formData}
              setState={setState}
              state={state}
            />
          )}
          {state === 2 && (
            <AcademicProfile
              setFormData={setFormData}
              formData={formData}
              setState={setState}
              state={state}
            />
          )}
          {state === 3 && (
            <WorkBackground
              setFormData={setFormData}
              formData={formData}
              setState={setState}
              state={state}
            />
          )}
          {state === 4 && (
            <TestScores
              setFormData={setFormData}
              formData={formData}
              setState={setState}
              state={state}
            />
          )}
          {state === 5 && (
            <ViewUserDocument
              setFormData={setFormData}
              formData={formData}
              setState={setState}
              state={state}
            />
          )}
        </div>
      </div>
    </div>
  );
}
